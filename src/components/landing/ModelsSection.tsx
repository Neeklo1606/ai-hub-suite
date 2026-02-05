import { motion } from "framer-motion";
import { MessageSquare, Image, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { icon: MessageSquare, title: "Текст", gradient: "from-blue-500 to-cyan-500", count: "15+" },
  { icon: Image, title: "Изображения", gradient: "from-purple-500 to-pink-500", count: "12+" },
  { icon: Video, title: "Видео", gradient: "from-orange-500 to-red-500", count: "8+" },
  { icon: Music, title: "Аудио", gradient: "from-green-500 to-emerald-500", count: "9+" },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 max-w-5xl mx-auto">
        
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-semibold text-white mb-8 text-center"
        >
          Категории моделей
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#2a2a2a] hover:border-[#404040] rounded-2xl cursor-pointer transition-all duration-200 flex flex-col items-center gap-4"
            >
              {/* Icon */}
              <div className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br",
                category.gradient
              )}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Title */}
              <span className="text-base font-medium text-white">{category.title}</span>
              
              {/* Count badge */}
              <span className="text-xs text-gray-500">{category.count} моделей</span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
