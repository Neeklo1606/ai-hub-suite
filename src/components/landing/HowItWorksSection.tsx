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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 relative bg-slate-900/50">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Как это работает
          </h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Три простых шага до результата
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative"
        >
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-orange-500/30" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="relative mb-4 sm:mb-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center border border-slate-700/50 backdrop-blur-sm group-hover:border-slate-600 transition-colors`}>
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${step.color} text-white text-base sm:text-lg font-bold flex items-center justify-center shadow-lg`}>
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 sm:mb-3">{step.title}</h3>
              <p className="text-sm sm:text-base text-slate-400 max-w-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
