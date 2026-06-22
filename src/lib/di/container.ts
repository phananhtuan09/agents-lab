import type { SettingsRepository } from '@/lib/repositories/interfaces/settings-repository';
import { TauriSettingsRepository } from '@/lib/repositories/tauri/tauri-settings-repository';
import { SettingsService } from '@/lib/services/settings-service';

let settingsServiceInstance: SettingsService | null = null;

export function getSettingsService(): SettingsService {
  if (!settingsServiceInstance) {
    const repo: SettingsRepository = new TauriSettingsRepository();
    settingsServiceInstance = new SettingsService(repo);
  }
  return settingsServiceInstance;
}

export function createTestSettingsService(repo: SettingsRepository): SettingsService {
  return new SettingsService(repo);
}
