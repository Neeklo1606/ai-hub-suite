import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 lg:py-28 relative bg-slate-900/50">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Простые и честные цены
          </h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            Выберите план, который подходит вам
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 md:gap-6"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: plan.popular ? 1.02 : 1.01, y: -4 }}
              className={`relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo-500/10 to-purple-500/10 border-indigo-500/50 shadow-lg shadow-indigo-500/20 lg:scale-105"
                  : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shadow-lg whitespace-nowrap">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Популярный
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                    <Check className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="text-slate-300 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/register">
                <Button
                  size="sm"
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  } text-sm sm:text-base py-2 sm:py-2.5`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
