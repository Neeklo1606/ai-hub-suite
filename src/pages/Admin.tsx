import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings,
  Globe,
  Zap,
  Key,
  Save,
  Loader2,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { adminService, AdminSettings } from "@/services/adminService";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getSettings();
      setSettings(data);
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки",
        description: error.response?.data?.message || "Не удалось загрузить настройки",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    try {
      setIsSaving(true);
      await adminService.updateSettings(settings);
      toast({
        title: "Успешно",
        description: "Настройки сохранены",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка сохранения",
        description: error.response?.data?.message || "Не удалось сохранить настройки",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateSiteSetting = (key: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      site: {
        ...settings.site,
        [key]: value,
      },
    });
  };

  const updateFeatureSetting = (key: string, value: boolean) => {
    if (!settings) return;
    setSettings({
      ...settings,
      features: {
        ...settings.features,
        [key]: value,
      },
    });
  };

  const updateApiKey = (key: string, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      api_keys: {
        ...settings.api_keys,
        [key]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Загрузка настроек...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!settings) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              Панель администратора
            </h1>
            <p className="text-muted-foreground mt-1">
              Управление настройками платформы
            </p>
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            variant="hero"
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Сохранить изменения
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="site" className="gap-2">
              <Globe className="w-4 h-4" />
              Настройки сайта
            </TabsTrigger>
            <TabsTrigger value="features" className="gap-2">
              <Zap className="w-4 h-4" />
              Возможности
            </TabsTrigger>
            <TabsTrigger value="api-keys" className="gap-2">
              <Key className="w-4 h-4" />
              API ключи
            </TabsTrigger>
          </TabsList>

          {/* Site Settings */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Глобальные настройки сайта
                </CardTitle>
                <CardDescription>
                  Основные параметры платформы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Название сайта</Label>
                  <Input
                    id="site-name"
                    value={settings.site.name}
                    onChange={(e) => updateSiteSetting('name', e.target.value)}
                    placeholder="Aura"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="site-description">Описание сайта</Label>
                  <Textarea
                    id="site-description"
                    value={settings.site.description}
                    onChange={(e) => updateSiteSetting('description', e.target.value)}
                    placeholder="Описание платформы"
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Режим обслуживания</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить режим обслуживания для всех пользователей
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={settings.site.maintenance_mode}
                    onCheckedChange={(checked) => updateSiteSetting('maintenance_mode', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Settings */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Настройки возможностей
                </CardTitle>
                <CardDescription>
                  Управление доступными функциями платформы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="text-generation">Генерация текста</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить возможность генерации текста
                    </p>
                  </div>
                  <Switch
                    id="text-generation"
                    checked={settings.features.text_generation}
                    onCheckedChange={(checked) => updateFeatureSetting('text_generation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="image-generation">Генерация изображений</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить возможность генерации изображений
                    </p>
                  </div>
                  <Switch
                    id="image-generation"
                    checked={settings.features.image_generation}
                    onCheckedChange={(checked) => updateFeatureSetting('image_generation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="video-generation">Генерация видео</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить возможность генерации видео
                    </p>
                  </div>
                  <Switch
                    id="video-generation"
                    checked={settings.features.video_generation}
                    onCheckedChange={(checked) => updateFeatureSetting('video_generation', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="space-y-0.5">
                    <Label htmlFor="audio-generation">Генерация аудио</Label>
                    <p className="text-sm text-muted-foreground">
                      Включить возможность генерации аудио
                    </p>
                  </div>
                  <Switch
                    id="audio-generation"
                    checked={settings.features.audio_generation}
                    onCheckedChange={(checked) => updateFeatureSetting('audio_generation', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Settings */}
          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API ключи для моделей ИИ
                </CardTitle>
                <CardDescription>
                  Управление ключами доступа к различным API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Input
                    id="openai-key"
                    type="password"
                    value={settings.api_keys.openai}
                    onChange={(e) => updateApiKey('openai', e.target.value)}
                    placeholder="sk-..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Ключ для доступа к GPT-4, DALL-E и другим моделям OpenAI
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                  <Input
                    id="anthropic-key"
                    type="password"
                    value={settings.api_keys.anthropic}
                    onChange={(e) => updateApiKey('anthropic', e.target.value)}
                    placeholder="sk-ant-..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Ключ для доступа к Claude и другим моделям Anthropic
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google-key">Google API Key</Label>
                  <Input
                    id="google-key"
                    type="password"
                    value={settings.api_keys.google}
                    onChange={(e) => updateApiKey('google', e.target.value)}
                    placeholder="AIza..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Ключ для доступа к Gemini и другим моделям Google
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stability-key">Stability AI API Key</Label>
                  <Input
                    id="stability-key"
                    type="password"
                    value={settings.api_keys.stability}
                    onChange={(e) => updateApiKey('stability', e.target.value)}
                    placeholder="sk-..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Ключ для доступа к Stable Diffusion и другим моделям Stability AI
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="midjourney-key">Midjourney API Key</Label>
                  <Input
                    id="midjourney-key"
                    type="password"
                    value={settings.api_keys.midjourney}
                    onChange={(e) => updateApiKey('midjourney', e.target.value)}
                    placeholder="..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Ключ для доступа к Midjourney API
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Безопасность</p>
                      <p>Все ключи хранятся в зашифрованном виде. При сохранении существующие ключи обновляются только если вы ввели новое значение.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
