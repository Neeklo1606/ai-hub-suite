import { Settings, Square, RectangleHorizontal, RectangleVertical } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ImageSettings as ImageSettingsType } from "./types";

const aspectRatios = [
  { value: "1:1", label: "1:1", icon: Square },
  { value: "16:9", label: "16:9", icon: RectangleHorizontal },
  { value: "9:16", label: "9:16", icon: RectangleVertical },
  { value: "4:3", label: "4:3", icon: RectangleHorizontal },
  { value: "3:4", label: "3:4", icon: RectangleVertical },
];

const styles = [
  { value: "default", label: "По умолчанию" },
  { value: "anime", label: "Аниме" },
  { value: "photorealistic", label: "Фотореализм" },
  { value: "digital-art", label: "Цифровое искусство" },
  { value: "oil-painting", label: "Масляная живопись" },
  { value: "watercolor", label: "Акварель" },
  { value: "3d-render", label: "3D рендер" },
  { value: "comic", label: "Комикс" },
];

const qualities = [
  { value: "draft", label: "Черновик", description: "Быстро" },
  { value: "standard", label: "Стандарт", description: "Баланс" },
  { value: "hd", label: "HD", description: "Высокое качество" },
  { value: "ultra", label: "Ultra", description: "Максимум" },
];

interface ImageSettingsProps {
  settings: ImageSettingsType;
  onSettingsChange: (settings: ImageSettingsType) => void;
}

export function ImageSettings({ settings, onSettingsChange }: ImageSettingsProps) {
  const updateSetting = <K extends keyof ImageSettingsType>(
    key: K,
    value: ImageSettingsType[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Settings className="w-4 h-4" />
        <span>Настройки</span>
      </div>

      {/* Aspect Ratio */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Соотношение сторон</Label>
        <div className="flex gap-1">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value}
              onClick={() => updateSetting("aspectRatio", ratio.value)}
              className={cn(
                "flex-1 p-2 rounded-lg border text-xs font-medium transition-all",
                settings.aspectRatio === ratio.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50"
              )}
            >
              {ratio.label}
            </button>
          ))}
        </div>
      </div>

      {/* Style */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Стиль</Label>
        <Select
          value={settings.style}
          onValueChange={(value) => updateSetting("style", value)}
        >
          <SelectTrigger className="bg-background/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {styles.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quality */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Качество</Label>
        <div className="grid grid-cols-2 gap-2">
          {qualities.map((quality) => (
            <button
              key={quality.value}
              onClick={() => updateSetting("quality", quality.value)}
              className={cn(
                "p-2 rounded-lg border text-left transition-all",
                settings.quality === quality.value
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-background border-border hover:border-primary/50"
              )}
            >
              <div className="text-xs font-medium">{quality.label}</div>
              <div className="text-[10px] text-muted-foreground">{quality.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Negative Prompt */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Негативный промпт</Label>
        <Textarea
          value={settings.negativePrompt}
          onChange={(e) => updateSetting("negativePrompt", e.target.value)}
          placeholder="Что исключить из генерации..."
          className="min-h-[60px] resize-none text-xs bg-background/50 border-border/50"
        />
      </div>
    </div>
  );
}
