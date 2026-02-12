import { motion } from "framer-motion";
import { Globe, Zap, Wallet, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { icon: Globe, title: "Без VPN", color: "text-blue-500" },
  { icon: Zap, title: "Быстро", color: "text-yellow-500" },
  { icon: Wallet, title: "Pay-as-you-go", color: "text-green-500" },
  { icon: Shield, title: "Безопасно", color: "text-purple-500" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container px-4 max-w-4xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-foreground mb-12 text-center"
        >
          Преимущества
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary transition-colors flex flex-col items-center gap-4"
            >
              <feature.icon className={cn("w-8 h-8", feature.color)} />
              <span className="text-sm font-medium text-foreground">{feature.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
