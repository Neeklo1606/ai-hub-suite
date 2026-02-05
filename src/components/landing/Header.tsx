import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { label: "Возможности", href: "/possibilities" },
  { label: "Для бизнеса", href: "/business" },
  { label: "Отзывы", href: "/reviews" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Вопросы", href: "/faq" },
  { label: "Блог", href: "/blog" },
];

// Links visible on tablet (md) - subset of full nav
const tabletLinks = ["Возможности", "Тарифы", "Блог"];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const isActiveLink = useCallback((href: string) => {
    return location.pathname === href;
  }, [location.pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-950/95 backdrop-blur-lg border-b border-slate-700/50 shadow-lg shadow-black/20" 
          : "bg-transparent"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">AI Hub</span>
          </Link>

          {/* Tablet Navigation (md-lg) */}
          <nav className="hidden md:flex lg:hidden items-center gap-1">
            {navLinks
              .filter((link) => tabletLinks.includes(link.label))
              .map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`px-3 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 ${
                    isActiveLink(link.href)
                      ? "text-indigo-400 border-b-2 border-indigo-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
              )}
          </nav>

          {/* Desktop Navigation (lg+) */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 ${
                  isActiveLink(link.href)
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Tablet CTA (md-lg) */}
          <div className="hidden md:flex lg:hidden items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Войти
              </Button>
            </Link>
          </div>

          {/* Desktop CTA (lg+) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Войти
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                Начать бесплатно
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden border-t border-slate-700/50 bg-slate-950/98 backdrop-blur-lg overflow-hidden"
          >
            <nav className="container px-4 py-4 sm:py-6 flex flex-col gap-0.5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={`block px-4 py-3 text-base transition-colors rounded-xl hover:bg-white/5 ${
                      isActiveLink(link.href)
                        ? "text-indigo-400 border-l-2 border-indigo-400 bg-indigo-500/10"
                        : "text-slate-300 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex flex-col gap-3 pt-4 mt-3 border-t border-slate-700/50">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Войти
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">
                    Начать бесплатно
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
