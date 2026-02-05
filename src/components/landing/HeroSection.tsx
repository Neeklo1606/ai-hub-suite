import { motion } from "framer-motion";
import { SimpleInput } from "./SimpleInput";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const models = [
  { name: "OpenAI", icon: "🤖" },
  { name: "Claude", icon: "🧠" },
  { name: "Gemini", icon: "✨" },
  { name: "Midjourney", icon: "🎨" },
  { name: "Suno", icon: "🎵" },
];

export function HeroSection() {
  return (
    <section 
      id="main-content"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      
      {/* Single subtle glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30" 
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)" }}
        aria-hidden="true" 
      />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          
          {/* Model Icons Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 mb-8"
          >
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="w-10 h-10 rounded-full bg-card/50 border border-border flex items-center justify-center text-lg hover:scale-110 hover:bg-card transition-all cursor-default"
                title={model.name}
              >
                {model.icon}
              </motion.div>
            ))}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground font-medium px-3 py-1.5 rounded-full bg-card/30 border border-border"
            >
              +50
            </motion.span>
          </motion.div>

          {/* Hero Heading - Simplified */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight mb-4"
          >
            <span className="text-foreground">Все нейросети</span>
            <br />
            <span className="text-foreground">в </span>
            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-serif">
              одном
            </span>
            <span className="text-foreground"> месте</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            Текст, изображения, видео — без VPN
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10"
          >
            <Button asChild size="lg" variant="hero">
              <Link to="/register">
                Попробовать бесплатно
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Simple Input */}
          <SimpleInput />
        </div>
      </div>
    </section>
  );
}
