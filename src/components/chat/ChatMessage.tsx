import { cn } from "@/lib/utils";
import { User, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  model?: string;
  tokens?: number;
  timestamp?: Date;
}

export function ChatMessage({ role, content, model, tokens, timestamp }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "group flex gap-4 p-4 rounded-xl transition-colors",
        role === "user" 
          ? "bg-muted/30" 
          : "bg-primary/5 border border-primary/10"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          role === "user"
            ? "bg-secondary text-secondary-foreground"
            : "bg-gradient-to-br from-primary to-secondary text-white"
        )}
      >
        {role === "user" ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">
            {role === "user" ? "Вы" : model || "AI Assistant"}
          </span>
          {tokens && (
            <span className="text-xs text-muted-foreground">
              {tokens} токенов
            </span>
          )}
          {timestamp && (
            <span className="text-xs text-muted-foreground">
              {timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
            {content}
          </p>
        </div>

        {role === "assistant" && (
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="w-3 h-3 mr-1" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              {copied ? "Скопировано" : "Копировать"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
