import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

// Типы для Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function ChatInput({ onSend, isLoading, placeholder = "Введите сообщение..." }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>("");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  // Инициализация Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("Speech Recognition не поддерживается в этом браузере");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ru-RU";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        // Добавляем финальный текст к уже распознанному
        finalTranscriptRef.current += finalTranscript;
        setMessage((prev) => {
          // Удаляем промежуточные результаты и добавляем финальный текст
          const baseText = finalTranscriptRef.current;
          return baseText.trim();
        });
      } else if (interimTranscript) {
        // Показываем промежуточный результат поверх финального текста
        setMessage((prev) => {
          const baseText = finalTranscriptRef.current;
          return (baseText + interimTranscript).trim();
        });
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Ошибка распознавания речи:", event.error);
      if (event.error === "no-speech") {
        // Нет речи - это нормально, просто останавливаем
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsRecording(false);
      } else if (event.error === "not-allowed") {
        alert("Разрешите доступ к микрофону в настройках браузера");
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
        setIsRecording(false);
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
    };
  }, []);

  const handleStartRecording = () => {
    if (!recognitionRef.current) {
      alert("Распознавание речи не поддерживается в этом браузере");
      return;
    }

    try {
      // Сбрасываем финальный текст при начале новой записи
      finalTranscriptRef.current = message;
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Ошибка при запуске записи:", error);
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative flex items-end gap-2 p-2 rounded-2xl border border-border bg-muted/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
            rows={1}
          />

          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleRecording}
              disabled={isLoading}
              className={cn(
                "h-9 w-9 text-muted-foreground hover:text-foreground transition-all",
                isRecording && "text-red-500 hover:text-red-600 animate-pulse"
              )}
              title={isRecording ? "Остановить запись" : "Начать запись голоса"}
            >
              <Mic className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Settings2 className="w-5 h-5" />
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading}
              size="icon"
              className={cn(
                "h-9 w-9 rounded-xl transition-all",
                message.trim() 
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsla(217,91%,60%,0.3)]" 
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          AI может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
}
