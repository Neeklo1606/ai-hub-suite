import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Type,
  Square,
  Layers,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Moon,
  Sun,
  Zap,
} from "lucide-react";
import { useState } from "react";

const colorTokens = [
  { name: "--background", value: "222 47% 6%", description: "Основной фон приложения" },
  { name: "--foreground", value: "210 40% 98%", description: "Основной цвет текста" },
  { name: "--primary", value: "217 91% 60%", description: "Основной акцентный цвет (синий)" },
  { name: "--secondary", value: "250 80% 60%", description: "Вторичный акцент (фиолетовый)" },
  { name: "--muted", value: "217 33% 17%", description: "Приглушенные поверхности" },
  { name: "--muted-foreground", value: "215 20% 65%", description: "Приглушенный текст" },
  { name: "--accent", value: "280 80% 60%", description: "Дополнительный акцент" },
  { name: "--card", value: "222 47% 8%", description: "Фон карточек" },
  { name: "--border", value: "217 33% 17%", description: "Цвет границ" },
  { name: "--neon-blue", value: "217 91% 60%", description: "Неоновый синий" },
  { name: "--neon-purple", value: "280 80% 60%", description: "Неоновый фиолетовый" },
  { name: "--neon-cyan", value: "180 80% 50%", description: "Неоновый бирюзовый" },
  { name: "--neon-pink", value: "330 80% 60%", description: "Неоновый розовый" },
];

const buttonVariants = [
  { variant: "default", label: "Default", description: "Основная кнопка с glow-эффектом" },
  { variant: "hero", label: "Hero", description: "Градиентная кнопка для CTA" },
  { variant: "heroOutline", label: "Hero Outline", description: "Вторичная CTA кнопка" },
  { variant: "outline", label: "Outline", description: "Кнопка с обводкой" },
  { variant: "ghost", label: "Ghost", description: "Прозрачная кнопка" },
  { variant: "secondary", label: "Secondary", description: "Вторичная кнопка" },
  { variant: "destructive", label: "Destructive", description: "Деструктивное действие" },
  { variant: "neon", label: "Neon", description: "Неоновый стиль" },
];

const buttonSizes = [
  { size: "sm", label: "Small" },
  { size: "default", label: "Default" },
  { size: "lg", label: "Large" },
  { size: "xl", label: "Extra Large" },
];

const typographyScale = [
  { class: "text-7xl", size: "72px", weight: "font-bold", label: "Display" },
  { class: "text-5xl", size: "48px", weight: "font-bold", label: "H1" },
  { class: "text-4xl", size: "36px", weight: "font-bold", label: "H2" },
  { class: "text-3xl", size: "30px", weight: "font-semibold", label: "H3" },
  { class: "text-2xl", size: "24px", weight: "font-semibold", label: "H4" },
  { class: "text-xl", size: "20px", weight: "font-medium", label: "H5" },
  { class: "text-lg", size: "18px", weight: "font-medium", label: "Large" },
  { class: "text-base", size: "16px", weight: "font-normal", label: "Body" },
  { class: "text-sm", size: "14px", weight: "font-normal", label: "Small" },
  { class: "text-xs", size: "12px", weight: "font-normal", label: "Caption" },
];

const gradients = [
  { name: "Primary Gradient", class: "bg-gradient-to-r from-primary to-secondary", css: "linear-gradient(to right, hsl(217 91% 60%), hsl(250 80% 60%))" },
  { name: "Hero Gradient", class: "bg-gradient-to-br from-primary/20 to-secondary/20", css: "linear-gradient(to bottom right, hsl(217 91% 60% / 0.2), hsl(250 80% 60% / 0.2))" },
  { name: "Card Gradient", class: "bg-gradient-to-br from-card to-background", css: "linear-gradient(to bottom right, hsl(222 47% 8%), hsl(222 47% 6%))" },
  { name: "Glow Effect", class: "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(217,91%,60%,0.15),transparent)]", css: "radial-gradient(ellipse 80% 50% at 50% -20%, hsla(217,91%,60%,0.15), transparent)" },
];

const shadows = [
  { name: "Glow SM", class: "shadow-[0_0_20px_hsla(217,91%,60%,0.3)]", css: "0 0 20px hsla(217,91%,60%,0.3)" },
  { name: "Glow MD", class: "shadow-[0_0_40px_hsla(217,91%,60%,0.4)]", css: "0 0 40px hsla(217,91%,60%,0.4)" },
  { name: "Glow LG", class: "shadow-[0_0_60px_hsla(217,91%,60%,0.5)]", css: "0 0 60px hsla(217,91%,60%,0.5)" },
];

