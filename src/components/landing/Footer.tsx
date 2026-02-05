import { Zap, Send, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  product: [
    { label: "Тарифы", href: "#pricing" },
    { label: "API", href: "/docs" },
  ],
  resources: [
    { label: "Документация", href: "/docs" },
    { label: "Блог", href: "#" },
  ],
  company: [
    { label: "О нас", href: "#" },
    { label: "Контакты", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-[#0a0e27]">
      <div className="container px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Hub</span>
            </Link>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Единая платформа для работы со всеми AI-моделями. Без VPN, с прозрачной оплатой.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-300"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-gray-500 hover:text-white transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-base mb-6">Продукт</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') || link.href.startsWith('mailto') ? (
                    <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-base mb-6">Ресурсы</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') || link.href.startsWith('mailto') ? (
                    <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-base mb-6">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 AI Hub. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">Политика</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-300">Соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
