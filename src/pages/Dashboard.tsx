import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  MessageSquare,
  Image,
  Video,
  Music,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const recentChats = [
  {
    id: 1,
    title: "Написать пост для Instagram",
    model: "GPT-4 Turbo",
    time: "5 мин назад",
    icon: MessageSquare,
  },
  {
    id: 2,
    title: "Логотип для стартапа",
    model: "Midjourney",
    time: "2 часа назад",
    icon: Image,
  },
  {
    id: 3,
    title: "Видео для TikTok",
    model: "Sora",
    time: "Вчера",
    icon: Video,
  },
  {
    id: 4,
    title: "Озвучка для рекламы",
    model: "ElevenLabs",
    time: "2 дня назад",
    icon: Music,
  },
];

const popularModels = [
  { name: "GPT-4 Turbo", category: "Текст", usage: "45%", color: "bg-neon-blue" },
  { name: "Midjourney", category: "Изображения", usage: "28%", color: "bg-neon-purple" },
  { name: "Claude Opus", category: "Текст", usage: "15%", color: "bg-neon-cyan" },
  { name: "ElevenLabs", category: "Аудио", usage: "12%", color: "bg-neon-pink" },
];

const quickActions = [
  { icon: MessageSquare, label: "Новый чат", color: "text-neon-blue", bg: "bg-neon-blue/10" },
  { icon: Image, label: "Создать изображение", color: "text-neon-purple", bg: "bg-neon-purple/10" },
  { icon: Video, label: "Сгенерировать видео", color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
  { icon: Music, label: "Озвучить текст", color: "text-neon-pink", bg: "bg-neon-pink/10" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Добро пожаловать! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Начните работу с любой AI-моделью
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск моделей..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4" />
              Новый чат
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Chats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                Недавние
              </h2>
              <Button variant="ghost" size="sm">
                Все
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <chat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{chat.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chat.model} • {chat.time}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats & Popular Models */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Stats Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium">Сегодня</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold">47</div>
                  <div className="text-sm text-muted-foreground">запросов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">312 ₽</div>
                  <div className="text-sm text-muted-foreground">потрачено</div>
                </div>
              </div>
            </div>

            {/* Popular Models */}
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-muted-foreground" />
                Ваши модели
              </h2>

              <div className="space-y-3">
                {popularModels.map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                  >
                    <div className={`w-2 h-8 rounded-full ${model.color}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.category}</div>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {model.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
