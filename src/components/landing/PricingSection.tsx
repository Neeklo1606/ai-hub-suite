import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    bonus: "100₽",
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
    bonus: "500₽",
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
    bonus: "2 500₽",
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
    price: "Custom",
    bonus: "Custom",
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
    <section className="py-24 relative bg-card/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Простые и честные цены
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выберите план и получите бонус на баланс
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-primary/10 to-card border-primary/50 scale-105"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Популярный
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {plan.price === "Custom" ? (
                    <span className="text-3xl font-bold">По запросу</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">₽/мес</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-primary mt-1">
                  +{plan.bonus} на баланс
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
