import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Попробуйте бесплатно
          </h2>
          
          <p className="text-sm text-gray-400 mb-8">
            100₽ на баланс при регистрации
          </p>

          <Link 
            to="/register"
            className="inline-flex px-8 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full text-sm text-white transition-colors"
          >
            Начать
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
