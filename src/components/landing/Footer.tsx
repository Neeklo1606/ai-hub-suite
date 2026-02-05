import { Zap, Send, Github } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Модели", href: "/#models" },
    { label: "Цены", href: "/pricing" },
    { label: "API", href: "/docs" },
  ],
  resources: [
    { label: "Docs", href: "/docs" },
    { label: "Блог", href: "#" },
    { label: "Статус", href: "#" },
  ],
  company: [
    { label: "О нас", href: "#" },
    { label: "Карьера", href: "#" },
    { label: "Партнёры", href: "#" },
  ],
  contacts: [
    { label: "support@aihub.ru", href: "mailto:support@aihub.ru" },
    { label: "Telegram", href: "#" },
    { label: "Поддержка", href: "#" },
  ],
};

const socialLinks = [
  { icon: Send, href: "#", label: "Telegram" },
  { icon: () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ), href: "#", label: "X" },
  { icon: Github, href: "#", label: "GitHub" },
];

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isExternal = href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http');
  
  if (isExternal) {
    return (
      <a href={href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
        {children}
      </a>
    );
  }
  
  return (
    <Link to={href} className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
      {children}
    </Link>
  );
};

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Hub</span>
            </Link>
            <p className="text-sm text-gray-400">
              Все AI-модели в одном окне
            </p>
          </div>
          
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries({
            Продукт: footerLinks.product,
            Ресурсы: footerLinks.resources,
            Компания: footerLinks.company,
            Контакты: footerLinks.contacts,
          }).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 AI Hub
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-400 transition-colors duration-300">
              Конфиденциальность
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-400 transition-colors duration-300">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
