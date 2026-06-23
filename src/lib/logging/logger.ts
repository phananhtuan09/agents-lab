type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const SENSITIVE_PATTERNS: RegExp[] = [
  /password\s*[=:]\s*\S+/gi,
  /secret\s*[=:]\s*\S+/gi,
  /token\s*[=:]\s*\S+/gi,
  /api[_-]?key\s*[=:]\s*\S+/gi,
  /authorization\s*[=:]\s*\S+/gi,
  /bearer\s+\S+/gi,
  /private[_-]?key\s*[=:]\s*\S+/gi,
];

function redactSensitive(message: string): string {
  let sanitized = message;
  for (const pattern of SENSITIVE_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  }
  return sanitized;
}

async function logToBackend(level: LogLevel, message: string): Promise<void> {
  const sanitized = redactSensitive(message);
  try {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('log_message', { level, message: sanitized });
  } catch {
    console.warn(`[Logger] Failed to send log to backend: ${level} ${sanitized}`);
  }
}

export const logger = {
  debug(message: string): void {
    void logToBackend('DEBUG', message);
  },
  info(message: string): void {
    void logToBackend('INFO', message);
  },
  warn(message: string): void {
    void logToBackend('WARN', message);
  },
  error(message: string): void {
    void logToBackend('ERROR', message);
  },
};
