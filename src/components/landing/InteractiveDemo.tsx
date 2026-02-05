 import { useState, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Sparkles, Send, Zap, Image, Code, FileText } from "lucide-react";
 
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
 
   const currentPrompt = demoPrompts[promptIndex];
 
   // Typing animation for prompt
   useEffect(() => {
     if (!isTyping) return;
     
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
   }, [currentPrompt, isTyping, promptIndex]);
 
   // Typing animation for response
   useEffect(() => {
     if (!showResponse) return;
 
     let charIndex = 0;
     const typeInterval = setInterval(() => {
       if (charIndex < demoResponse.length) {
         setDisplayedResponse(demoResponse.slice(0, charIndex + 1));
         charIndex++;
       } else {
         clearInterval(typeInterval);
         // Reset after delay
         setTimeout(() => {
           setPromptIndex((prev) => (prev + 1) % demoPrompts.length);
           setIsTyping(true);
         }, 4000);
       }
     }, 15);
 
     return () => clearInterval(typeInterval);
   }, [showResponse]);
 
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
               <div className="flex-1 min-h-[24px]">
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
               <button 
                 className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
                 aria-label="Отправить запрос"
               >
                 <Send className="w-4 h-4" aria-hidden="true" />
               </button>
             </div>
           </div>
 
           {/* Response area */}
           <AnimatePresence>
             {showResponse && (
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
               <span className="text-xs text-gray-500">Попробуйте:</span>
               {["Текст", "Изображение", "Код"].map((hint, i) => (
                 <button
                   key={i}
                   className="text-xs text-gray-400 hover:text-indigo-400 transition-colors"
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