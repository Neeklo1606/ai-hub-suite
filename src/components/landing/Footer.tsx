import { Zap, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Тарифы", href: "#pricing" },
    { label: "API", href: "/docs" },
    { label: "Кейсы", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  resources: [
    { label: "Документация", href: "/docs" },
    { label: "Блог", href: "#" },
    { label: "Статус", href: "#" },
    { label: "Промпт-библиотека", href: "#" },
  ],
  company: [
    { label: "О нас", href: "#" },
    { label: "Вакансии", href: "#" },
    { label: "Партнёрам", href: "#" },
    { label: "Контакты", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-[#0a0e27]">
      <div className="container px-4 md:px-6 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Hub</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 max-w-xs leading-relaxed">
              Единая платформа для работы со всеми AI-моделями. Без VPN, с прозрачной оплатой.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 transition-colors"
                aria-label="VK"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white mb-4">Продукт</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') || link.href.startsWith('mailto') ? (
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-4">Ресурсы</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') || link.href.startsWith('mailto') ? (
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 AI Hub. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Пользовательское соглашение
            </a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
