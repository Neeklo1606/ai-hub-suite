import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ImagePromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export function ImagePromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
}: ImagePromptInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wand2 className="w-4 h-4" />
        <span>Опишите изображение</span>
      </div>
      
      <Textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Фотореалистичный портрет космонавта на Марсе, драматическое освещение, детализация 8K..."
        className="min-h-[100px] resize-none bg-background/50 border-border/50 focus:border-primary/50"
      />
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Shift + Enter для новой строки
        </p>
        <Button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          variant="hero"
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Генерация...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Создать
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
