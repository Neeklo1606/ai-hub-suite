import { useState, useEffect, useRef } from "react";
 import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Zap, Image, Code, FileText, Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
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
 
const WaveformBars = () => (
  <div className="flex items-center gap-0.5 h-5" role="img" aria-label="Запись голоса">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-indigo-500 rounded-full"
        animate={{ height: ["6px", "16px", "8px", "14px", "6px"] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        aria-hidden="true"
      />
    ))}
  </div>
);

 export function InteractiveDemo() {
   const [displayedPrompt, setDisplayedPrompt] = useState("");
   const [showResponse, setShowResponse] = useState(false);
   const [displayedResponse, setDisplayedResponse] = useState("");
   const [isTyping, setIsTyping] = useState(true);
   const [promptIndex, setPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isUserMode, setIsUserMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
 
   const currentPrompt = demoPrompts[promptIndex];
 
  // Speech recognition hook
  const {
    isListening,
    isSupported,
    interimTranscript,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language: "ru-RU",
    continuous: false,
    onResult: (result) => {
      if (result.isFinal) {
        setUserInput((prev) => prev + result.transcript);
        setIsUserMode(true);
        setIsTyping(false);
      }
    },
    onError: (error) => {
      toast.error(error);
    },
    onEnd: () => {
      // Focus input after voice ends
      inputRef.current?.focus();
    },
  });

  // Handle voice button click
  const handleVoiceClick = () => {
    if (isListening) {
      stopListening();
    } else {
      // Stop demo animation when user starts speaking
      setIsTyping(false);
      setIsUserMode(true);
      setShowResponse(false);
      startListening();
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
    if (!isTyping || isUserMode) return;
     
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
  }, [currentPrompt, isTyping, promptIndex, isUserMode]);
 
   // Typing animation for response
   useEffect(() => {
    if (!showResponse || isUserMode) return;
 
     let charIndex = 0;
     const typeInterval = setInterval(() => {
       if (charIndex < demoResponse.length) {
         setDisplayedResponse(demoResponse.slice(0, charIndex + 1));
         charIndex++;
       } else {
         clearInterval(typeInterval);
         // Reset after delay
         setTimeout(() => {
          if (!isUserMode) {
            setPromptIndex((prev) => (prev + 1) % demoPrompts.length);
            setIsTyping(true);
          }
         }, 4000);
       }
     }, 15);
 
     return () => clearInterval(typeInterval);
  }, [showResponse, isUserMode]);
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5, delay: 0.3 }}
       className="w-full max-w-3xl mx-auto mt-12"
     >
       {/* Bonus badge */}
       <motion.div
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.5 }}
         className="flex justify-center mb-6"
       >
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
           <Zap className="w-4 h-4 text-indigo-400" aria-hidden="true" />
           <span className="text-sm text-indigo-300 font-medium">
             +100₽ на баланс при регистрации
           </span>
         </div>
       </motion.div>
 
       {/* Main demo container with glassmorphism */}
       <div 
         className="relative rounded-2xl overflow-hidden"
         style={{
           boxShadow: "0 20px 60px -15px rgba(139, 92, 246, 0.25), 0 0 40px -10px rgba(99, 102, 241, 0.15)",
         }}
       >
         {/* Glass background */}
         <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" />
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
         
         {/* Border glow effect */}
         <div className="absolute inset-0 rounded-2xl border border-slate-700/50" />
         <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-50" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", padding: "1px" }} />
 
         <div className="relative z-10 p-6">
           {/* Model tabs */}
           <div className="flex items-center gap-2 mb-6">
             {modelTabs.map((tab, index) => (
               <button
                 key={index}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                   tab.active
                     ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                     : "text-gray-500 hover:text-gray-400 hover:bg-slate-800/50"
                 }`}
               >
                 <tab.icon className="w-4 h-4" aria-hidden="true" />
                 {tab.label}
               </button>
             ))}
             <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               GPT-4 Turbo
             </div>
           </div>
 
           {/* Input area */}
           <div className="relative mb-4">
             <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
              {/* Voice button */}
              {isSupported && (
                <button
                  onClick={handleVoiceClick}
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-slate-700/50 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 border border-slate-600/50"
                  }`}
                  aria-label={isListening ? "Остановить запись" : "Начать запись голоса"}
                  aria-pressed={isListening}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Mic className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              )}

               <div className="flex-1 min-h-[24px]">
                {isListening ? (
                  <div className="flex items-center gap-3">
                    <WaveformBars />
                    <span className="text-white">
                      {interimTranscript || "Слушаю..."}
                    </span>
                  </div>
                ) : isUserMode ? (
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Введите ваш запрос..."
                    className="w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                    autoFocus
                  />
                ) : (
                  <div 
                    className="cursor-text" 
                    onClick={handleInputFocus}
                  >
                    <span className="text-white">
                      {displayedPrompt}
                      {isTyping && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-indigo-400 ml-0.5 align-middle"
                        />
                      )}
                    </span>
                    {!displayedPrompt && !isTyping && (
                      <span className="text-gray-500">Введите ваш запрос...</span>
                    )}
                  </div>
                 )}
               </div>

               <button 
                onClick={handleSend}
                 className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
                 aria-label="Отправить запрос"
               >
                 <Send className="w-4 h-4" aria-hidden="true" />
               </button>
             </div>
           </div>
 
           {/* Response area */}
           <AnimatePresence>
            {showResponse && !isUserMode && (
               <motion.div
                 initial={{ opacity: 0, y: 10, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: "auto" }}
                 exit={{ opacity: 0, y: -10, height: 0 }}
                 transition={{ duration: 0.3 }}
                 className="overflow-hidden"
               >
                 <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                   <div className="flex items-start gap-3">
                     <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                       <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-sm font-medium text-indigo-300">AI Hub</span>
                         <span className="text-xs text-gray-500">GPT-4 Turbo</span>
                       </div>
                       <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                         {displayedResponse}
                         {displayedResponse.length < demoResponse.length && (
                           <motion.span
                             animate={{ opacity: [1, 0] }}
                             transition={{ duration: 0.3, repeat: Infinity }}
                             className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-middle"
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
           <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
             <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                {isSupported ? "🎤 Голос или текст" : "Попробуйте:"}
              </span>
              {!isListening && ["Текст", "Изображение", "Код"].map((hint, i) => (
                 <button
                   key={i}
                   className="text-xs text-gray-400 hover:text-indigo-400 transition-colors"
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
             <span className="text-xs text-gray-600">100+ моделей доступно</span>
           </div>
         </div>
       </div>
     </motion.div>
   );
 }