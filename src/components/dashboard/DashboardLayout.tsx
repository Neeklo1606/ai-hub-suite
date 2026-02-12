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
        <SheetContent side="left" className="p-0 w-[240px]">
          <AppSidebar onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Fixed expand button when sidebar is collapsed (desktop) */}
      {sidebarCollapsed && (
        <button
          onClick={() => {
            setSidebarCollapsed(false);
            localStorage.setItem('sidebar-collapsed', 'false');
          }}
          className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 w-8 h-12 items-center justify-center bg-card border-r border-t border-b border-border rounded-r-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          "lg:ml-0"
        )}
        style={{
          marginLeft: sidebarCollapsed ? '70px' : '240px',
        }}
      >
        {/* Header with balance pill */}
        <header className="sticky top-0 z-30 flex items-center justify-end px-4 py-3 bg-background/80 backdrop-blur-sm border-b border-border">
        </header>

        {children}
      </main>
    </div>
  );
}
