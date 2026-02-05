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
    answer: "Вы пополняете баланс и платите только за использованные токены.",
  },
  {
    question: "Нужен ли VPN?",
    answer: "Нет. Все модели работают напрямую из России.",
  },
  {
    question: "Какие модели доступны?",
    answer: "GPT-4, Claude 3, Gemini, Midjourney, DALL-E 3 и более 100 других.",
  },
  {
    question: "Есть ли API?",
    answer: "Да, на тарифах Team и Enterprise.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container px-4 max-w-2xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center"
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
                className="rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] hover:border-[#8B5CF6] transition-colors overflow-hidden px-0"
              >
                <AccordionTrigger className="text-left hover:no-underline px-6 py-4 cursor-pointer">
                  <span className="font-medium text-[#1A1A1A] text-sm">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] px-6 pb-4 pt-0 text-sm leading-relaxed">
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
