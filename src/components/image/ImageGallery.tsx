import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Trash2, Copy, Maximize2, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import { GeneratedImage } from "./types";
import { toast } from "sonner";

interface ImageGalleryProps {
  images: GeneratedImage[];
  isGenerating: boolean;
  onRemove: (id: string) => void;
}

export function ImageGallery({ images, isGenerating, onRemove }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);

  const handleDownload = async (image: GeneratedImage) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-image-${image.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Изображение скачано");
    } catch {
      toast.error("Ошибка скачивания");
    }
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Промпт скопирован");
  };

  if (images.length === 0 && !isGenerating) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        {isGenerating ? "Генерация..." : "Результаты"}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Loading placeholders */}
        <AnimatePresence>
          {isGenerating && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={`loading-${i}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square rounded-xl bg-muted/50 border border-border flex items-center justify-center"
                >
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Generated images */}
        <AnimatePresence>
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-muted border border-border"
            >
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                  <p className="text-xs text-foreground line-clamp-2">{image.prompt}</p>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 h-8 text-xs"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Maximize2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleDownload(image)}
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 h-8 text-xs"
                      onClick={() => handleCopyPrompt(image.prompt)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="h-8 text-xs text-destructive hover:text-destructive"
                      onClick={() => onRemove(image.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full screen dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-background/95 backdrop-blur-xl border-border">
          <VisuallyHidden>
            <DialogTitle>Просмотр изображения</DialogTitle>
          </VisuallyHidden>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.url}
                alt={selectedImage.prompt}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="absolute top-4 right-4">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-sm text-foreground mb-3">{selectedImage.prompt}</p>
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                    {selectedImage.model}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {selectedImage.settings.aspectRatio}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {selectedImage.settings.style}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                    {selectedImage.settings.quality}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="hero"
                    className="gap-2"
                    onClick={() => handleDownload(selectedImage)}
                  >
                    <Download className="w-4 h-4" />
                    Скачать
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleCopyPrompt(selectedImage.prompt)}
                  >
                    <Copy className="w-4 h-4" />
                    Копировать промпт
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
