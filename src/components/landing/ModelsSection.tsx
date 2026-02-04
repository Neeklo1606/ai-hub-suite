import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music } from "lucide-react";

const categories = [
  {
    icon: MessageSquare,
    title: "Текст",
    color: "text-neon-blue",
    bgColor: "bg-neon-blue/10",
    models: ["GPT-4 Turbo", "Claude Opus", "Gemini Ultra", "GigaChat", "Llama 3", "Mistral"],
    extra: "+15 моделей",
  },
  {
    icon: Image,
    title: "Изображения",
    color: "text-neon-purple",
    bgColor: "bg-neon-purple/10",
    models: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Kandinsky", "Leonardo AI", "Flux Pro"],
    extra: "+12 моделей",
  },
  {
    icon: Video,
    title: "Видео",
    color: "text-neon-cyan",
    bgColor: "bg-neon-cyan/10",
    models: ["Sora", "Runway Gen-3", "Pika Labs", "Kling AI", "HaiperAI", "Luma Dream"],
    extra: "+8 моделей",
  },
  {
    icon: Music,
    title: "Аудио",
    color: "text-neon-pink",
    bgColor: "bg-neon-pink/10",
    models: ["ElevenLabs", "Suno AI", "Voice Clone", "Whisper", "MusicGen", "XTTS"],
    extra: "+6 моделей",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ModelsSection() {
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
            Все типы AI-моделей
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Выбирайте из 100+ нейросетей для любых задач — от генерации текста до создания видео
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-4`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                
                <ul className="space-y-2 mb-4">
                  {category.models.slice(0, 4).map((model, modelIndex) => (
                    <li key={modelIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${category.bgColor}`} />
                      {model}
                    </li>
                  ))}
                </ul>
                
                <span className={`text-sm font-medium ${category.color}`}>
                  {category.extra}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
