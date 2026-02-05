import { motion } from "framer-motion";
import { Globe, Zap, Wallet, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { icon: Globe, title: "Без VPN", gradient: "from-blue-500 to-cyan-500" },
  { icon: Zap, title: "Быстро", gradient: "from-yellow-500 to-orange-500" },
  { icon: Wallet, title: "Pay-as-you-go", gradient: "from-green-500 to-emerald-500" },
  { icon: Shield, title: "Безопасно", gradient: "from-purple-500 to-pink-500" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 max-w-4xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-white mb-8 text-center"
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
              className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#404040] transition-colors flex flex-col items-center gap-4"
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br",
                feature.gradient
              )}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{feature.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
