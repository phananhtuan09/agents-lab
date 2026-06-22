import { create } from 'zustand';
import type { AppSettingsDto } from '@/lib/dto/settings-dto';
import { getSettingsService } from '@/lib/di/container';

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  settings: AppSettingsDto;
  updateSettings: (newSettings: Partial<AppSettingsDto>) => Promise<void>;
  loadSettings: () => Promise<void>;
}

const settingsService = getSettingsService();

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  settings: {
    language: 'en',
    theme: 'dark',
  },

  loadSettings: async () => {
    const result = await settingsService.load();
    if (result.ok) {
      set({
        settings: result.value,
        isDarkMode: result.value.theme === 'dark',
      });
    }
  },

  updateSettings: async (newSettings) => {
    const current = useAppStore.getState().settings;
    const updated: AppSettingsDto = { ...current, ...newSettings };
    const result = await settingsService.save(updated);
    if (result.ok) {
      set({
        settings: updated,
        isDarkMode: updated.theme === 'dark',
      });
    }
  },
}));