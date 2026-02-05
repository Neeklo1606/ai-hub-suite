import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "₽/мес",
    bonus: "",
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
    bonus: "Экономия 20% при годовой оплате",
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
    bonus: "За всю команду",
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
    bonus: "Индивидуальные условия",
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
    <section 
      id="pricing" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(217 33% 9%) 0%, hsl(257 53% 10%) 50%, hsl(222 47% 6%) 100%)"
      }}
    >
      {/* Mesh gradient effect like Stripe */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, hsla(239 84% 67% / 0.15), transparent 30%),
            radial-gradient(circle at 90% 30%, hsla(280 84% 60% / 0.12), transparent 30%),
            radial-gradient(circle at 50% 80%, hsla(263 70% 50% / 0.1), transparent 30%)
          `
        }}
        aria-hidden="true"
      />
      
      <div className="container relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white">
            Простые и честные цены
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Выберите план, который подходит вам
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
              className={`relative flex flex-col min-h-[520px] sm:min-h-[580px] p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-indigo-500 shadow-2xl shadow-indigo-500/30 lg:scale-105 z-10"
                  : "border border-slate-700/40 hover:border-slate-600/60 hover:shadow-xl hover:shadow-indigo-500/10"
              }`}
              style={{
                background: plan.popular 
                  ? "linear-gradient(135deg, hsla(215 28% 20% / 0.8) 0%, hsla(257 53% 25% / 0.5) 50%, hsla(215 28% 20% / 0.8) 100%)"
                  : "linear-gradient(135deg, hsla(215 28% 17% / 0.5) 0%, hsla(257 53% 21% / 0.2) 50%, hsla(215 28% 17% / 0.5) 100%)"
              }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] text-white text-xs font-bold uppercase tracking-wide shadow-lg shadow-indigo-500/40">
                  Популярный
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 text-base">{plan.period}</span>}
                </div>
                {plan.bonus && (
                  <p className="text-sm text-indigo-400 mt-2">{plan.bonus}</p>
                )}
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-indigo-400" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register" className="mt-8">
                <Button
                  variant={plan.popular ? "default" : "secondary"}
                  className="w-full py-3 px-6 rounded-xl"
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
