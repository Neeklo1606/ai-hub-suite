import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-indigo-500/30 text-white rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

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
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 bg-slate-800/40 border-slate-700/40 rounded-xl text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl p-0 bg-slate-800/40 border border-slate-700/40 hover:border-slate-600 transition-colors duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline px-6 py-6 group cursor-pointer">
                  <span className="font-semibold text-white text-lg pr-4 group-hover:text-indigo-400 transition-colors duration-300">
                    {highlightText(faq.question, searchQuery)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 px-6 pb-6 pt-0 text-base leading-relaxed">
                  {highlightText(faq.answer, searchQuery)}
                </AccordionContent>
              </AccordionItem>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Ничего не найдено по запросу "{searchQuery}"
              </div>
            )}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
