import { invoke } from '@tauri-apps/api/core';
import type { Result } from '@/lib/dto/common';
import { ok, err } from '@/lib/dto/common';

export type TauriCommand = 'settings_get' | 'settings_set' | 'log_message';

export async function tauriInvoke<T>(
  cmd: TauriCommand,
  args?: Record<string, unknown>,
): Promise<Result<T>> {
  try {
    const result = await invoke<T>(cmd, args);
    return ok(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return err(message);
  }
}

export async function settingsGet(key: string): Promise<Result<string | null>> {
  return tauriInvoke<string | null>('settings_get', { key });
}

export async function settingsSet(key: string, value: string): Promise<Result<void>> {
  return tauriInvoke<void>('settings_set', { key, value });
}
