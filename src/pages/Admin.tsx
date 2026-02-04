import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Users,
  Activity,
  TrendingUp,
  DollarSign,
  Settings,
  Database,
  Shield,
  Bell,
  FileText,
  BarChart3,
  UserPlus,
  AlertTriangle,
} from "lucide-react";

const stats = [
  { label: "Всего пользователей", value: "12,847", change: "+12%", icon: Users, color: "text-primary" },
  { label: "Активных сегодня", value: "2,341", change: "+8%", icon: Activity, color: "text-secondary" },
  { label: "Запросов сегодня", value: "89,432", change: "+23%", icon: TrendingUp, color: "text-accent" },
  { label: "Доход сегодня", value: "₽156,780", change: "+18%", icon: DollarSign, color: "text-primary" },
];

const recentUsers = [
  { name: "Алексей Иванов", email: "alexey@example.com", plan: "Pro", status: "active" },
  { name: "Мария Петрова", email: "maria@example.com", plan: "Free", status: "active" },
  { name: "Дмитрий Сидоров", email: "dmitry@example.com", plan: "Team", status: "pending" },
  { name: "Елена Козлова", email: "elena@example.com", plan: "Pro", status: "active" },
  { name: "Сергей Волков", email: "sergey@example.com", plan: "Enterprise", status: "active" },
];

const systemAlerts = [
  { type: "warning", message: "Высокая нагрузка на сервер GPT-4", time: "5 мин назад" },
  { type: "info", message: "Обновление модели Midjourney v6.1", time: "1 час назад" },
  { type: "success", message: "Backup базы данных завершен", time: "3 часа назад" },
];

const adminNavItems = [
  { icon: BarChart3, label: "Аналитика", active: true },
  { icon: Users, label: "Пользователи" },
  { icon: Database, label: "База данных" },
  { icon: Shield, label: "Безопасность" },
  { icon: Bell, label: "Уведомления" },
  { icon: FileText, label: "Логи" },
  { icon: Settings, label: "Настройки" },
];

export default function Admin() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Панель администратора
            </h1>
            <p className="text-muted-foreground mt-1">
              Управление платформой и мониторинг
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4" />
              Экспорт отчёта
            </Button>
            <Button variant="hero">
              <UserPlus className="w-4 h-4" />
              Добавить пользователя
            </Button>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {adminNavItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "outline"}
              size="sm"
              className="shrink-0"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-primary">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Последние пользователи</h2>
              <Button variant="ghost" size="sm">Все пользователи</Button>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Пользователь</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Тариф</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Статус</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, index) => (
                    <tr key={index} className="border-t border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.plan === 'Enterprise' ? 'bg-primary/20 text-primary' :
                          user.plan === 'Team' ? 'bg-secondary/20 text-secondary' :
                          user.plan === 'Pro' ? 'bg-accent/20 text-accent' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`flex items-center gap-1 text-sm ${
                          user.status === 'active' ? 'text-primary' : 'text-accent'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            user.status === 'active' ? 'bg-primary' : 'bg-accent'
                          }`} />
                          {user.status === 'active' ? 'Активен' : 'Ожидание'}
                        </span>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">Редактировать</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-accent" />
                Системные алерты
              </h2>
            </div>

            <div className="space-y-3">
              {systemAlerts.map((alert, index) => {
                const alertStyles = alert.type === 'warning' 
                  ? 'border-accent/30 bg-accent/5' 
                  : alert.type === 'success' 
                    ? 'border-primary/30 bg-primary/5' 
                    : 'border-secondary/30 bg-secondary/5';
                return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${alertStyles}`}
                >
                  <div className="text-sm font-medium mb-1">{alert.message}</div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
              )})}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
              <h3 className="font-medium mb-4">Быстрая статистика</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium text-primary">99.98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Response</span>
                  <span className="text-sm font-medium">234ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Errors (24h)</span>
                  <span className="text-sm font-medium text-accent">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">API calls (24h)</span>
                  <span className="text-sm font-medium">1.2M</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
