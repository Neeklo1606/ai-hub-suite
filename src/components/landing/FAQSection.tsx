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
    question: "Как вы обеспечиваете безопасность?",
    answer: "Не храним ваши запросы дольше 24 часов. Все данные шифруются (AES-256). Соответствуем 152-ФЗ о персональных данных. Для корпоративных клиентов — выделенные серверы.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Банковские карты (Visa, MasterCard, МИР), ЮKassa, СБП, криптовалюты. Для юрлиц — оплата по счёту с актами и закрывающими документами.",
  },
  {
    question: "Можно ли использовать API?",
    answer: "Да, на тарифах Team и Enterprise. Вы получаете API-ключи с доступом ко всем моделям через единый интерфейс. Документация и песочница включены.",
  },
  {
    question: "Есть ли ограничения на использование?",
    answer: "На бесплатном тарифе — 10 запросов в минуту. На Pro — 100 запросов в минуту. Team и Enterprise — без ограничений. Генерация контента для взрослых запрещена.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Частые вопросы
          </h2>
          <p className="text-muted-foreground text-lg">
            Ответы на популярные вопросы о платформе
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-xl px-6 bg-card/50 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
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
