import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "₽/мес",
    description: "Для знакомства с платформой",
    features: [
      "Базовые модели",
      "10 запросов/мин",
      "История 7 дней",
      "Поддержка по email",
    ],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Pro",
    price: "990",
    period: "₽/мес",
    description: "Для активных пользователей",
    features: [
      "Все 100+ моделей",
      "100 запросов/мин",
      "Приоритетная очередь",
      "Ранний доступ к новинкам",
      "История без ограничений",
      "Приоритетная поддержка",
    ],
    cta: "Выбрать Pro",
    popular: true,
  },
  {
    name: "Team",
    price: "4 990",
    period: "₽/мес",
    description: "Для команд и агентств",
    features: [
      "Всё из Pro",
      "До 5 пользователей",
      "Общий баланс команды",
      "API-доступ",
      "Детальная аналитика",
      "Менеджер аккаунта",
    ],
    cta: "Выбрать Team",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "По запросу",
    period: "",
    description: "Для крупного бизнеса",
    features: [
      "Всё из Team",
      "Неограничено пользователей",
      "SLA 99.9%",
      "Электронный документооборот",
      "Выделенный менеджер",
      "Кастомные интеграции",
    ],
    cta: "Связаться",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Простые и честные цены
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Выберите план, который подходит вам
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative p-8 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo-500/10 to-purple-500/10 shadow-xl lg:scale-105"
                  : "bg-slate-800/30 hover:bg-slate-800/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg">
                  Популярный
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 text-sm">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-400' : 'text-gray-500'}`} />
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <Button
                  size="sm"
                  variant={plan.popular ? "default" : "secondary"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
