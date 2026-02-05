import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music, ArrowRight } from "lucide-react";

const categories = [
  {
    icon: MessageSquare,
    title: "Текст",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20 hover:border-blue-500/40",
    iconColor: "text-blue-400",
    models: ["GPT-4", "Claude 3", "Gemini Pro", "GigaChat"],
    extra: "+12 моделей",
    description: "Генерация текста, переводы, суммаризация",
  },
  {
    icon: Image,
    title: "Изображения",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20 hover:border-purple-500/40",
    iconColor: "text-purple-400",
    models: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Kandinsky"],
    extra: "+8 моделей",
    description: "Создание и редактирование изображений",
  },
  {
    icon: Video,
    title: "Видео",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "bg-gradient-to-br from-orange-500/10 to-red-500/10",
    borderColor: "border-orange-500/20 hover:border-orange-500/40",
    iconColor: "text-orange-400",
    models: ["Sora", "Runway Gen-3", "Pika Labs", "Kling AI"],
    extra: "+5 моделей",
    description: "Генерация и монтаж видео",
  },
  {
    icon: Music,
    title: "Аудио",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20 hover:border-green-500/40",
    iconColor: "text-green-400",
    models: ["ElevenLabs", "Suno AI", "Whisper", "XTTS"],
    extra: "+4 моделей",
    description: "Озвучка, музыка, транскрибация",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ModelsSection() {
  return (
    <section id="models" className="py-12 sm:py-16 md:py-20 lg:py-28 relative">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            Все типы AI-моделей
          </h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 sm:px-0">
            Выбирайте из 100+ нейросетей для любых задач
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`group relative rounded-xl sm:rounded-2xl ${category.bgGradient} border ${category.borderColor} p-5 sm:p-6 md:p-8 transition-all duration-300 backdrop-blur-sm cursor-pointer`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${category.gradient} bg-opacity-20 flex items-center justify-center mb-4 sm:mb-5`}>
                <category.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${category.iconColor}`} />
              </div>
              
              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1.5 sm:mb-2">{category.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">{category.description}</p>
              
              {/* Models List */}
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                {category.models.map((model, modelIndex) => (
                  <li key={modelIndex} className="text-xs sm:text-sm text-slate-300 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.gradient}`} />
                    {model}
                  </li>
                ))}
              </ul>
              
              {/* Extra Link */}
              <a 
                href="#" 
                className={`inline-flex items-center gap-1 text-xs sm:text-sm font-medium ${category.iconColor} hover:underline group-hover:gap-2 transition-all`}
              >
                {category.extra}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
