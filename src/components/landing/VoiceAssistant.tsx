import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, MessageSquare, Image, Video, Music, Code } from "lucide-react";

const quickActions = [
  { icon: MessageSquare, label: "Текст", href: "#models" },
  { icon: Image, label: "Изображения", href: "#models" },
  { icon: Video, label: "Видео", href: "#models" },
  { icon: Music, label: "Аудио", href: "#models" },
  { icon: Code, label: "Код", href: "#models" },
];

const WaveformBars = () => (
  <div className="flex items-center gap-0.5 h-6" role="img" aria-label="Аудиовизуализация">
    {[...Array(5)].map((_, i) => (
     <motion.div
        key={i}
         className="w-1 bg-foreground/50 rounded-full"
        animate={{ height: ["8px", "24px", "12px", "20px", "8px"] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        aria-hidden="true"
      />
    ))}
  </div>
);

export function VoiceAssistant() {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="w-full max-w-2xl mx-auto mt-12"
      role="region"
      aria-label="Голосовой помощник"
    >
      <div className="p-6 bg-card rounded-2xl border border-border">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              isRecording
                ? "bg-destructive"
                : "bg-muted"
            }`}
            aria-label={isRecording ? "Остановить запись" : "Начать запись голоса"}
            aria-pressed={isRecording}
          >
            {isRecording ? (
              <MicOff className="w-6 h-6 text-foreground" aria-hidden="true" />
            ) : (
              <Mic className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
            )}
          </button>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isRecording ? (
                <motion.div
                  key="waveform"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                  aria-live="polite"
                >
                  <WaveformBars />
                  <span className="text-base text-foreground font-medium">Слушаю...</span>
                </motion.div>
              ) : (
                <motion.span
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-base text-muted-foreground"
                >
                  Расскажите вашу задачу...
                </motion.span>
              )}
            </AnimatePresence>
          </div>
       </div>

        <div className="flex gap-3 overflow-x-auto pb-1" role="list" aria-label="Быстрые действия">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-muted hover:bg-accent transition-colors"
              role="listitem"
              aria-label={`Перейти к моделям для ${action.label}`}
            >
              <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center mb-2">
                <action.icon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <span className="text-xs text-muted-foreground">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}