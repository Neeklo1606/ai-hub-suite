import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  onRecordingChange?: (isRecording: boolean) => void;
  disabled?: boolean;
}

// Animated waveform visualization
const WaveformBars = () => (
  <div className="flex items-center gap-0.5 h-6" role="img" aria-label="Запись голоса">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-red-500 rounded-full"
        animate={{ height: ["6px", "20px", "10px", "18px", "6px"] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
        aria-hidden="true"
      />
    ))}
  </div>
);

export function VoiceRecorder({ onTranscript, onRecordingChange, disabled }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Format recording time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  // Transcribe audio using ElevenLabs batch API
  const transcribeAudio = useCallback(async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-transcribe`,
        {
          method: "POST",
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Transcription failed: ${response.status}`);
      }

      const result = await response.json();
      if (result.text) {
        onTranscript(result.text);
      }
    } catch (error) {
      console.error("Transcription error:", error);
      toast.error("Ошибка распознавания речи");
    }
  }, [onTranscript]);

  const startRecording = useCallback(async () => {
    setIsConnecting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });
      
      streamRef.current = stream;
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { 
          type: mediaRecorder.mimeType 
        });
        
        if (audioBlob.size > 0) {
          await transcribeAudio(audioBlob);
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      onRecordingChange?.(true);
      
    } catch (error) {
      console.error("Failed to start recording:", error);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        toast.error("Доступ к микрофону запрещён");
      } else {
        toast.error("Не удалось начать запись");
      }
    } finally {
      setIsConnecting(false);
    }
  }, [onRecordingChange, transcribeAudio]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      setIsRecording(false);
      onRecordingChange?.(false);
    }
  }, [isRecording, onRecordingChange]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2">
      <AnimatePresence mode="wait">
        {isRecording ? (
          <motion.div
            key="recording"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30"
          >
            <WaveformBars />
            <span className="text-red-400 font-mono text-sm min-w-[50px] font-medium">
              {formatTime(recordingTime)}
            </span>
            <button
              onClick={stopRecording}
              className="w-9 h-9 rounded-lg bg-red-500/25 hover:bg-red-500/40 flex items-center justify-center text-red-400 transition-colors"
              aria-label="Остановить запись"
            >
              <Square className="w-4 h-4 fill-current" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={startRecording}
            disabled={disabled || isConnecting}
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              isConnecting
                ? "bg-slate-700/50 text-gray-500 cursor-wait"
                : "bg-slate-700/50 text-gray-400 hover:text-primary hover:bg-primary/15 border border-slate-600/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20"
            )}
            aria-label="Начать запись голоса"
          >
            {isConnecting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mic className="w-5 h-5" />
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
