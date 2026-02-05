import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveDemo } from "./InteractiveDemo";

export function HeroSection() {
  return (
    <section 
      id="main-content"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B0F1A]" aria-hidden="true" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] opacity-50" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] opacity-40" aria-hidden="true" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight will-change-transform mb-6"
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
            className="text-base sm:text-lg text-gray-400 max-w-xl mb-4"
          >
            Текст, изображения, видео, аудио, код — всё без VPN. Платите только за использование.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Link to="/register">
              <Button size="lg" className="shadow-lg shadow-indigo-500/30">
                Начать бесплатно
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </motion.div>

          {/* Interactive Demo */}
          <InteractiveDemo />
        </div>
      </div>
    </section>
  );
}
