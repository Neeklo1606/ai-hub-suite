import { Zap } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Цены", href: "#" },
    { label: "API", href: "#" },
    { label: "Кейсы", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  resources: [
    { label: "Документация", href: "#" },
    { label: "Блог", href: "#" },
    { label: "Статус", href: "#" },
    { label: "Промпт-библиотека", href: "#" },
  ],
  company: [
    { label: "О нас", href: "#" },
    { label: "Вакансии", href: "#" },
    { label: "Контакты", href: "#" },
    { label: "Партнёрам", href: "#" },
  ],
};

const socialLinks = [
  { label: "Telegram", href: "#" },
  { label: "VK", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI Hub</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Единая платформа для работы со всеми AI-моделями. Без VPN, с прозрачной оплатой.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-medium mb-4">Продукт</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-medium mb-4">Ресурсы</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-4">Компания</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 AI Hub. ИП Иванов И.И. ИНН: 123456789012
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
