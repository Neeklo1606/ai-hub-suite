import { cn } from "@/lib/utils";
import { User, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  model?: string;
  tokens?: number;
  cost?: string;
  timestamp?: Date;
}

interface ChatMessageProps {
  message: ChatMessageData;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { role, content, model, tokens, cost, timestamp } = message;
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const timeStr = timestamp
    ? timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
          isUser ? "bg-card border border-border" : "bg-muted"
        )}
      >
        {isUser ? <User className="w-4 h-4 text-muted-foreground" /> : <Bot className="w-4 h-4 text-muted-foreground" />}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "group max-w-[75%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-muted border-r-2 border-accent"
            : "bg-card border border-border border-l-2 border-l-foreground"
        )}
      >
        {!isUser && model && (
          <p className="text-xs font-medium text-primary mb-1">{model}</p>
        )}

        <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
          {content}
        </p>

        {/* Meta */}
        <div
          className={cn(
            "flex items-center gap-2 mt-2 text-[11px] text-muted-foreground",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          {timeStr && <span>{timeStr}</span>}
          {tokens != null && <span>• {tokens} tok</span>}
          {cost && <span>• {cost}</span>}

          {!isUser && (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
