import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "₽/мес",
    description: "Для знакомства",
    cta: "Начать",
    popular: false,
  },
  {
    name: "Pro",
    price: "990",
    period: "₽/мес",
    description: "Все модели",
    cta: "Выбрать",
    popular: true,
  },
  {
    name: "Team",
    price: "4 990",
    period: "₽/мес",
    description: "До 5 человек",
    cta: "Выбрать",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-[#FAFAFA]">
      <div className="container px-4 max-w-4xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#1A1A1A] mb-12 text-center"
        >
          Тарифы
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-6 rounded-2xl transition-all duration-200 flex flex-col items-center text-center",
                plan.popular
                  ? "bg-[#8B5CF6]"
                  : "bg-white border border-[#E5E5E5] hover:border-[#8B5CF6]"
              )}
            >
              <span className={cn(
                "text-sm font-medium mb-4",
                plan.popular ? "text-white/80" : "text-[#999999]"
              )}>
                {plan.name}
              </span>

              <div className="flex items-baseline gap-1 mb-2">
                <span className={cn(
                  "text-4xl font-bold",
                  plan.popular ? "text-white" : "text-[#1A1A1A]"
                )}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={cn(
                    "text-sm",
                    plan.popular ? "text-white/60" : "text-[#999999]"
                  )}>
                    {plan.period}
                  </span>
                )}
              </div>

              <span className={cn(
                "text-sm mb-6",
                plan.popular ? "text-white/70" : "text-[#666666]"
              )}>
                {plan.description}
              </span>

              <Link
                to="/register"
                className={cn(
                  "w-full py-3 px-6 rounded-full text-sm font-medium transition-all duration-200 text-center",
                  plan.popular
                    ? "bg-white text-[#8B5CF6] hover:bg-gray-100"
                    : "bg-[#1A1A1A] text-white hover:bg-[#333333]"
                )}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
