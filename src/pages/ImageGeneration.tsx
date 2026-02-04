import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ImageModelSelector } from "@/components/image/ImageModelSelector";
import { ImagePromptInput } from "@/components/image/ImagePromptInput";
import { ImageSettings } from "@/components/image/ImageSettings";
import { ImageGallery } from "@/components/image/ImageGallery";
import { GeneratedImage } from "@/components/image/types";
import { Sparkles, Wand2, Palette, Camera, Layers } from "lucide-react";

const quickPrompts = [
  { icon: Sparkles, label: "Фэнтези пейзаж", prompt: "Волшебный лес с светящимися грибами и феями, мягкий туман, лунный свет" },
  { icon: Wand2, label: "Футуризм", prompt: "Футуристический город будущего с неоновыми огнями и летающими машинами, киберпанк стиль" },
  { icon: Palette, label: "Портрет", prompt: "Художественный портрет в стиле импрессионизма, мягкие мазки, тёплые тона" },
  { icon: Camera, label: "Фотореализм", prompt: "Фотореалистичный горный пейзаж на закате, отражение в озере, 8K качество" },
  { icon: Layers, label: "Абстракция", prompt: "Абстрактная композиция с геометрическими фигурами, яркие градиенты, современное искусство" },
];

export default function ImageGeneration() {
  const [selectedModel, setSelectedModel] = useState("midjourney");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [settings, setSettings] = useState({
    aspectRatio: "1:1",
    style: "default",
    quality: "standard",
    negativePrompt: "",
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
    
    // Mock generated images
    const newImages: GeneratedImage[] = Array.from({ length: 4 }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      url: `https://picsum.photos/seed/${Date.now() + i}/512/512`,
      prompt,
      model: selectedModel,
      settings: { ...settings },
      createdAt: new Date(),
    }));
    
    setGeneratedImages(prev => [...newImages, ...prev]);
    setIsGenerating(false);
  };

  const handleQuickPrompt = (quickPrompt: string) => {
    setPrompt(quickPrompt);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="shrink-0 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3 pt-14 lg:pt-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Генерация изображений</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">AI-художник для ваших идей</p>
              </div>
            </div>
            <ImageModelSelector selectedModel={selectedModel} onSelect={setSelectedModel} />
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
            {/* Quick Prompts */}
            <AnimatePresence>
              {generatedImages.length === 0 && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-2">Создайте уникальное изображение</h2>
                  <p className="text-muted-foreground mb-6">Опишите что хотите увидеть или выберите готовый промпт</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {quickPrompts.map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleQuickPrompt(item.prompt)}
                        className="p-4 rounded-xl bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/50 transition-all group"
                      >
                        <item.icon className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-foreground">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prompt Input & Settings */}
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <ImagePromptInput
                  prompt={prompt}
                  onPromptChange={setPrompt}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                />
              </div>
              <div>
                <ImageSettings settings={settings} onSettingsChange={setSettings} />
              </div>
            </div>

            {/* Generated Images Gallery */}
            <ImageGallery 
              images={generatedImages} 
              isGenerating={isGenerating}
              onRemove={(id) => setGeneratedImages(prev => prev.filter(img => img.id !== id))}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
