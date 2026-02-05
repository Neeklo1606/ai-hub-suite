import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music } from "lucide-react";

const categories = [
  {
    icon: MessageSquare,
    title: "Текст",
    models: ["GPT-4", "Claude 3", "Gemini Pro"],
    description: "Генерация текста, переводы, суммаризация",
  },
  {
    icon: Image,
    title: "Изображения",
    models: ["Midjourney", "DALL-E 3", "Stable Diffusion"],
    description: "Создание и редактирование изображений",
  },
  {
    icon: Video,
    title: "Видео",
    models: ["Sora", "Runway Gen-3", "Pika Labs"],
    description: "Генерация и монтаж видео",
  },
  {
    icon: Music,
    title: "Аудио",
    models: ["ElevenLabs", "Suno AI", "Whisper"],
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
              className="group p-8 rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                <category.icon className="w-7 h-7 text-indigo-400" />
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-3">{category.title}</h3>
              <p className="text-sm text-gray-500 mb-6">{category.description}</p>
              
              <ul className="space-y-2">
                {category.models.map((model, modelIndex) => (
                  <li key={modelIndex} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {model}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
