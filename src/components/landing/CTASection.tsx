import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Регистрация за 30 секунд",
  "Доступ ко всем моделям",
  "Поддержка 24/7",
];

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-[#0a0e27]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,hsla(240,100%,60%,0.08),transparent)]" />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 sm:mb-8"
          >
            <span className="text-base sm:text-lg">🚀</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">Все AI-модели в одном окне</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
            Попробуйте сейчас бесплатно
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-6 sm:mb-8 max-w-xl mx-auto px-4 sm:px-0">
            Получите <span className="text-indigo-400 font-semibold">100₽</span> на баланс при регистрации.
            <br />
            Без привязки карты.
          </p>

          <Link to="/register">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-7 h-auto mb-8 sm:mb-10"
              >
                Начать работу
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </motion.div>
          </Link>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3 px-4 sm:px-0"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base text-slate-400">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 shrink-0" />
                {benefit}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
