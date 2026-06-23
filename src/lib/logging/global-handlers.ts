import { logger } from './logger';

export function setupGlobalErrorHandlers(): void {
  window.addEventListener('error', (event: ErrorEvent) => {
    const detail = event.error instanceof Error
      ? event.error.message
      : event.message;
    logger.error(
      `Unhandled error: ${detail} (${event.filename}:${event.lineno}:${event.colno})`,
    );
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const detail = event.reason instanceof Error
      ? event.reason.message
      : String(event.reason);
    logger.error(`Unhandled promise rejection: ${detail}`);
  });
}
