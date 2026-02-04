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
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="container px-4 md:px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Частые вопросы
          </h2>
          <p className="text-slate-400 text-lg md:text-xl">
            Ответы на популярные вопросы о платформе
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-slate-700/50 rounded-2xl px-6 bg-slate-800/30 backdrop-blur-sm data-[state=open]:border-indigo-500/30 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 md:py-6">
                  <span className="font-medium text-white text-base md:text-lg pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-5 md:pb-6 text-sm md:text-base leading-relaxed">
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
