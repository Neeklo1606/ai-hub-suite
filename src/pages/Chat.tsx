import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, History, MessageSquare, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  tokens?: number;
  timestamp: Date;
}

const welcomePrompts = [
  { title: "Анализ договора", description: "Проверить условия и риски" },
  { title: "Составить документ", description: "Иск, жалоба, заявление" },
  { title: "Юридическая консультация", description: "Ответы на правовые вопросы" },
  { title: "Анализ судебной практики", description: "Поиск релевантных решений" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState("gpt-4-turbo");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const modelNames: Record<string, string> = {
    "gpt-4-turbo": "GPT-4 Turbo",
    "claude-opus": "Claude Opus",
    "gemini-pro": "Gemini Pro",
    "gigachat": "GigaChat",
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Это отличный вопрос! Давайте разберём его подробнее...\n\nИскусственный интеллект (ИИ) — это область информатики, которая занимается созданием систем, способных выполнять задачи, требующие человеческого интеллекта.\n\nОсновные направления ИИ:\n• Машинное обучение\n• Глубокое обучение\n• Обработка естественного языка\n• Компьютерное зрение",
        "Рад помочь! Вот что я думаю по этому поводу...\n\nДля решения этой задачи можно использовать несколько подходов. Каждый из них имеет свои преимущества и недостатки.\n\nРекомендую начать с простого решения и постепенно усложнять его по мере необходимости.",
        "Интересная задача! Позвольте предложить несколько вариантов решения...\n\n1. Первый вариант — использовать готовые библиотеки\n2. Второй вариант — написать собственное решение\n3. Третий вариант — комбинированный подход\n\nВыбор зависит от ваших конкретных требований и ограничений.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        model: modelNames[selectedModel],
        tokens: Math.floor(Math.random() * 500) + 100,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: { title: string; description: string }) => {
    handleSend(`${prompt.title} ${prompt.description}`);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm px-4 sm:px-6 py-3 pt-14 lg:pt-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Новый чат</span>
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2">
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">История</span>
              </Button>
              {messages.length > 0 && (
                <Button variant="ghost" size="sm" className="gap-2 text-destructive" onClick={clearChat}>
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Очистить</span>
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-2xl w-full"
              >
                <h1 className="text-xl sm:text-2xl font-medium text-foreground mb-1">
                  Чем могу помочь?
                </h1>
                <p className="text-sm text-muted-foreground mb-6">
                  Выберите задачу
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {welcomePrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handlePromptClick(prompt)}
                      className="px-4 py-3 bg-card hover:bg-muted rounded-lg border border-border text-left transition-colors"
                    >
                      <div className="text-sm font-medium text-foreground">
                        {prompt.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {prompt.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            // Messages
            <ScrollArea ref={scrollRef} className="h-full">
              <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <ChatMessage message={message} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 p-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} isLoading={isLoading} selectedModel={selectedModel} onSelectModel={setSelectedModel} />
      </div>
    </DashboardLayout>
  );
}
