import { motion } from "framer-motion";
import { MousePointer, Wand2, CreditCard } from "lucide-react";

const steps = [
  {
    icon: MousePointer,
    number: "01",
    title: "Выбираете модель",
    description: "Из 100+ вариантов для текста, изображений, видео и аудио",
  },
  {
    icon: Wand2,
    number: "02",
    title: "Создаёте контент",
    description: "Отправляете запрос и получаете результат за секунды",
  },
  {
    icon: CreditCard,
    number: "03",
    title: "Платите за результат",
    description: "Только за использованные токены — от 0.01₽ за токен",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 relative bg-card/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Как это работает
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Три простых шага до результата
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
