import type { Result } from '@/lib/dto/common';

export interface SettingsRepository {
  get(key: string): Promise<Result<string | null>>;
  set(key: string, value: string): Promise<Result<void>>;
}
