import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SimpleInput() {
  const [userInput, setUserInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleVoiceTranscript = (text: string) => {
    setUserInput((prev) => prev + (prev ? " " : "") + text);
    inputRef.current?.focus();
  };

  const handleRecordingChange = (recording: boolean) => {
    setIsRecording(recording);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      toast.success("Регистрация", {
        description: "Зарегистрируйтесь, чтобы отправлять запросы к AI",
      });
      setUserInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div 
        className={cn(
          "flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-card/30 border transition-all duration-300",
          isFocused || isRecording
            ? "border-primary/50 ring-2 ring-primary/20 shadow-lg shadow-primary/10"
            : "border-border/50 hover:border-border"
        )}
      >
        {/* Voice Recorder */}
        <VoiceRecorder 
          onTranscript={handleVoiceTranscript}
          onRecordingChange={handleRecordingChange}
          disabled={false}
        />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={isRecording ? "Запись..." : "Спроси что угодно..."}
          disabled={isRecording}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-base py-2"
        />

        {/* Send button */}
        <button 
          onClick={handleSend}
          disabled={!userInput.trim()}
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all",
            userInput.trim()
              ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Отправить запрос"
        >
          <Send className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}
