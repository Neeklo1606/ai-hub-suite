import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container px-4 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Попробуйте бесплатно
          </h2>
          
          <p className="text-muted-foreground mb-8">
            100₽ на баланс при регистрации
          </p>

          <Link 
            to="/register"
            className="inline-flex px-8 py-3 bg-primary hover:bg-accent rounded-full text-primary-foreground font-medium transition-colors"
          >
            Начать
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
