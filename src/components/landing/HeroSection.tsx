import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Plus, AtSign, MessageSquare, Image, Video, Music, Code, FileText } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const modelPills = [
  { name: "GPT-4 Turbo", icon: "🤖", active: true },
  { name: "Claude Opus", icon: "🎨", active: false },
  { name: "Gemini Ultra", icon: "⚡", active: false },
  { name: "Perplexity", icon: "🔍", active: false },
];

const actionButtons = [
  { icon: "📄", text: "Анализ договора" },
  { icon: "🔌", text: "API для разработчиков" },
];

const modelCards = [
  { icon: MessageSquare, title: "Текст", gradient: "from-blue-500 to-cyan-500" },
  { icon: Image, title: "Изображения", gradient: "from-purple-500 to-pink-500" },
  { icon: Video, title: "Видео", gradient: "from-orange-500 to-red-500" },
  { icon: Music, title: "Аудио", gradient: "from-green-500 to-emerald-500" },
  { icon: Code, title: "Код", gradient: "from-yellow-500 to-orange-500" },
  { icon: FileText, title: "Документы", gradient: "from-indigo-500 to-purple-500" },
];

export function HeroSection() {
  const [userInput, setUserInput] = useState("");
  const [activeModel, setActiveModel] = useState("GPT-4 Turbo");
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceTranscript = (text: string) => {
    setUserInput((prev) => prev + (prev ? " " : "") + text);
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
    <section className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Logo/Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-7xl font-semibold text-white mb-20 text-center"
        >
          AI Hub
        </motion.h1>

        {/* Model Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 items-center justify-center mb-8"
        >
          {modelPills.map((pill) => (
            <button
              key={pill.name}
              onClick={() => setActiveModel(pill.name)}
              className={cn(
                "px-6 py-3 rounded-full text-sm text-white cursor-pointer transition-all duration-200 flex items-center gap-2",
                activeModel === pill.name
                  ? "bg-[#8b5cf6] border border-[#8b5cf6]"
                  : "bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#404040]"
              )}
            >
              <span>{pill.icon}</span>
              <span>{pill.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Chat Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-3xl mb-6"
        >
          <div className="relative flex items-center">
            {/* Left icons */}
            <div className="absolute left-4 flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-300 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-300 transition-colors">
                <AtSign className="w-5 h-5" />
              </button>
            </div>

            {/* Input */}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isRecording ? "Запись..." : "Введите ваш запрос..."}
              disabled={isRecording}
              className="w-full pl-24 pr-24 py-5 bg-[#1a1a1a] border border-[#2a2a2a] focus:border-[#8b5cf6] rounded-2xl text-white text-base placeholder-gray-500 outline-none transition-colors"
            />

            {/* Right icons */}
            <div className="absolute right-4 flex items-center gap-2">
              <VoiceRecorder 
                onTranscript={handleVoiceTranscript}
                onRecordingChange={setIsRecording}
                disabled={false}
              />
              <button 
                onClick={handleSend}
                disabled={!userInput.trim()}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  userInput.trim()
                    ? "text-[#8b5cf6] hover:bg-[#8b5cf6]/10"
                    : "text-gray-500 cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          {actionButtons.map((btn) => (
            <button
              key={btn.text}
              className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#404040] rounded-full text-sm text-white flex items-center gap-2 transition-all duration-200"
            >
              <span>{btn.icon}</span>
              <span>{btn.text}</span>
            </button>
          ))}
        </motion.div>

        {/* Model Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full"
        >
          <h2 className="text-lg font-medium text-white mb-6 text-center">
            Все типы AI-моделей
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {modelCards.map((card) => (
              <button
                key={card.title}
                className="p-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#404040] rounded-2xl cursor-pointer transition-all duration-200 flex flex-col items-center gap-3"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br",
                  card.gradient
                )}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-white">{card.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
