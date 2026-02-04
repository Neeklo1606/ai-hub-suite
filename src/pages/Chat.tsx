import { useState, useRef, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, History, Sparkles, MessageSquare, Trash2 } from "lucide-react";
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
  { icon: "✍️", title: "Напиши статью", description: "про искусственный интеллект" },
  { icon: "💻", title: "Помоги с кодом", description: "на Python или JavaScript" },
  { icon: "🎨", title: "Придумай идею", description: "для стартапа или проекта" },
  { icon: "📊", title: "Проанализируй", description: "данные или текст" },
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <ModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
              <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
                <Plus className="w-4 h-4" />
                Новый чат
              </Button>
            </div>
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
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-[0_0_40px_hsla(217,91%,60%,0.3)]">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Чем могу помочь?
                </h1>
                <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                  Выберите модель и начните общение с AI
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {welcomePrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handlePromptClick(prompt)}
                      className="flex items-start gap-3 p-3 sm:p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/30 transition-all text-left group"
                    >
                      <span className="text-xl sm:text-2xl">{prompt.icon}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                          {prompt.title}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                          {prompt.description}
                        </p>
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
                      <ChatMessage
                        role={message.role}
                        content={message.content}
                        model={message.model}
                        tokens={message.tokens}
                        timestamp={message.timestamp}
                      />
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
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