function ColorSwatch({ name, value, description }: { name: string; value: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`var(${name})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer"
      onClick={copyToClipboard}
    >
      <div 
        className="w-full h-16 rounded-lg mb-3 border border-border"
        style={{ backgroundColor: `hsl(${value})` }}
      />
      <div className="flex items-center justify-between mb-1">
        <code className="text-sm font-mono text-primary">{name}</code>
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  );
}

export default function Docs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI Hub</span>
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium">Документация стилей</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                  На главную
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="default" size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6 py-12 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Design System</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полная документация дизайн-системы AI Hub. Цвета, типографика, компоненты и анимации.
          </p>
        </motion.div>

        {/* Colors Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Цветовые токены</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Все цвета определены как HSL переменные в <code className="text-primary">index.css</code>. 
            Кликните на токен чтобы скопировать.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {colorTokens.map((token) => (
              <ColorSwatch key={token.name} {...token} />
            ))}
          </div>
        </section>

        {/* Gradients Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">Градиенты</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {gradients.map((gradient) => (
              <div key={gradient.name} className="p-4 rounded-xl bg-card border border-border">
                <div className={`w-full h-24 rounded-lg mb-3 ${gradient.class}`} />
                <h3 className="font-medium mb-1">{gradient.name}</h3>
                <code className="text-xs text-muted-foreground break-all">{gradient.css}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Shadows Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">Glow-эффекты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {shadows.map((shadow) => (
              <div key={shadow.name} className="p-6 rounded-xl bg-card border border-border">
                <div className={`w-20 h-20 mx-auto rounded-xl bg-primary mb-4 ${shadow.class}`} />
                <h3 className="font-medium text-center mb-1">{shadow.name}</h3>
                <code className="text-xs text-muted-foreground block text-center">{shadow.css}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
              <Type className="w-5 h-5 text-neon-cyan" />
            </div>
            <h2 className="text-2xl font-bold">Типографика</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Шрифт: <code className="text-primary">Inter</code>. Все размеры соответствуют Tailwind scale.
          </p>
          <div className="space-y-4">
            {typographyScale.map((item) => (
              <div key={item.label} className="flex items-center gap-6 p-4 rounded-xl bg-card border border-border">
                <div className="w-24 shrink-0">
                  <span className="text-sm font-medium text-primary">{item.label}</span>
                  <span className="text-xs text-muted-foreground block">{item.size}</span>
                </div>
                <span className={`${item.class} ${item.weight}`}>
                  AI Hub Platform
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-neon-pink/10 flex items-center justify-center">
              <Square className="w-5 h-5 text-neon-pink" />
            </div>
            <h2 className="text-2xl font-bold">Кнопки</h2>
          </div>
          
          <h3 className="text-lg font-semibold mb-4">Варианты</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {buttonVariants.map((item) => (
              <div key={item.variant} className="p-4 rounded-xl bg-card border border-border">
                <Button variant={item.variant as any} className="w-full mb-3">
                  {item.label}
                </Button>
                <code className="text-xs text-primary block mb-1">variant="{item.variant}"</code>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">Размеры</h3>
          <div className="flex flex-wrap items-end gap-4 p-6 rounded-xl bg-card border border-border">
            {buttonSizes.map((item) => (
              <div key={item.size} className="text-center">
                <Button variant="default" size={item.size as any}>
                  {item.label}
                </Button>
                <code className="text-xs text-muted-foreground block mt-2">size="{item.size}"</code>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Примеры использования</h2>
          
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Gradient Text</h3>
              <span className="text-3xl font-bold gradient-text">Градиентный текст</span>
              <pre className="mt-4 p-4 rounded-lg bg-background text-sm overflow-x-auto">
                <code>{`<span className="gradient-text">Градиентный текст</span>`}</code>
              </pre>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Glow Effect Card</h3>
              <div className="w-48 h-32 rounded-xl bg-primary/10 border border-primary/30 glow-effect flex items-center justify-center">
                <span className="text-primary font-medium">Hover me</span>
              </div>
              <pre className="mt-4 p-4 rounded-lg bg-background text-sm overflow-x-auto">
                <code>{`<div className="glow-effect">...</div>`}</code>
              </pre>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-semibold mb-4">Neon Line Separator</h3>
              <div className="neon-line w-full my-4" />
              <pre className="mt-4 p-4 rounded-lg bg-background text-sm overflow-x-auto">
                <code>{`<div className="neon-line" />`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* File Structure */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Структура файлов</h2>
          <div className="p-6 rounded-xl bg-card border border-border">
            <pre className="text-sm overflow-x-auto">
              <code>{`src/
├── index.css          # CSS переменные, утилиты, анимации
├── components/
│   └── ui/
│       └── button.tsx # Кастомные варианты кнопок
├── tailwind.config.ts # Расширение Tailwind темы
└── pages/
    ├── Index.tsx      # Лендинг
    ├── Dashboard.tsx  # Панель пользователя
    ├── Admin.tsx      # Админ-панель
    └── Docs.tsx       # Эта документация`}</code>
            </pre>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container px-4 md:px-6 text-center text-sm text-muted-foreground">
          AI Hub Design System v1.0 • Обновлено: Февраль 2026
        </div>
      </footer>
    </div>
  );
}
