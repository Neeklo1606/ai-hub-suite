import { Link } from "react-router-dom";
import { PlayCircle, FileSearch, MessageSquare, FilePen, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface UseCaseCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function UseCaseCard({ icon: Icon, title, description }: UseCaseCardProps) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <Icon className="w-8 h-8 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

const faqItems = [
  { q: "Как Aura анализирует договоры?", a: "Aura использует AI для выявления рисков, противоречий и проблемных пунктов в юридических документах. Загрузите файл — получите структурированный отчёт за минуты." },
  { q: "Можно ли доверять AI в юридических вопросах?", a: "Aura — это ассистент, а не замена юристу. Платформа помогает ускорить рутинную работу и выявить потенциальные проблемы, но финальное решение всегда за вами." },
  { q: "Какие форматы документов поддерживаются?", a: "PDF, DOCX, DOC, TXT. Мы постоянно расширяем список поддерживаемых форматов." },
  { q: "Сколько стоит использование?", a: "Базовый тариф бесплатный и включает до 5 анализов в месяц. Для профессионального использования доступны расширенные планы." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 ml-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">Aura</Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Войти
            </Link>
            <Link to="/register" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm transition-colors hover:bg-accent">
              Начать бесплатно
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
            Юридический AI-ассистент
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Анализируйте договоры, получайте консультации, создавайте документы
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-accent"
          >
            Начать бесплатно
          </Link>
        </motion.div>
      </section>

      {/* Demo Video */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Как работает Aura</h2>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center border border-border cursor-pointer hover:border-muted-foreground/30 transition-colors">
            <PlayCircle className="w-16 h-16 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Что можно делать</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <UseCaseCard
              icon={FileSearch}
              title="Анализ договоров"
              description="Проверка на риски, выявление проблемных пунктов"
            />
            <UseCaseCard
              icon={MessageSquare}
              title="Юридические консультации"
              description="Ответы на правовые вопросы 24/7"
            />
            <UseCaseCard
              icon={FilePen}
              title="Создание документов"
              description="Генерация исков, заявлений, договоров"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Частые вопросы</h2>
          <div>
            {faqItems.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2026 Aura. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Политика</Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Условия</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
