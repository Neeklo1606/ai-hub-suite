import { useState, useRef, useEffect, useCallback } from "react";
import { Send, FileText, Mic, X, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls } from "framer-motion";
import { ModelSelector } from "@/components/chat/ModelSelector";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AttachedFile {
  name: string;
  size: string;
  file: File;
}

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  selectedModel?: string;
  onSelectModel?: (modelId: string) => void;
}

export function ChatInput({ onSend, isLoading, placeholder = "Введите ваш юридический запрос или загрузите договор (PDF, DOCX)", selectedModel = "gpt-4.1", onSelectModel }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>("");
  const controls = useAnimationControls();

  // Auto-resize (max 5 lines ~120px)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Focus animation
  useEffect(() => {
    controls.start(
      isFocused
        ? { boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.2)", borderColor: "hsl(var(--primary) / 0.5)" }
        : { boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05)", borderColor: "hsl(var(--border))" }
    );
  }, [isFocused, controls]);

  // Speech Recognition
  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ru-RU";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }
      if (finalTranscript) {
        finalTranscriptRef.current += finalTranscript;
        setMessage(finalTranscriptRef.current.trim());
      } else if (interimTranscript) {
        setMessage((finalTranscriptRef.current + interimTranscript).trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech error:", event.error);
      setIsRecording(false);
    };
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current?.abort();
    };
  }, []);

  const handleToggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      finalTranscriptRef.current = message;
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile({ name: file.name, size: formatFileSize(file.size), file });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const allowed = ['.pdf', '.doc', '.docx'];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (allowed.includes(ext)) {
        setAttachedFile({ name: file.name, size: formatFileSize(file.size), file });
      }
    }
  }, []);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
      setAttachedFile(null);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto">
        {/* Attached file preview */}
        {attachedFile && (
          <div className="flex items-center gap-2 px-3 py-2 mb-2 bg-card rounded-lg border border-border">
            <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm text-foreground truncate">{attachedFile.name}</span>
            <span className="text-xs text-muted-foreground shrink-0">{attachedFile.size}</span>
            <button
              onClick={() => setAttachedFile(null)}
              className="ml-auto text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        <motion.div
          animate={controls}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex items-end gap-2 p-2 rounded-2xl border bg-card",
            isDragging && "ring-2 ring-primary bg-primary/5"
          )}
        >
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl z-20">
              <div className="text-sm text-muted-foreground">Отпустите файл для загрузки</div>
            </div>
          )}
          {/* Left icons */}
          <div className="flex items-center gap-0.5 shrink-0">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.md,.csv,.xls,.xlsx"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleFileSelect}
                    className="h-9 w-9 rounded-lg bg-card hover:bg-muted border border-border flex items-center justify-center transition-colors"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent><p>Прикрепить файл</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {onSelectModel && (
              <ModelSelector
                selectedModel={selectedModel}
                onSelect={onSelectModel}
                compact
              />
            )}

          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="flex-1 min-h-[40px] max-h-[120px] resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none py-2.5 px-1"
          />

          {/* Voice / Send toggle */}
          {message.trim() ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-9 w-9 shrink-0 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-all disabled:opacity-50"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              disabled={isLoading}
              className={cn(
                "h-9 w-9 shrink-0 rounded-lg bg-card hover:bg-muted border border-border flex items-center justify-center transition-all",
                isRecording && "border-destructive bg-destructive/10 animate-pulse"
              )}
              title={isRecording ? "Остановить запись" : "Голосовой ввод"}
            >
              <Mic className={cn("h-4 w-4", isRecording ? "text-destructive" : "text-muted-foreground")} />
            </button>
          )}
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          AI может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
}
