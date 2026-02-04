import { Check, ChevronDown, Sparkles, Wand2, Image as ImageIcon, Palette } from "lucide-react";
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
import { ImageModel } from "./types";

const models: ImageModel[] = [
  {
    id: "midjourney",
    name: "Midjourney v6",
    provider: "Midjourney",
    description: "Лучшее качество для арта и иллюстраций",
    icon: Sparkles,
    price: "5₽/изобр.",
    badge: "Popular",
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    provider: "OpenAI",
    description: "Точное следование промпту",
    icon: Wand2,
    price: "4₽/изобр.",
  },
  {
    id: "sd-xl",
    name: "Stable Diffusion XL",
    provider: "Stability AI",
    description: "Быстрая генерация, гибкие настройки",
    icon: ImageIcon,
    price: "2₽/изобр.",
  },
  {
    id: "kandinsky",
    name: "Kandinsky 3.0",
    provider: "Сбер",
    description: "Русскоязычная модель",
    icon: Palette,
    price: "1₽/изобр.",
    badge: "RU",
  },
];

interface ImageModelSelectorProps {
  selectedModel: string;
  onSelect: (modelId: string) => void;
}

export function ImageModelSelector({ selectedModel, onSelect }: ImageModelSelectorProps) {
  const currentModel = models.find((m) => m.id === selectedModel) || models[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 border-border/50 bg-muted/30 hover:bg-muted/50"
        >
          <currentModel.icon className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline">{currentModel.name}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
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
              <p className="text-xs text-muted-foreground">{model.price}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
