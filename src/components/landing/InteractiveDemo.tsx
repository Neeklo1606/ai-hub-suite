import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, MessageSquare, Palette, Code, ChevronDown, Loader2 } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
  { icon: MessageSquare, label: "Текст" },
  { icon: Palette, label: "Картинка" },
  { icon: Code, label: "Код" },
];

const quickSuggestions = [
  { label: "Написать статью", prompt: "Напиши статью на тему " },
  { label: "Создать логотип", prompt: "Создай описание логотипа для " },
  { label: "Сгенерировать код", prompt: "Напиши код на Python для " },
  { label: "Перевести текст", prompt: "Переведи на английский: " },
];

const models = [
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", icon: Sparkles },
  { id: "claude-3", name: "Claude 3", icon: MessageSquare },
  { id: "gemini-pro", name: "Gemini Pro", icon: Sparkles },
  { id: "gpt-4o", name: "GPT-4o", icon: Send },
];

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2.5 h-2.5 rounded-full bg-primary/60"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

export function InteractiveDemo() {
  const [displayedPrompt, setDisplayedPrompt] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isUserMode, setIsUserMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentPrompt = demoPrompts[promptIndex];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVoiceTranscript = (text: string) => {
    setUserInput((prev) => prev + (prev ? " " : "") + text);
    setIsUserMode(true);
    setIsTyping(false);
    setShowResponse(false);
    inputRef.current?.focus();
  };

  const handleRecordingChange = (recording: boolean) => {
    setIsRecording(recording);
    if (recording) {
      setIsTyping(false);
      setIsUserMode(true);
      setShowResponse(false);
    }
  };

  const handleInputFocus = () => {
    if (!isUserMode) {
      setIsTyping(false);
      setIsUserMode(true);
      setShowResponse(false);
      setDisplayedPrompt("");
    }
  };

  const handleSend = () => {
    if (userInput.trim()) {
      toast.success("Регистрация", {
        description: "Зарегистрируйтесь, чтобы отправлять запросы к AI",
      });
      setUserInput("");
    }
  };

  const handleQuickSuggestion = (prompt: string) => {
    setIsUserMode(true);
    setIsTyping(false);
    setShowResponse(false);
    setUserInput(prompt);
    inputRef.current?.focus();
  };

  // Typing animation for prompt
  useEffect(() => {
    if (!isTyping || isUserMode || isRecording) return;
    
    let charIndex = 0;
    setDisplayedPrompt("");
    setShowResponse(false);
    setDisplayedResponse("");
    setIsTypingResponse(false);

    const typeInterval = setInterval(() => {
      if (charIndex < currentPrompt.length) {
        setDisplayedPrompt(currentPrompt.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setIsTypingResponse(true);
          setTimeout(() => {
            setShowResponse(true);
            setIsTypingResponse(false);
            setIsTyping(false);
          }, 800);
        }, 300);
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
        setTimeout(() => {
          if (!isUserMode && !isRecording) {
            setPromptIndex((prev) => (prev + 1) % demoPrompts.length);
            setIsTyping(true);
          }
        }, 4000);
      }
    }, 12);

    return () => clearInterval(typeInterval);
  }, [showResponse, isUserMode, isRecording]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-4xl mx-auto mt-8 px-4 sm:px-0"
    >
      {/* Main demo container */}
      <div 
        className="relative rounded-2xl overflow-hidden border border-border"
      >
        <div className="absolute inset-0 bg-card" />

        <div className="relative z-10 p-6 sm:p-8">
          {/* Header: Tabs + Model Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {modelTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeTab === index
                      ? "bg-muted text-foreground border border-border"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Model Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border hover:bg-accent transition-colors"
              >
                <selectedModel.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{selectedModel.name}</span>
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  showModelDropdown && "rotate-180"
                )} />
              </button>

              <AnimatePresence>
                {showModelDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-card border border-border shadow-sm overflow-hidden z-50"
                  >
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelDropdown(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                          selectedModel.id === model.id
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <model.icon className="w-4 h-4" />
                        <span>{model.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Input area */}
          <div className="relative mb-6">
            <div className={cn(
              "flex items-center gap-3 p-3 rounded-lg bg-muted border transition-colors",
              isUserMode ? "border-primary/50" : "border-border"
            )}>
              {/* Voice Recorder */}
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                onRecordingChange={handleRecordingChange}
                disabled={false}
              />

              <div className="flex-1 min-h-[32px] flex items-center">
                {isRecording ? (
                  <span className="text-muted-foreground text-sm">
                    Запись... нажмите чтобы остановить
                  </span>
                ) : isUserMode ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Введите ваш запрос..."
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm py-2"
                    autoFocus
                  />
                ) : (
                  <div 
                    className="cursor-text py-2" 
                    onClick={handleInputFocus}
                  >
                    <span className="text-foreground text-sm">
                      {displayedPrompt}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-foreground ml-1 align-middle"
                        />
                      )}
                    </span>
                    {!displayedPrompt && !isTyping && (
                      <span className="text-muted-foreground text-sm">Введите ваш запрос...</span>
                    )}
                  </div>
                )}
              </div>

              {/* Send button */}
              <button 
                onClick={handleSend}
                className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                aria-label="Отправить запрос"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => handleQuickSuggestion(suggestion.prompt)}
                className="px-4 py-2 rounded-full text-sm text-muted-foreground bg-card border border-border hover:text-foreground hover:bg-muted transition-colors"
              >
                {suggestion.label}
              </motion.button>
            ))}
          </div>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTypingResponse && !isUserMode && !isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 rounded-lg bg-muted border border-border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-card flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <TypingIndicator />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <div className="p-4 rounded-lg bg-muted border border-border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-card flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-foreground">Aura</span>
                        <span className="text-xs text-muted-foreground">{selectedModel.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                        {displayedResponse}
                        {displayedResponse.length < demoResponse.length && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                            className="inline-block w-0.5 h-4 bg-foreground ml-1 align-middle"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Голос или текст • Мгновенный ответ
            </span>
            <span className="text-xs text-muted-foreground">100+ моделей доступно</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
