import { useState } from "react";
import { Zap, Brain, GraduationCap, Search, Sparkles, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  model: string;
}

const scenarios: Scenario[] = [
  {
    id: "quick",
    title: "Быстрый ответ",
    description: "Для повседневных запросов и простых задач",
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
    description: "Объяснения, примеры, пошаговые инструкции",
    icon: GraduationCap,
    model: "gpt-4.1",
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {compact ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="h-9 w-9 rounded-lg bg-card hover:bg-muted border border-border flex items-center justify-center transition-colors">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent><p>Выбрать сценарий</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors cursor-pointer">
            <currentScenario.icon className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-sm font-medium text-foreground">{currentScenario.title}</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 pb-3">
          <DialogTitle className="text-lg text-foreground">Выберите сценарий</DialogTitle>
        </DialogHeader>

        <div className="p-4 pt-0 grid grid-cols-2 gap-2">
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
                  "flex items-start gap-3 p-3 rounded-xl transition-colors text-left",
                  isActive
                    ? "border border-primary bg-primary/5"
                    : "border border-border hover:bg-muted"
                )}
              >
                <scenario.icon className={cn(
                  "w-5 h-5 shrink-0 mt-0.5",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-foreground">{scenario.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{scenario.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
