import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Регистрация за 30 секунд",
  "Доступ ко всем моделям",
  "Поддержка 24/7",
];

export function CTASection() {
  return (
    <section className="py-24 relative bg-card/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,hsla(217,91%,60%,0.1),transparent)]" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm text-primary font-medium">🎁 Бонус при регистрации</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Попробуйте сейчас бесплатно
          </h2>
          
          <p className="text-xl text-muted-foreground mb-6">
            Получите <span className="text-primary font-semibold">100₽</span> на баланс при регистрации.
            <br />
            Без привязки карты.
          </p>

          <Button variant="hero" size="xl" className="mb-8">
            Начать работу
            <ArrowRight className="w-5 h-5" />
          </Button>

          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary" />
                {benefit}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
