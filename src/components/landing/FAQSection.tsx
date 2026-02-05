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
    answer: "Вы пополняете баланс и платите только за использованные токены. Никаких подписок или скрытых комиссий. Минимальное пополнение — 100₽. Баланс не сгорает.",
  },
  {
    question: "Нужен ли VPN?",
    answer: "Нет! Все модели работают напрямую из России. Мы используем собственную инфраструктуру, которая обеспечивает стабильный доступ ко всем AI-сервисам.",
  },
  {
    question: "Как вы обеспечиваете безопасность данных?",
    answer: "Не храним ваши запросы дольше 24 часов. Все данные шифруются (AES-256). Соответствуем 152-ФЗ о персональных данных. Для корпоративных клиентов — выделенные серверы.",
  },
  {
    question: "Какие модели доступны?",
    answer: "Более 100 AI-моделей: GPT-4, Claude 3, Gemini, Midjourney, DALL-E 3, Stable Diffusion, Sora, ElevenLabs, Suno AI и многие другие. Мы постоянно добавляем новые модели.",
  },
  {
    question: "Можно ли использовать для бизнеса?",
    answer: "Да! У нас есть специальные тарифы Team и Enterprise с API-доступом, выделенным менеджером, ЭДО и SLA. Подходит для агентств, маркетологов и корпораций.",
  },
  {
    question: "Есть ли API?",
    answer: "Да, на тарифах Team и Enterprise. Вы получаете API-ключи с доступом ко всем моделям через единый интерфейс. Документация и песочница включены.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 relative bg-slate-900/50">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Частые вопросы
          </h2>
          <p className="text-gray-400 text-base">
            Ответы на популярные вопросы о платформе
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl px-6 bg-slate-800/30 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-semibold text-white text-base pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-6 text-base leading-relaxed">
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
