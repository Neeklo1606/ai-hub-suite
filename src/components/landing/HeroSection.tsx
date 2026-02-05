import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Plus, AtSign } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const modelPills = [
  { name: "GPT-4", icon: "🤖" },
  { name: "Claude", icon: "🎨" },
  { name: "Gemini", icon: "⚡" },
  { name: "Perplexity", icon: "🔍" },
];

export function HeroSection() {
  const [userInput, setUserInput] = useState("");
  const [activeModel, setActiveModel] = useState("GPT-4");
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
    <section className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-7xl font-bold text-[#1A1A1A] mb-6 text-center leading-tight"
        >
          AI Hub
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-[#666666] mb-12 text-center max-w-xl"
        >
          Все AI-модели в одном месте. Без VPN, с оплатой в рублях.
        </motion.p>

        {/* Model Selector Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 items-center justify-center mb-8"
        >
          {modelPills.map((pill) => (
            <button
              key={pill.name}
              onClick={() => setActiveModel(pill.name)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm cursor-pointer transition-all duration-200 flex items-center gap-2",
                activeModel === pill.name
                  ? "bg-[#8B5CF6] text-white"
                  : "bg-white text-[#1A1A1A] border border-[#E5E5E5] hover:border-[#8B5CF6]"
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
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl mb-8"
        >
          <div className="relative flex items-center">
            {/* Left icons */}
            <div className="absolute left-4 flex items-center gap-2">
              <button className="p-2 text-[#999999] hover:text-[#666666] transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#999999] hover:text-[#666666] transition-colors">
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
              className="w-full pl-24 pr-24 py-4 bg-white border border-[#E5E5E5] focus:border-[#8B5CF6] rounded-2xl text-[#1A1A1A] text-base placeholder-[#999999] outline-none transition-colors shadow-sm"
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
                    ? "text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
                    : "text-[#CCCCCC] cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="/register"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="px-8 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-full text-white font-medium transition-colors"
        >
          Начать бесплатно
        </motion.a>
      </div>
    </section>
  );
}
