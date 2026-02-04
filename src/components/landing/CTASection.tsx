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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-[#0a0e27]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,hsla(240,100%,60%,0.08),transparent)]" />
      
      <div className="container px-4 md:px-6 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
            <span className="text-lg">🚀</span>
            <span className="text-sm text-slate-300 font-medium">Все AI-модели в одном окне</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Попробуйте сейчас бесплатно
          </h2>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl mx-auto">
            Получите <span className="text-indigo-400 font-semibold">100₽</span> на баланс при регистрации.
            <br />
            Без привязки карты.
          </p>

          <Link to="/register">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all text-lg px-10 py-7 h-auto mb-10"
            >
              Начать работу
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm md:text-base text-slate-400">
                <Check className="w-5 h-5 text-indigo-400" />
                {benefit}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
