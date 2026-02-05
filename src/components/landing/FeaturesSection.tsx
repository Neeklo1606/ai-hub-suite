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
    <section 
      id="features" 
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(222 47% 6%) 0%, hsl(217 33% 9%) 100%)"
      }}
    >
      {/* Subtle mesh gradient */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at 20% 20%, hsla(239 84% 67% / 0.1), transparent 40%), radial-gradient(circle at 80% 80%, hsla(280 84% 60% / 0.1), transparent 40%)"
        }}
        aria-hidden="true"
      />
      
      <div className="container relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 gradient-text-heading text-shadow-glow">
            Почему выбирают нас
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Созданы для российских пользователей и бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group p-8 rounded-2xl border border-slate-700/40 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10"
              style={{
                background: "linear-gradient(135deg, hsla(215 28% 17% / 0.4) 0%, hsla(257 53% 21% / 0.2) 50%, hsla(215 28% 17% / 0.4) 100%)"
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 border border-indigo-500/20 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/10">
                <feature.icon className="w-7 h-7 text-indigo-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
