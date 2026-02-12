import { useState, forwardRef } from "react";
import { Zap, Brain, GraduationCap, Search, Sparkles, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  model: string;
}

const scenarios: Scenario[] = [
  {
    id: "smart",
    title: "Умный",
    description: "Думает глубоко или быстро в зависимости от задачи",
    icon: Sparkles,
    model: "gpt-4.1",
  },
  {
    id: "quick",
    title: "Быстрый ответ",
    description: "Для повседневных запросов",
    icon: Zap,
    model: "gpt-4.1-mini",
  },
  {
    id: "deep",
    title: "Глубокий анализ",
    description: "Для сложных юридических вопросов",
    icon: Brain,
    model: "claude-sonnet-4.5",
  },
  {
    id: "learning",
    title: "Обучение",
    description: "Объяснения, примеры, инструкции",
    icon: GraduationCap,
    model: "gemini-2.5",
  },
  {
    id: "search",
    title: "Поиск",
    description: "Ответы с проверенными источниками",
    icon: Search,
    model: "gemini-2.5-flash",
  },
];

interface ModelSelectorProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
  compact?: boolean;
}

export function ModelSelector({ selectedModel, onSelect, compact }: ModelSelectorProps) {
  const [open, setOpen] = useState(false);
  const currentScenario = scenarios.find((s) => s.model === selectedModel) || scenarios[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "rounded-lg bg-card hover:bg-muted border border-border flex items-center justify-center transition-colors",
            compact ? "h-9 w-9" : "h-9 gap-2 px-3"
          )}
          title={currentScenario.title}
        >
          <currentScenario.icon className="h-4 w-4 text-muted-foreground" />
          {!compact && (
            <span className="text-sm font-medium text-foreground">{currentScenario.title}</span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        className="w-72 p-1 bg-card border-border rounded-xl shadow-lg"
      >
        <div className="space-y-0.5">
          {scenarios.map((scenario) => {
            const isActive = selectedModel === scenario.model;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  onSelect(scenario.model);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left",
                  isActive ? "bg-muted" : "hover:bg-muted/50"
                )}
              >
                <scenario.icon className={cn(
                  "w-5 h-5 shrink-0",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{scenario.title}</div>
                  <div className="text-xs text-muted-foreground">{scenario.description}</div>
                </div>
                {isActive && (
                  <Check className="w-4 h-4 text-foreground shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
