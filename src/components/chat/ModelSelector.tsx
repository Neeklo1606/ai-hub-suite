import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
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
  price: string;
}

const models: Model[] = [
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    description: "Самая мощная модель для сложных задач",
    letter: "G",
    price: "от 0.15₽",
  },
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    description: "Лучшая для длинных текстов и анализа",
    letter: "C",
    price: "от 0.12₽",
  },
  {
    id: "gemini-2.5",
    name: "Gemini 2.5",
    provider: "Google",
    description: "Быстрая и эффективная мультимодальная модель",
    letter: "G",
    price: "от 0.08₽",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    description: "Сильная модель для рассуждений и кода",
    letter: "D",
    price: "от 0.05₽",
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
        <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
          <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-muted-foreground font-bold text-[10px] shrink-0">
            {currentModel.letter}
          </div>
          <span className="text-sm font-medium text-foreground">{currentModel.name}</span>
          <span className="text-xs text-muted-foreground">{currentModel.price}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg text-foreground">Выберите модель</DialogTitle>
        </DialogHeader>

        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск моделей..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>

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
                    ? "bg-muted border border-primary"
                    : "bg-muted/40 hover:bg-muted border border-transparent"
                )}
              >
                <div className="w-9 h-9 rounded-lg bg-border flex items-center justify-center text-muted-foreground font-bold text-sm shrink-0">
                  {model.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground">{model.name}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{model.description}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">{model.price}</p>
                </div>
                {isActive && (
                  <Check className="w-4 h-4 text-primary shrink-0" />
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
