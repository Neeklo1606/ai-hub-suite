import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { VoiceAssistant } from "./VoiceAssistant";

export function HeroSection() {
  return (
    <section 
      id="main-content"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40 pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-slate-950" aria-hidden="true" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(240,100%,60%,0.1),transparent)]" aria-hidden="true" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight will-change-transform"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              100+ нейросетей
            </span>
            <br />
            <span className="text-white">в одном окне</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-400 max-w-xl"
          >
            Текст, изображения, видео, аудио, код — всё без VPN. Платите только за использование.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 will-change-transform"
            role="group"
            aria-label="Действия"
          >
            <Link to="/register">
              <Button size="lg">
                Начать бесплатно
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </Link>
            <Button variant="secondary" size="lg" aria-label="Смотреть демонстрацию продукта">
              <Play className="w-5 h-5 mr-2" aria-hidden="true" />
              Смотреть демо
            </Button>
          </motion.div>

          <VoiceAssistant />
        </div>
      </div>
    </section>
  );
}
