export interface ImageSettings {
  aspectRatio: string;
  style: string;
  quality: string;
  negativePrompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  model: string;
  settings: ImageSettings;
  createdAt: Date;
}

export interface ImageModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: React.ElementType;
  price: string;
  badge?: string;
}
