import { useState, useRef, useEffect, useCallback } from "react";
import { FileText, Mic, X, ArrowUp, Globe, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
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

export function ChatInput({ onSend, isLoading, placeholder = "Спросите что угодно", selectedModel = "gpt-4.1", onSelectModel }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>("");

  // Auto-resize (max 5 lines ~120px)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

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
    <div className="bg-background/80 backdrop-blur-sm px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
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

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative rounded-2xl border border-border bg-card transition-colors",
            isDragging && "ring-2 ring-primary bg-primary/5"
          )}
        >
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl z-20">
              <div className="text-sm text-muted-foreground">Отпустите файл для загрузки</div>
            </div>
          )}

          {/* Textarea row */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="w-full min-h-[44px] max-h-[120px] resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none px-4 pt-3 pb-1"
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-2 pb-2">
            {/* Left actions */}
            <div className="flex items-center gap-1">
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
                      className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent><p>Прикрепить файл</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="h-8 flex items-center gap-1.5 px-2.5 rounded-lg border border-border hover:bg-muted transition-colors">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Web search</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent><p>Поиск в интернете</p></TooltipContent>
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

            {/* Right: Mic / Send */}
            {message.trim() ? (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="h-9 w-9 shrink-0 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleToggleRecording}
                disabled={isLoading}
                className={cn(
                  "h-9 w-9 shrink-0 rounded-full bg-foreground text-background flex items-center justify-center transition-colors",
                  isRecording && "bg-destructive text-destructive-foreground animate-pulse"
                )}
                title={isRecording ? "Остановить запись" : "Голосовой ввод"}
              >
                <Mic className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-2">
          AI может ошибаться. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
}
