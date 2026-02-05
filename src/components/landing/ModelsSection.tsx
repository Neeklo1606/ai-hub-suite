import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  {
    icon: MessageSquare,
    title: "Текст",
    slug: "text",
    models: ["GPT-4 Turbo", "Claude Opus", "Gemini Ultra", "GigaChat"],
    total: 15,
    description: "Генерация текста, переводы, суммаризация",
    gradient: "from-blue-500 via-cyan-500 to-blue-600",
    glowColor: "shadow-blue-500/30",
    hoverGlow: "group-hover:shadow-blue-500/40",
    hoverBorder: "group-hover:border-blue-500/50",
    linkColor: "text-blue-400",
    linkHover: "group-hover:text-blue-300",
  },
  {
    icon: Image,
    title: "Изображения",
    slug: "images",
    models: ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Kandinsky 3"],
    total: 12,
    description: "Создание и редактирование изображений",
    gradient: "from-purple-500 via-pink-500 to-purple-600",
    glowColor: "shadow-purple-500/30",
    hoverGlow: "group-hover:shadow-purple-500/40",
    hoverBorder: "group-hover:border-purple-500/50",
    linkColor: "text-purple-400",
    linkHover: "group-hover:text-purple-300",
  },
  {
    icon: Video,
    title: "Видео",
    slug: "video",
    models: ["Sora", "Runway Gen-3", "Pika Labs", "Kling AI"],
    total: 8,
    description: "Генерация и монтаж видео",
    gradient: "from-orange-500 via-red-500 to-orange-600",
    glowColor: "shadow-orange-500/30",
    hoverGlow: "group-hover:shadow-orange-500/40",
    hoverBorder: "group-hover:border-orange-500/50",
    linkColor: "text-orange-400",
    linkHover: "group-hover:text-orange-300",
  },
  {
    icon: Music,
    title: "Аудио",
    slug: "audio",
    models: ["ElevenLabs", "Suno AI", "Whisper", "XTTS v2"],
    total: 9,
    description: "Озвучка, музыка, транскрибация",
    gradient: "from-green-500 via-emerald-500 to-green-600",
    glowColor: "shadow-green-500/30",
    hoverGlow: "group-hover:shadow-emerald-500/40",
    hoverBorder: "group-hover:border-emerald-500/50",
    linkColor: "text-emerald-400",
    linkHover: "group-hover:text-emerald-300",
  },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-24 relative bg-slate-900/50" aria-labelledby="models-heading">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 id="models-heading" className="text-4xl font-bold text-white mb-6">
            Все типы AI-моделей
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Выбирайте из 100+ нейросетей для любых задач
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              role="listitem"
            >
              <Link
                to={`/models/${category.slug}`}
                className={cn(
                  "group block p-8 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/40 cursor-pointer",
                  "transition-all duration-300 will-change-transform",
                  "hover:scale-105 hover:bg-slate-900/60 hover:shadow-xl",
                  category.hoverBorder,
                  category.hoverGlow
                )}
                aria-label={`${category.title} — ${category.total} моделей`}
              >
                {/* Icon with unique gradient */}
                <div 
                  className={cn(
                    "w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 shadow-lg transition-shadow duration-300",
                    category.gradient,
                    category.glowColor
                  )}
                >
                  <category.icon className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                  {category.title}
                </h3>
                
                {/* Model list with arrows */}
                <ul className="space-y-2.5 mb-6" aria-label={`Модели для ${category.title}`}>
                  {category.models.map((model, modelIndex) => (
                    <li 
                      key={modelIndex} 
                      className="text-sm text-gray-400 leading-relaxed flex items-center gap-2"
                    >
                      <span className="text-gray-600">→</span>
                      <span>{model}</span>
                    </li>
                  ))}
                </ul>
                
                {/* View all link */}
                <div 
                  className={cn(
                    "inline-flex items-center gap-2 text-sm font-medium transition-all duration-300",
                    category.linkColor,
                    category.linkHover
                  )}
                >
                  <span>→ Смотреть все ({category.total} моделей)</span>
                  <ArrowRight 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    aria-hidden="true" 
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
