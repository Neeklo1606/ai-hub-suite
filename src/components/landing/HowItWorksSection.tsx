import { motion } from "framer-motion";
import { MousePointer, Wand2, CreditCard } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    number: "1",
    title: "Выберите модель",
    description: "Из 100+ вариантов для текста, изображений, видео и аудио",
  },
  {
    icon: Wand2,
    number: "2",
    title: "Создайте контент",
    description: "Отправьте запрос и получите результат за секунды",
  },
  {
    icon: CreditCard,
    number: "3",
    title: "Платите за результат",
    description: "Только за использованные токены — от 0.01₽ за токен",
  },
];

export function HowItWorksSection() {
  return (
    <section 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(222 47% 8%) 0%, hsl(257 53% 10%) 50%, hsl(222 47% 8%) 100%)"
      }}
    >
      {/* Purple glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, hsla(280 84% 60% / 0.08), transparent 70%)"
        }}
        aria-hidden="true"
      />
      
      <div className="container relative px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Как это работает
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Три простых шага до результата
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-700/40 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                  <step.icon className="w-10 h-10 text-indigo-400" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-base text-slate-400 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
