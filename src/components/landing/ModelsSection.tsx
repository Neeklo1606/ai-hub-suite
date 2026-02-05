import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { icon: MessageSquare, title: "Текст", color: "text-blue-500", count: "15+" },
  { icon: Image, title: "Изображения", color: "text-purple-500", count: "12+" },
  { icon: Video, title: "Видео", color: "text-orange-500", count: "8+" },
  { icon: Music, title: "Аудио", color: "text-green-500", count: "9+" },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-24 bg-white">
      <div className="container px-4 max-w-4xl mx-auto">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-[#1A1A1A] mb-4 text-center"
        >
          Категории моделей
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#666666] mb-12 text-center"
        >
          Более 100 AI-моделей для любых задач
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 bg-[#FAFAFA] hover:bg-white border border-[#E5E5E5] hover:border-[#8B5CF6] rounded-2xl cursor-pointer transition-all duration-200 flex flex-col items-center gap-3"
            >
              <category.icon className={cn("w-8 h-8", category.color)} />
              <span className="text-sm font-medium text-[#1A1A1A]">{category.title}</span>
              <span className="text-xs text-[#999999]">{category.count} моделей</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
