import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const navLinks = [
  { label: "Возможности", href: "/possibilities" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Блог", href: "/blog" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const isActiveLink = useCallback((href: string) => {
    return location.pathname === href;
  }, [location.pathname]);

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
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#8b5cf6] focus:text-white focus:rounded-lg"
      >
        Перейти к содержимому
      </a>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled 
            ? "bg-black/95 backdrop-blur-sm border-b border-[#2a2a2a]" 
            : "bg-[#0f0f0f] border-b border-[#2a2a2a]"
        }`}
        role="banner"
      >
        <div className="container px-4 max-w-7xl mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Logo */}
            <Link to="/" className="text-xl font-semibold text-white" aria-label="AI Hub - Главная">
              AI Hub
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Навигация">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm transition-colors ${
                    isActiveLink(link.href)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-current={isActiveLink(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Войти
              </Link>
              <Link 
                to="/register"
                className="px-6 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full text-sm text-white transition-colors"
              >
                Начать
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#0f0f0f] border-b border-[#2a2a2a] overflow-hidden"
            >
              <nav className="container px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-4 py-3 text-sm rounded-lg transition-colors ${
                      isActiveLink(link.href)
                        ? "text-white bg-[#1a1a1a]"
                        : "text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 mt-3 border-t border-[#2a2a2a]">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm text-gray-400 hover:text-white text-center transition-colors"
                  >
                    Войти
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-6 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] rounded-full text-sm text-white text-center transition-colors"
                  >
                    Начать
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
