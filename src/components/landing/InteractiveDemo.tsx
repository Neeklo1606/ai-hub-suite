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
  { icon: MessageSquare, label: "Текст", emoji: "💬" },
  { icon: Palette, label: "Картинка", emoji: "🎨" },
  { icon: Code, label: "Код", emoji: "</>" },
];

const quickSuggestions = [
  { label: "Написать статью", prompt: "Напиши статью на тему " },
  { label: "Создать логотип", prompt: "Создай описание логотипа для " },
  { label: "Сгенерировать код", prompt: "Напиши код на Python для " },
  { label: "Перевести текст", prompt: "Переведи на английский: " },
];

const models = [
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", icon: "⚡" },
  { id: "claude-3", name: "Claude 3", icon: "🧠" },
  { id: "gemini-pro", name: "Gemini Pro", icon: "✨" },
  { id: "gpt-4o", name: "GPT-4o", icon: "🚀" },
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
        className="relative rounded-3xl overflow-hidden"
        style={{
          boxShadow: "0 25px 80px -15px hsl(var(--primary) / 0.35), 0 0 60px -15px hsl(var(--primary) / 0.2)",
        }}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-3xl border border-slate-700/40" />
        <div 
          className="absolute -inset-[1px] rounded-3xl opacity-60" 
          style={{ 
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.3), transparent 50%, hsl(262 83% 58% / 0.3))",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", 
            maskComposite: "exclude", 
            padding: "1px" 
          }} 
        />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          {/* Header: Tabs + Model Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {modelTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-base font-medium transition-all duration-300",
                    activeTab === index
                      ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/20"
                      : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <span className="text-lg">{tab.emoji}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Model Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/50 hover:border-primary/50 transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-lg">{selectedModel.icon}</span>
                <span className="text-sm font-medium text-white">{selectedModel.name}</span>
                <ChevronDown className={cn(
                  "w-4 h-4 text-gray-400 transition-transform",
                  showModelDropdown && "rotate-180"
                )} />
              </button>

              <AnimatePresence>
                {showModelDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-xl overflow-hidden z-50"
                  >
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelDropdown(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                          selectedModel.id === model.id
                            ? "bg-primary/20 text-white"
                            : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                        )}
                      >
                        <span className="text-lg">{model.icon}</span>
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
              "flex items-center gap-3 p-4 sm:p-5 rounded-2xl bg-slate-800/50 border transition-all duration-300",
              isUserMode ? "border-primary/50 ring-2 ring-primary/20" : "border-slate-700/50"
            )}>
              {/* Voice Recorder */}
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                onRecordingChange={handleRecordingChange}
                disabled={false}
              />

              <div className="flex-1 min-h-[32px] flex items-center">
                {isRecording ? (
                  <span className="text-gray-400 text-base sm:text-lg">
                    Запись... нажмите ⏹ чтобы остановить
                  </span>
                ) : isUserMode ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Введите ваш запрос..."
                    className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none text-base sm:text-lg py-2"
                    autoFocus
                  />
                ) : (
                  <div 
                    className="cursor-text py-2" 
                    onClick={handleInputFocus}
                  >
                    <span className="text-white text-base sm:text-lg">
                      {displayedPrompt}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-6 bg-primary ml-1 align-middle"
                        />
                      )}
                    </span>
                    {!displayedPrompt && !isTyping && (
                      <span className="text-gray-500 text-base sm:text-lg">Введите ваш запрос...</span>
                    )}
                  </div>
                )}
              </div>

              {/* Send button */}
              <button 
                onClick={handleSend}
                className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105 transition-all"
                aria-label="Отправить запрос"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
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
                className="px-4 py-2 rounded-full text-sm text-gray-400 bg-slate-800/50 border border-slate-700/50 hover:text-white hover:border-primary/50 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all"
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
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
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
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                      <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-base font-semibold text-white">AI Hub</span>
                        <span className="text-xs text-gray-500">{selectedModel.name}</span>
                      </div>
                      <div className="text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {displayedResponse}
                        {displayedResponse.length < demoResponse.length && (
                          <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                            className="inline-block w-0.5 h-5 bg-primary ml-1 align-middle"
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
          <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-700/30">
            <span className="text-sm text-gray-500">
              🎤 Голос или текст • ⚡ Мгновенный ответ
            </span>
            <span className="text-sm text-gray-500/60">100+ моделей доступно</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
