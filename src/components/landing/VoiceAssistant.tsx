 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Mic, MicOff, MessageSquare, Image, Video, Music, Code } from "lucide-react";
 
 const quickActions = [
   {
     icon: MessageSquare,
     label: "Текст",
     gradient: "from-blue-500 to-cyan-500",
     bgGradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
     hoverGradient: "group-hover:from-blue-500/30 group-hover:to-cyan-500/30",
     href: "#models",
   },
   {
     icon: Image,
     label: "Изображения",
     gradient: "from-purple-500 to-pink-500",
     bgGradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
     hoverGradient: "group-hover:from-purple-500/30 group-hover:to-pink-500/30",
     href: "#models",
   },
   {
     icon: Video,
     label: "Видео",
     gradient: "from-orange-500 to-red-500",
     bgGradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
     hoverGradient: "group-hover:from-orange-500/30 group-hover:to-red-500/30",
     href: "#models",
   },
   {
     icon: Music,
     label: "Аудио",
     gradient: "from-green-500 to-emerald-500",
     bgGradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
     hoverGradient: "group-hover:from-green-500/30 group-hover:to-emerald-500/30",
     href: "#models",
   },
   {
     icon: Code,
     label: "Код",
     gradient: "from-indigo-500 to-violet-500",
     bgGradient: "bg-gradient-to-br from-indigo-500/20 to-violet-500/20",
     hoverGradient: "group-hover:from-indigo-500/30 group-hover:to-violet-500/30",
     href: "#models",
   },
 ];
 
 const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
     opacity: 1,
     transition: { staggerChildren: 0.08, delayChildren: 0.2 },
   },
 };
 
 const itemVariants = {
   hidden: { opacity: 0, y: 20, scale: 0.9 },
   visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
 };
 
 // Waveform bars for recording animation
 const WaveformBars = () => (
   <div className="flex items-center gap-0.5 h-6">
     {[...Array(5)].map((_, i) => (
       <motion.div
         key={i}
         className="w-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
         animate={{
           height: ["8px", "24px", "12px", "20px", "8px"],
         }}
         transition={{
           duration: 1,
           repeat: Infinity,
           delay: i * 0.1,
           ease: "easeInOut",
         }}
       />
     ))}
   </div>
 );
 
 export function VoiceAssistant() {
   const [isRecording, setIsRecording] = useState(false);
   const [isHovering, setIsHovering] = useState(false);
 
   const toggleRecording = () => {
     setIsRecording(!isRecording);
   };
 
   return (
     <motion.div
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.6, delay: 0.7 }}
       className="w-full max-w-2xl mx-auto mt-8 sm:mt-12"
     >
       <div className="relative p-4 sm:p-6 bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
         {/* Glow effect */}
         <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />
         
         {/* Voice Input Area */}
         <div className="relative flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
           {/* Microphone Button */}
           <motion.button
             onClick={toggleRecording}
             onHoverStart={() => setIsHovering(true)}
             onHoverEnd={() => setIsHovering(false)}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className={`relative flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
               isRecording
                 ? "bg-gradient-to-br from-red-500 to-pink-600 shadow-lg shadow-red-500/40"
                 : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30"
             }`}
           >
             {/* Pulse ring animation when recording */}
             <AnimatePresence>
               {isRecording && (
                 <motion.div
                   initial={{ scale: 1, opacity: 0.5 }}
                   animate={{ scale: 1.8, opacity: 0 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 1, repeat: Infinity }}
                   className="absolute inset-0 rounded-xl bg-red-500"
                 />
               )}
             </AnimatePresence>
             
             {isRecording ? (
               <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
             ) : (
               <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
             )}
           </motion.button>
 
           {/* Input Area / Waveform */}
           <div className="flex-1 min-w-0">
             <AnimatePresence mode="wait">
               {isRecording ? (
                 <motion.div
                   key="waveform"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex items-center gap-3"
                 >
                   <WaveformBars />
                   <span className="text-sm sm:text-base text-white font-medium">
                     Слушаю...
                   </span>
                 </motion.div>
               ) : (
                 <motion.div
                   key="placeholder"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex items-center"
                 >
                   <span className="text-base sm:text-lg text-slate-400 truncate">
                     Расскажите вашу задачу...
                   </span>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
 
           {/* Recording indicator dot */}
           <AnimatePresence>
             {isRecording && (
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 exit={{ scale: 0 }}
                 className="flex-shrink-0"
               >
                 <motion.div
                   animate={{ opacity: [1, 0.3, 1] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="w-3 h-3 rounded-full bg-red-500"
                 />
               </motion.div>
             )}
           </AnimatePresence>
         </div>
 
         {/* Quick Action Cards */}
         <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide"
         >
           {quickActions.map((action, index) => (
             <motion.a
               key={index}
               href={action.href}
               variants={itemVariants}
               whileHover={{ scale: 1.05, y: -2 }}
               whileTap={{ scale: 0.98 }}
               className={`group flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl ${action.bgGradient} ${action.hoverGradient} border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 cursor-pointer`}
             >
               <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-2`}>
                 <action.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
               </div>
               <span className="text-[10px] sm:text-xs text-slate-300 font-medium text-center leading-tight">
                 {action.label}
               </span>
             </motion.a>
           ))}
         </motion.div>
 
         {/* Hint text */}
         <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1.2 }}
           className="text-center text-xs text-slate-500 mt-4"
         >
           Нажмите на микрофон или выберите категорию
         </motion.p>
       </div>
     </motion.div>
   );
 }