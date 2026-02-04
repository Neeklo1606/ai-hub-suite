import { motion } from "framer-motion";
import { Globe, Zap, Wallet, Shield, Building2, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Без VPN",
    description: "Все модели работают напрямую из России. Никаких обходов и замедлений.",
  },
  {
    icon: Zap,
    title: "Высокая скорость",
    description: "Параллельная обработка запросов. Ответ за секунды, не минуты.",
  },
  {
    icon: Wallet,
    title: "Прозрачная оплата",
    description: "Pay-as-you-go модель. Без абонентки, только за использование.",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Не храним запросы, шифрование end-to-end. Соответствие 152-ФЗ.",
  },
  {
    icon: Building2,
    title: "B2B-решения",
    description: "ЭДО, API, корпоративные тарифы с выделенным менеджером.",
  },
  {
    icon: BarChart3,
    title: "Детальная аналитика",
    description: "Расходы по моделям, пользователям. Экспорт отчётов в Excel.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Созданы для российских пользователей и бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
