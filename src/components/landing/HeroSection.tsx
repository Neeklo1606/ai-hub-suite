import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { VoiceAssistant } from "./VoiceAssistant";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-12 sm:pb-16 md:pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#0f1429] to-[#0a0e27]" />
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(240,100%,60%,0.15),transparent)]" />
      <div className="absolute top-1/3 left-1/4 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[250px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[350px] lg:h-[400px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 mb-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm"
          >
            <span className="text-base sm:text-lg">🚀</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">Все AI-модели в одном окне</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] sm:leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              100+ нейросетей
            </span>
            <br />
            <span className="text-white">в одном окне</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl sm:max-w-2xl leading-relaxed px-2"
          >
            Текст, изображения, видео, аудио, код — всё без VPN.
            <br className="hidden sm:block" />
            Платите только за использование. Без абонентской платы.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link to="/register" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
              >
                Начать бесплатно
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              size="lg"
              className="w-full sm:w-auto"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Смотреть демо
            </Button>
          </motion.div>

          {/* Voice Assistant Interface */}
          <VoiceAssistant />
        </div>
      </div>
    </section>
  );
}
