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
    <section id="pricing" className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 max-w-4xl mx-auto">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-white mb-8 text-center"
        >
          Тарифы
        </motion.h2>

        {/* Cards */}
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
                  ? "bg-[#8b5cf6] border border-[#8b5cf6]"
                  : "bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#404040]"
              )}
            >
              {/* Plan name */}
              <span className={cn(
                "text-sm font-medium mb-4",
                plan.popular ? "text-white/80" : "text-gray-500"
              )}>
                {plan.name}
              </span>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className={cn(
                    "text-sm",
                    plan.popular ? "text-white/60" : "text-gray-500"
                  )}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Description */}
              <span className={cn(
                "text-sm mb-6",
                plan.popular ? "text-white/70" : "text-gray-500"
              )}>
                {plan.description}
              </span>

              {/* CTA */}
              <Link
                to="/register"
                className={cn(
                  "w-full py-3 px-6 rounded-full text-sm font-medium transition-all duration-200 text-center",
                  plan.popular
                    ? "bg-white text-[#8b5cf6] hover:bg-gray-100"
                    : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] border border-[#404040]"
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
