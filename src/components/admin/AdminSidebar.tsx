import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Settings,
  Globe,
  Zap,
  Key,
  Users,
  Shield,
  FileText,
  BarChart3,
  Database,
  Bell,
  Activity,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Loader2,
  User,
  ChevronsUpDown,
  Sparkles,
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

interface AdminSidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  badge?: string;
}

const adminSidebarItems: AdminSidebarItem[] = [
  { icon: BarChart3, label: "Аналитика", href: "/admin/analytics" },
  { icon: Users, label: "Пользователи", href: "/admin/users" },
  { icon: Globe, label: "Настройки сайта", href: "/admin/site" },
  { icon: Zap, label: "Возможности", href: "/admin/features" },
  { icon: Key, label: "API ключи", href: "/admin/api-keys" },
  { icon: Database, label: "База данных", href: "/admin/database" },
  { icon: Shield, label: "Безопасность", href: "/admin/security" },
  { icon: Bell, label: "Уведомления", href: "/admin/notifications" },
  { icon: FileText, label: "Логи", href: "/admin/logs" },
  { icon: Activity, label: "Мониторинг", href: "/admin/monitoring" },
  { icon: Settings, label: "Общие настройки", href: "/admin" },
];

interface CollapsibleItemProps {
  item: AdminSidebarItem;
  isActive: boolean;
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}

function CollapsibleItem({ item, isActive, pathname, collapsed, onNavigate }: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(isActive);
  const hasChildren = item.children && item.children.length > 0;

  const buttonClasses = cn(
    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
    collapsed ? "justify-center px-2" : "",
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
  );

  const content = (
    <>
      <item.icon className="w-5 h-5 shrink-0" />
      {!collapsed && (
        <>
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
      )}
    </>
  );

  const itemContent = (
    <>
      {hasChildren ? (
        <button onClick={() => !collapsed && setIsOpen(!isOpen)} className={buttonClasses}>
          {content}
        </button>
      ) : (
        <Link to={item.href} className={buttonClasses} onClick={onNavigate}>
          {content}
        </Link>
      )}

      {!collapsed && (
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
      )}
    </>
  );

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {itemContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            <div className="flex flex-col gap-1">
              <p>{item.label}</p>
              {item.badge && (
                <span className="text-xs text-primary">{item.badge}</span>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <div>{itemContent}</div>;
}

interface AdminSidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AdminSidebar({ onNavigate, collapsed: externalCollapsed, onToggleCollapse }: AdminSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
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
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newCollapsed));
    onToggleCollapse?.();
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Ошибка выхода:", error);
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  const getUserInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Link
          to="/admin"
          className={cn(
            "flex items-center gap-2 transition-opacity",
            collapsed ? "justify-center w-full" : ""
          )}
          onClick={onNavigate}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-sidebar-foreground">Admin Panel</span>
          )}
        </Link>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleToggleCollapse}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1">
        {adminSidebarItems.map((item, index) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + '/') ||
            item.children?.some((child) => pathname === child.href || pathname.startsWith(child.href + '/'));

          return (
            <CollapsibleItem
              key={index}
              item={item}
              isActive={!!isActive}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={onNavigate}
            />
          );
        })}
      </nav>

      {/* User Menu - Fixed at bottom */}
      <div className="p-3 border-t border-sidebar-border shrink-0">
        {collapsed ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 text-white animate-spin" />
                        ) : user && user.name ? (
                          <span className="text-xs font-semibold text-white">
                            {getUserInitials(user.name)}
                          </span>
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56">
                    <DropdownMenuLabel>
                      {isLoading ? "Загрузка..." : user?.name || "Администратор"}
                    </DropdownMenuLabel>
                    {user && (
                      <>
                        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                          {user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Вернуться в Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{user?.email || "Администратор"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    ) : user && user.name ? (
                      <span className="text-xs font-semibold text-white">
                        {getUserInitials(user.name)}
                      </span>
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      {isLoading ? "Загрузка..." : user?.email || "admin@example.com"}
                    </div>
                    <div className="text-xs text-sidebar-foreground/60 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary shrink-0" />
                      Root Admin
                    </div>
                  </div>
                  <ChevronsUpDown className="w-4 h-4 text-sidebar-foreground/60 shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {isLoading ? "Загрузка..." : user?.name || "Администратор"}
                </DropdownMenuLabel>
                {user && (
                  <>
                    <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Вернуться в Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-2 h-8"
              onClick={handleToggleCollapse}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </aside>
  );
}
