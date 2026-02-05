import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Попробуйте сейчас бесплатно
          </h2>
          
          <p className="text-base text-gray-400 mb-8 max-w-xl mx-auto">
            Получите <span className="text-indigo-400 font-semibold">100₽</span> на баланс при регистрации.
            {" "}Без привязки карты.
          </p>

          <Link to="/register">
            <Button size="lg">
              Начать работу
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
