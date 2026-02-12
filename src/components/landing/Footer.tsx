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
    <footer className="py-12 bg-background border-t border-border">
      <div className="container px-4 max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Link to="/" className="text-lg font-semibold text-foreground">
            Aura
          </Link>
          
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link 
                key={link.href}
                to={link.href} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Aura. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
