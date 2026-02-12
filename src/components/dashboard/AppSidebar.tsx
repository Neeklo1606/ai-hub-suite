import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Folder,
  FileSearch,
  GitCompare,
  Settings,
  ChevronLeft,
  User,
  ChevronsUpDown,
  LogOut,
  Loader2,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: MessageSquare, label: "Новый чат", href: "/dashboard/text/gpt4" },
  { icon: Folder, label: "Мои файлы", href: "/dashboard/files" },
  { icon: FileSearch, label: "Анализ договора", href: "/dashboard/analysis" },
  { icon: GitCompare, label: "Сравнение версий", href: "/dashboard/compare" },
  { icon: Settings, label: "Настройки", href: "/dashboard/settings" },
];

interface AppSidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AppSidebar({ onNavigate, collapsed: externalCollapsed, onToggleCollapse }: AppSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authService.getUser();
        if (userData) {
          setUser({
            name: userData.user_metadata?.name || userData.email?.split('@')[0] || 'User',
            email: userData.email || '',
          });
        }
      } catch (error) {
        console.error("Ошибка загрузки данных пользователя:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleToggleCollapse = () => {
    const newCollapsed = !collapsed;
    if (externalCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
    onToggleCollapse?.();
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast({ title: "Выход выполнен", description: "Вы успешно вышли из системы" });
      navigate("/login");
    } catch (error: any) {
      console.error("Ошибка выхода:", error);
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[224px]"
      )}
    >
      {/* Logo */}
      <div className="p-3 border-b border-sidebar-border flex items-center justify-between">
        <Link
          to="/"
          className={cn("flex items-center gap-2", collapsed ? "justify-center w-full" : "")}
          onClick={onNavigate}
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <FileSearch className="w-4 h-4 text-foreground" />
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold text-sidebar-foreground">LegalAI</span>
          )}
        </Link>
        {!collapsed && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleToggleCollapse}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-0.5">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          const linkContent = (
            <Link
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                collapsed ? "justify-center px-2" : "",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <TooltipProvider key={item.href}>
                <Tooltip>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right"><p>{item.label}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          }

          return <div key={item.href}>{linkContent}</div>;
        })}
      </nav>

      {/* Balance */}
      {!collapsed && (
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="bg-card border border-primary/20 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Баланс</span>
              <span className="text-lg font-semibold text-foreground">1 255₽</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Pro Plan</span>
              <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                Пополнить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Menu */}
      <div className="p-2 border-t border-sidebar-border shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors",
              collapsed ? "justify-center" : ""
            )}>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                ) : user?.name ? (
                  <span className="text-xs font-medium text-foreground">{getUserInitials(user.name)}</span>
                ) : (
                  <User className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm text-sidebar-foreground truncate">
                      {isLoading ? "..." : user?.email || "user@example.com"}
                    </div>
                  </div>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{isLoading ? "Загрузка..." : user?.name || "Аккаунт"}</DropdownMenuLabel>
            {user && (
              <>
                <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>Профиль</DropdownMenuItem>
            <DropdownMenuItem>Настройки</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {!collapsed && (
          <Button variant="ghost" size="icon" className="w-full mt-1 h-7" onClick={handleToggleCollapse}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>
    </aside>
  );
}
