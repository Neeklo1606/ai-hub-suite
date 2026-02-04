import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Image,
  Video,
  Music,
  Code,
  BarChart3,
  Wallet,
  Settings,
  ChevronDown,
  ChevronRight,
  Zap,
  User,
  ChevronsUpDown,
  Sparkles,
  Shield,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Главная", href: "/dashboard" },
  {
    icon: MessageSquare,
    label: "Текст",
    href: "/dashboard/text",
    children: [
      { label: "ChatGPT-4", href: "/dashboard/text/gpt4" },
      { label: "Claude Opus", href: "/dashboard/text/claude" },
      { label: "Gemini Pro", href: "/dashboard/text/gemini" },
      { label: "GigaChat", href: "/dashboard/text/gigachat" },
    ],
  },
  {
    icon: Image,
    label: "Изображения",
    href: "/dashboard/images",
    children: [
      { label: "Midjourney", href: "/dashboard/images/midjourney" },
      { label: "Stable Diffusion", href: "/dashboard/images/sd" },
      { label: "DALL-E 3", href: "/dashboard/images/dalle" },
      { label: "Kandinsky", href: "/dashboard/images/kandinsky" },
    ],
  },
  {
    icon: Video,
    label: "Видео",
    href: "/dashboard/video",
    badge: "New",
    children: [
      { label: "Sora", href: "/dashboard/video/sora" },
      { label: "Runway Gen-3", href: "/dashboard/video/runway" },
      { label: "Pika Labs", href: "/dashboard/video/pika" },
      { label: "Kling AI", href: "/dashboard/video/kling" },
    ],
  },
  {
    icon: Music,
    label: "Аудио",
    href: "/dashboard/audio",
    children: [
      { label: "ElevenLabs", href: "/dashboard/audio/elevenlabs" },
      { label: "Suno AI", href: "/dashboard/audio/suno" },
      { label: "Voice Clone", href: "/dashboard/audio/voice" },
      { label: "Whisper", href: "/dashboard/audio/whisper" },
    ],
  },
  {
    icon: Code,
    label: "Код",
    href: "/dashboard/code",
    children: [
      { label: "GitHub Copilot", href: "/dashboard/code/copilot" },
      { label: "Cursor AI", href: "/dashboard/code/cursor" },
      { label: "CodeLlama", href: "/dashboard/code/codellama" },
    ],
  },
  { icon: BarChart3, label: "Аналитика", href: "/dashboard/analytics" },
  { icon: Settings, label: "Настройки", href: "/dashboard/settings" },
  { icon: Shield, label: "Админ", href: "/admin", badge: "Admin" },
  { icon: FileText, label: "Документация", href: "/docs" },
];

interface CollapsibleItemProps {
  item: SidebarItem;
  isActive: boolean;
  pathname: string;
  onNavigate?: () => void;
}

function CollapsibleItem({ item, isActive, pathname, onNavigate }: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(isActive);
  const hasChildren = item.children && item.children.length > 0;

  const buttonClasses = cn(
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
  );

  const content = (
    <>
      <item.icon className="w-5 h-5 shrink-0" />
      <span className="flex-1 text-left truncate">{item.label}</span>
      {item.badge && (
        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/20 text-primary">
          {item.badge}
        </span>
      )}
      {hasChildren && (
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform shrink-0",
            isOpen && "rotate-180"
          )}
        />
      )}
    </>
  );

  return (
    <div>
      {hasChildren ? (
        <button onClick={() => setIsOpen(!isOpen)} className={buttonClasses}>
          {content}
        </button>
      ) : (
        <Link to={item.href} className={buttonClasses} onClick={onNavigate}>
          {content}
        </Link>
      )}

      <AnimatePresence initial={false}>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-5 pl-3 border-l border-sidebar-border space-y-1 py-1">
              {item.children!.map((child, index) => (
                <Link
                  key={index}
                  to={child.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                    pathname === child.href
                      ? "bg-primary/10 text-primary"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  <span className="truncate">{child.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AppSidebarProps {
  onNavigate?: () => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="w-[280px] h-screen flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">AI Hub</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {sidebarItems.map((item, index) => {
          const isActive =
            pathname === item.href ||
            item.children?.some((child) => pathname === child.href);

          return (
            <CollapsibleItem
              key={index}
              item={item}
              isActive={!!isActive}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          );
        })}
      </nav>

      {/* Balance */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-sidebar-foreground">Баланс</span>
          </div>
          <div className="text-2xl font-bold text-sidebar-foreground">2,450 ₽</div>
          <Button variant="hero" size="sm" className="w-full mt-3">
            Пополнить
          </Button>
        </div>
      </div>

      {/* User Menu */}
      <div className="p-3 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium text-sidebar-foreground truncate">user@example.com</div>
                <div className="text-xs text-sidebar-foreground/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary shrink-0" />
                  Pro Plan
                </div>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-sidebar-foreground/60 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Тарифы</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Выйти</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
