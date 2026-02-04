import { motion } from "framer-motion";
import { Globe, Zap, Wallet, Shield, Building2, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Без VPN",
    description: "Все модели работают напрямую из России. Никаких обходов и замедлений.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Zap,
    title: "Высокая скорость",
    description: "Параллельная обработка запросов. Ответ за секунды, не минуты.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Wallet,
    title: "Прозрачная оплата",
    description: "Pay-as-you-go модель. Без абонентки, только за использование.",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Не храним запросы, шифрование end-to-end. Соответствие 152-ФЗ.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Building2,
    title: "B2B-решения",
    description: "ЭДО, API, корпоративные тарифы с выделенным менеджером.",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: BarChart3,
    title: "Детальная аналитика",
    description: "Расходы по моделям, пользователям. Экспорт отчётов в Excel.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Созданы для российских пользователей и бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group p-6 md:p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
