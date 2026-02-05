import { motion } from "framer-motion";

const steps = [
  { number: "1", title: "Выберите модель" },
  { number: "2", title: "Отправьте запрос" },
  { number: "3", title: "Получите результат" },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container px-4 max-w-3xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center"
        >
          Как это работает
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-semibold mb-4">
                {step.number}
              </div>
              <span className="text-sm text-[#1A1A1A]">{step.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
