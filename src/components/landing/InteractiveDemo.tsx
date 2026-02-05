import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Zap, Image, Code, FileText } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { toast } from "sonner";

const demoPrompts = [
  "Напиши продающий текст для лендинга",
  "Сгенерируй изображение космоса",
  "Переведи текст на английский",
  "Объясни квантовую физику простыми словами",
];

const demoResponse = `Конечно! Вот продающий текст для вашего лендинга:

**Заголовок:** Увеличьте конверсию на 340% с AI-помощником

Ваши клиенты заслуживают мгновенных ответов. Наша платформа обрабатывает запросы за 0.3 секунды...`;

const modelTabs = [
  { icon: FileText, label: "Текст", active: true },
  { icon: Image, label: "Картинка", active: false },
  { icon: Code, label: "Код", active: false },
];

export function InteractiveDemo() {
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [promptIndex, setPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isUserMode, setIsUserMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPrompt = demoPrompts[promptIndex];

  // Handle transcript from VoiceRecorder
  const handleVoiceTranscript = (text: string) => {
    setUserInput((prev) => prev + (prev ? " " : "") + text);
    setIsUserMode(true);
    setIsTyping(false);
    setShowResponse(false);
    inputRef.current?.focus();
  };

  // Handle recording state change
  const handleRecordingChange = (recording: boolean) => {
    setIsRecording(recording);
    if (recording) {
      setIsTyping(false);
      setIsUserMode(true);
      setShowResponse(false);
    }
  };

  // Handle input focus - switch to user mode
  const handleInputFocus = () => {
    if (!isUserMode) {
      setIsTyping(false);
      setIsUserMode(true);
      setShowResponse(false);
      setDisplayedPrompt("");
    }
  };

  // Handle send button
  const handleSend = () => {
    if (userInput.trim()) {
      toast.success("Регистрация", {
        description: "Зарегистрируйтесь, чтобы отправлять запросы к AI",
      });
      setUserInput("");
    }
  };

  // Typing animation for prompt
  useEffect(() => {
    if (!isTyping || isUserMode || isRecording) return;
    
    let charIndex = 0;
    setDisplayedPrompt("");
    setShowResponse(false);
    setDisplayedResponse("");

    const typeInterval = setInterval(() => {
      if (charIndex < currentPrompt.length) {
        setDisplayedPrompt(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowResponse(true);
          setIsTyping(false);
        }, 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentPrompt, isTyping, promptIndex, isUserMode, isRecording]);

  // Typing animation for response
  useEffect(() => {
    if (!showResponse || isUserMode || isRecording) return;

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < demoResponse.length) {
        setDisplayedResponse(demoResponse.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Reset after delay
        setTimeout(() => {
          if (!isUserMode && !isRecording) {
            setPromptIndex((prev) => (prev + 1) % demoPrompts.length);
            setIsTyping(true);
          }
        }, 4000);
      }
    }, 15);

    return () => clearInterval(typeInterval);
  }, [showResponse, isUserMode, isRecording]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-3xl mx-auto mt-12 px-4 sm:px-0"
    >
      {/* Bonus badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-sm text-primary font-medium">
            +100₽ на баланс при регистрации
          </span>
        </div>
      </motion.div>

      {/* Main demo container with glassmorphism */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 20px 60px -15px hsl(var(--primary) / 0.25), 0 0 40px -10px hsl(var(--primary) / 0.15)",
        }}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-2xl border border-border" />
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-50" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", padding: "1px" }} />

        <div className="relative z-10 p-4 sm:p-6">
          {/* Model tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {modelTabs.map((tab, index) => (
              <button
                key={index}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  tab.active
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <tab.icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">GPT-4 Turbo</span>
            </div>
          </div>

          {/* Input area */}
          <div className="relative mb-4">
            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/50 border border-border">
              {/* Voice Recorder with ElevenLabs */}
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                onRecordingChange={handleRecordingChange}
                disabled={false}
              />

              <div className="flex-1 min-h-[24px]">
                {isRecording ? (
                  <span className="text-muted-foreground text-sm sm:text-base">
                    Запись... (нажмите ⏹ чтобы остановить)
                  </span>
                ) : isUserMode ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Введите ваш запрос..."
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm sm:text-base"
                    autoFocus
                  />
                ) : (
                  <div 
                    className="cursor-text" 
                    onClick={handleInputFocus}
                  >
                    <span className="text-foreground text-sm sm:text-base">
                      {displayedPrompt}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
                        />
                      )}
                    </span>
                    {!displayedPrompt && !isTyping && (
                      <span className="text-muted-foreground">Введите ваш запрос...</span>
                    )}
                  </div>
                )}
              </div>

              <button 
                onClick={handleSend}
                className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                aria-label="Отправить запрос"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Response area */}
          <AnimatePresence>
            {showResponse && !isUserMode && !isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-primary">AI Hub</span>
                        <span className="text-xs text-muted-foreground hidden sm:inline">GPT-4 Turbo</span>
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {displayedResponse}
                        {displayedResponse.length < demoResponse.length && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                            className="inline-block w-0.5 h-4 bg-primary ml-0.5 align-middle"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer hints */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-xs text-muted-foreground">
                🎤 Голос или текст
              </span>
              {!isRecording && ["Текст", "Изображение", "Код"].map((hint, i) => (
                <button
                  key={i}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hidden sm:block"
                  onClick={() => {
                    setIsUserMode(true);
                    setIsTyping(false);
                    setUserInput(hint === "Текст" ? "Напиши " : hint === "Изображение" ? "Сгенерируй " : "Напиши код ");
                    inputRef.current?.focus();
                  }}
                >
                  {hint}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground/60">100+ моделей</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
