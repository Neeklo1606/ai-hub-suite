import { motion } from "framer-motion";
import { InteractiveDemo } from "./InteractiveDemo";

export function HeroSection() {
  return (
    <section 
      id="main-content"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Background with gradient */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: "linear-gradient(135deg, hsl(222 47% 6%) 0%, hsl(257 53% 13%) 50%, hsl(222 47% 6%) 100%)" 
        }} 
        aria-hidden="true" 
      />
      
      {/* Radial glow from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, hsla(239 84% 67% / 0.25), transparent 60%)"
        }}
        aria-hidden="true"
      />
      
      {/* Secondary glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6366f1]/20 rounded-full blur-[150px] opacity-60" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a855f7]/15 rounded-full blur-[120px] opacity-50" aria-hidden="true" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Hero Heading with gradient text */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight will-change-transform mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
              100+ нейросетей
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]">
              в одном окне
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-8"
          >
            Текст, изображения, видео, аудио, код — всё без VPN. Платите только за использование.
          </motion.p>

          {/* Interactive Demo */}
          <InteractiveDemo />
        </div>
      </div>
    </section>
  );
}
