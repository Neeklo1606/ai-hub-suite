import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Как работает оплата?",
    answer: "Вы пополняете баланс и платите только за использованные токены. Никаких подписок.",
  },
  {
    question: "Нужен ли VPN?",
    answer: "Нет. Все модели работают напрямую из России.",
  },
  {
    question: "Какие модели доступны?",
    answer: "Более 100 AI-моделей: GPT-4, Claude 3, Gemini, Midjourney, DALL-E 3 и другие.",
  },
  {
    question: "Есть ли API?",
    answer: "Да, на тарифах Team и Enterprise с документацией и песочницей.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 max-w-2xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-white mb-8 text-center"
        >
          Частые вопросы
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#404040] transition-colors overflow-hidden px-0"
              >
                <AccordionTrigger className="text-left hover:no-underline px-6 py-4 cursor-pointer">
                  <span className="font-medium text-white text-sm">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 px-6 pb-4 pt-0 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
