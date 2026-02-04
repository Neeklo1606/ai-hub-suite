import { ReactNode, useState, useEffect } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('sidebar-collapsed');
      setSidebarCollapsed(saved ? JSON.parse(saved) : false);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => {
            const newCollapsed = !sidebarCollapsed;
            setSidebarCollapsed(newCollapsed);
            localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
          }}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-3 left-3 z-50 bg-background/80 backdrop-blur-sm border border-border"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[280px]">
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          "lg:ml-0"
        )}
        style={{
          marginLeft: sidebarCollapsed ? '70px' : '280px',
        }}
      >
        {/* Expand button when collapsed */}
        {sidebarCollapsed && (
          <div className="fixed top-4 left-[85px] z-30 lg:block hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-background/80 backdrop-blur-sm border border-border shadow-sm"
              onClick={() => {
                setSidebarCollapsed(false);
                localStorage.setItem('sidebar-collapsed', 'false');
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
