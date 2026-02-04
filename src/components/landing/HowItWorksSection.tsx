import { motion } from "framer-motion";
import { MousePointer, Wand2, CreditCard } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    number: "1",
    title: "Выберите модель",
    description: "Из 100+ вариантов для текста, изображений, видео и аудио",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Wand2,
    number: "2",
    title: "Создайте контент",
    description: "Отправьте запрос и получите результат за секунды",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: CreditCard,
    number: "3",
    title: "Платите за результат",
    description: "Только за использованные токены — от 0.01₽ за токен",
    color: "from-orange-500 to-red-500",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 relative bg-slate-900/50">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Как это работает
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Три простых шага до результата
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-orange-500/30" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center border border-slate-700/50 backdrop-blur-sm`}>
                  <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className={`absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} text-white text-lg font-bold flex items-center justify-center shadow-lg`}>
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 max-w-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
