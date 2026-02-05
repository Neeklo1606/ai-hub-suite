import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(257 53% 12%) 50%, hsl(222 47% 6%) 100%)"
      }}
    >
      {/* Glow effects */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, hsla(239 84% 67% / 0.2), transparent 60%)"
        }}
        aria-hidden="true"
      />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Попробуйте сейчас бесплатно
          </h2>
          
          <p className="text-base text-slate-400 mb-8 max-w-xl mx-auto">
            Получите <span className="text-indigo-400 font-semibold">100₽</span> на баланс при регистрации.
            {" "}Без привязки карты.
          </p>

          <Link to="/register">
            <Button size="lg" className="shadow-xl shadow-indigo-500/40">
              Начать работу
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
