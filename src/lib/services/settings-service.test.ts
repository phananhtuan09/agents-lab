import { describe, it, expect } from 'vitest';
import type { SettingsRepository } from '@/lib/repositories/interfaces/settings-repository';
import type { Result } from '@/lib/dto/common';
import { SettingsService } from './settings-service';

function createMockRepo(): SettingsRepository {
  const store = new Map<string, string>();
  return {
    get: async (key: string): Promise<Result<string | null>> => {
      return { ok: true, value: store.get(key) ?? null };
    },
    set: async (key: string, value: string): Promise<Result<void>> => {
      store.set(key, value);
      return { ok: true, value: undefined };
    },
  };
}

describe('SettingsService', () => {
  it('loads settings from repository and maps to AppSettingsDto', async () => {
    const repo = createMockRepo();
    const service = new SettingsService(repo);

    await repo.set('language', 'vi');
    await repo.set('theme', 'light');

    const result = await service.load();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ language: 'vi', theme: 'light' });
    }
  });

  it('returns defaults when no settings in repository', async () => {
    const repo = createMockRepo();
    const service = new SettingsService(repo);

    const result = await service.load();
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ language: 'en', theme: 'dark' });
    }
  });

  it('saves settings through repository', async () => {
    const repo = createMockRepo();
    const service = new SettingsService(repo);

    const saveResult = await service.save({ language: 'vi', theme: 'light' });
    expect(saveResult.ok).toBe(true);

    const loadResult = await service.load();
    expect(loadResult.ok).toBe(true);
    if (loadResult.ok) {
      expect(loadResult.value).toEqual({ language: 'vi', theme: 'light' });
    }
  });

  it('returns error when repository get fails', async () => {
    const repo = createMockRepo();
    repo.get = async (_key: string): Promise<Result<string | null>> => {
      return { ok: false as const, error: 'DB error' };
    };
    const service = new SettingsService(repo);

    const result = await service.load();
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('DB error');
    }
  });
});
