import { Check, ChevronDown, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: React.ElementType;
  priceIn: string;
  priceOut: string;
  badge?: string;
}

const models: Model[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Самая мощная модель для сложных задач",
    icon: Sparkles,
    priceIn: "0.15₽",
    priceOut: "0.45₽",
    badge: "Popular",
  },
  {
    id: "claude-opus",
    name: "Claude Opus",
    provider: "Anthropic",
    description: "Лучшая для длинных текстов и анализа",
    icon: Brain,
    priceIn: "0.12₽",
    priceOut: "0.36₽",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    description: "Быстрая и эффективная модель",
    icon: Zap,
    priceIn: "0.08₽",
    priceOut: "0.24₽",
  },
  {
    id: "gigachat",
    name: "GigaChat",
    provider: "Сбер",
    description: "Русскоязычная модель от Сбера",
    icon: Brain,
    priceIn: "0.05₽",
    priceOut: "0.15₽",
    badge: "RU",
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onSelect }: ModelSelectorProps) {
  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-border/50 bg-muted/30 hover:bg-muted/50"
        >
          <currentModel.icon className="w-4 h-4 text-primary" />
          <span>{currentModel.name}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80">
        <DropdownMenuLabel>Выберите модель</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {models.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => onSelect(model.id)}
            className="flex items-start gap-3 p-3 cursor-pointer"
          >
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                selectedModel === model.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <model.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{model.name}</span>
                {model.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 text-primary">
                    {model.badge}
                  </span>
                )}
                {selectedModel === model.id && (
                  <Check className="w-4 h-4 text-primary ml-auto" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{model.description}</p>
              <p className="text-xs text-muted-foreground">
                {model.priceIn}/1K in • {model.priceOut}/1K out
              </p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
