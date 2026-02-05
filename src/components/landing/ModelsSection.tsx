import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music, ArrowRight } from "lucide-react";

const categories = [
  {
    icon: MessageSquare,
    title: "Текст",
    models: ["GPT-4 Turbo", "Claude Opus", "Gemini Ultra", "GigaChat"],
    total: 15,
    description: "Генерация текста, переводы, суммаризация",
  },
  {
    icon: Image,
    title: "Изображения",
    models: ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL", "Kandinsky 3"],
    total: 12,
    description: "Создание и редактирование изображений",
  },
  {
    icon: Video,
    title: "Видео",
    models: ["Sora", "Runway Gen-3", "Pika Labs", "Kling AI"],
    total: 8,
    description: "Генерация и монтаж видео",
  },
  {
    icon: Music,
    title: "Аудио",
    models: ["ElevenLabs", "Suno AI", "Whisper", "XTTS v2"],
    total: 9,
    description: "Озвучка, музыка, транскрибация",
  },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-24 relative bg-slate-900/50">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Все типы AI-моделей
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Выбирайте из 100+ нейросетей для любых задач
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-2xl bg-slate-800/40 border border-slate-700/40 hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                <category.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
              
              <ul className="space-y-2 mb-4">
                {category.models.map((model, modelIndex) => (
                  <li key={modelIndex} className="text-sm text-gray-400 leading-relaxed">
                    {model}
                  </li>
                ))}
              </ul>
              
              <a 
                href="#" 
                className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300 mt-4"
              >
                <ArrowRight className="w-4 h-4" />
                Смотреть все ({category.total})
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
