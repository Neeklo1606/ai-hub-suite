import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  letter: string;
  color: string;
  price: string;
  badge?: string;
}

const models: Model[] = [
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    description: "Самая мощная модель для сложных задач",
    letter: "G",
    color: "bg-emerald-500",
    price: "от 0.15₽",
    badge: "Popular",
  },
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    description: "Лучшая для длинных текстов и анализа",
    letter: "C",
    color: "bg-amber-500",
    price: "от 0.12₽",
  },
  {
    id: "gemini-2.5",
    name: "Gemini 2.5",
    provider: "Google",
    description: "Быстрая и эффективная мультимодальная модель",
    letter: "G",
    color: "bg-blue-500",
    price: "от 0.08₽",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    description: "Сильная модель для рассуждений и кода",
    letter: "D",
    color: "bg-violet-500",
    price: "от 0.05₽",
    badge: "New",
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  const filtered = models.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="p-3 cursor-pointer hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0",
                currentModel.color
              )}
            >
              {currentModel.letter}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold truncate">{currentModel.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/10 text-green-600 font-medium">
                  Активна
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{currentModel.price}</p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0 text-xs text-primary">
              Сменить модель
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg">Выберите модель</DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск моделей..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Models list */}
        <div className="p-2 max-h-[360px] overflow-y-auto">
          {filtered.map((model) => {
            const isActive = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => {
                  onSelect(model.id);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left",
                  isActive
                    ? "bg-primary/5"
                    : "hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0",
                    model.color
                  )}
                >
                  {model.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{model.name}</span>
                    {model.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary">
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{model.description}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{model.price}</p>
                </div>
                {isActive && (
                  <Check className="w-5 h-5 text-primary shrink-0" />
                )}
              </button>
            );
          })}

          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">Модели не найдены</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
