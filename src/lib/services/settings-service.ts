import type { SettingsRepository } from '@/lib/repositories/interfaces/settings-repository';
import type { AppSettingsDto } from '@/lib/dto/settings-dto';
import { toAppSettingsDto, appSettingsToEntries } from '@/lib/dto/settings-dto';
import type { Result } from '@/lib/dto/common';

export class SettingsService {
  constructor(private readonly repository: SettingsRepository) {}

  async load(): Promise<Result<AppSettingsDto>> {
    const keys = ['language', 'theme'];
    const entries: { key: string; value: string }[] = [];

    for (const key of keys) {
      const result = await this.repository.get(key);
      if (!result.ok) {
        return result;
      }
      if (result.value !== null) {
        entries.push({ key, value: result.value });
      }
    }

    return { ok: true, value: toAppSettingsDto(entries) };
  }

  async save(settings: AppSettingsDto): Promise<Result<void>> {
    const entries = appSettingsToEntries(settings);
    for (const entry of entries) {
      const result = await this.repository.set(entry.key, entry.value);
      if (!result.ok) {
        return result;
      }
    }
    return { ok: true, value: undefined };
  }
}
