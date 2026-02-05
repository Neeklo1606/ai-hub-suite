import { Send, Github } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Тарифы", href: "/pricing" },
  { label: "API", href: "/docs" },
  { label: "Блог", href: "/blog" },
];

const socialLinks = [
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="py-12 bg-[#0a0a0a] border-t border-[#2a2a2a]">
      <div className="container px-4 max-w-5xl mx-auto">
        
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Link to="/" className="text-lg font-semibold text-white">
            AI Hub
          </Link>
          
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#404040] transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#2a2a2a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 AI Hub
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
