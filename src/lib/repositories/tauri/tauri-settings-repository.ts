import type { SettingsRepository } from '@/lib/repositories/interfaces/settings-repository';
import type { Result } from '@/lib/dto/common';
import { settingsGet, settingsSet } from '@/lib/bridge/tauri-invoke';

export class TauriSettingsRepository implements SettingsRepository {
  async get(key: string): Promise<Result<string | null>> {
    return settingsGet(key);
  }

  async set(key: string, value: string): Promise<Result<void>> {
    return settingsSet(key, value);
  }
}
