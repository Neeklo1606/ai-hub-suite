import api from '@/lib/axios';

export interface SiteSettings {
  name: string;
  description: string;
  maintenance_mode: boolean;
}

export interface FeaturesSettings {
  text_generation: boolean;
  image_generation: boolean;
  video_generation: boolean;
  audio_generation: boolean;
}

export interface ApiKeysSettings {
  openai: string;
  anthropic: string;
  google: string;
  stability: string;
  midjourney: string;
}

export interface AdminSettings {
  site: SiteSettings;
  features: FeaturesSettings;
  api_keys: ApiKeysSettings;
}

export const adminService = {
  async getSettings(): Promise<AdminSettings> {
    const response = await api.get<AdminSettings>('/admin/settings');
    return response.data;
  },

  async updateSettings(settings: Partial<AdminSettings>): Promise<{ message: string; settings: AdminSettings }> {
    const response = await api.post<{ message: string; settings: AdminSettings }>('/admin/settings', settings);
    return response.data;
  },
};
