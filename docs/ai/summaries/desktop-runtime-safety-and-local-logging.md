## Done
- AC1: Created `src-tauri/capabilities/default.json` with minimal `core:default` permissions allowlist
- AC2: Explicitly excluded shell, fs, process, and other unnecessary capabilities from the allowlist
- AC3: Set baseline CSP in `tauri.conf.json` with restrictive `script-src 'self'`, `frame-src 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'none'`; style-src allows `unsafe-inline` for Tailwind compatibility; connect-src allows Tauri IPC and localhost dev server
- AC4: Created `src/features/app-shell/ErrorBoundary.tsx` React class component with `getDerivedStateFromError` / `componentDidCatch` and a styled default fallback with reload button
- AC5: Created `src/features/app-shell/LoadingFallback.tsx` with spinner and text; wired `<ErrorBoundary>` + `<Suspense>` in `src/main.tsx`
- AC6: Created `src/lib/logging/logger.ts` with level-based logging (DEBUG/INFO/WARN/ERROR), sensitive data redaction (password, secret, token, api_key, authorization, bearer, private_key patterns), and Tauri `log_message` command integration via dynamic import
- AC6: Created `src/lib/logging/global-handlers.ts` hooking `window.error` and `window.unhandledrejection` events to pipe unhandled errors into the logger
- AC7: Updated `src-tauri/src/logging.rs` `log()` method to `eprintln!` file open/write failures to stderr instead of silently swallowing them

## Not Done / Blocked
- No automated tests for ErrorBoundary, logger, or global handlers (not yet feasible without DOM setup for ErrorBoundary)
- Rust side not compiled (no Rust toolchain on this machine; changes are minimal and follow existing patterns)

## Decisions
- Chose `core:default` as the single Tauri capability permission set — it's the most minimal default that still allows window management and events
- Chose `unsafe-inline` for `style-src` in CSP since Tailwind injects inline styles; this can be tightened later with a nonce/hash strategy
- Chose dynamic import of `@tauri-apps/api/core` in logger to avoid breaking in test/non-Tauri environments
- Chose `window.addEventListener` over `window.onerror`/`window.onunhandledrejection` assignment to avoid clobbering existing handlers
- Kept logging.rs failure reporting to stderr instead of surfacing to UI to avoid coupling concerns in this foundation slice

## Verified
- AC1 ✅: Config file inspection confirms `core:default` only, no shell/fs/process permissions
- AC2 ✅: Same as AC1 — no dangerous capabilities in allowlist
- AC3 ✅: CSP string inspection confirms restrictive directives for scripts, frames, objects, forms, and base-uri
- AC4 ✅: ErrorBoundary class component exists with correct React error boundary lifecycle methods
- AC5 ✅: LoadingFallback component exists and is wired via `<Suspense>` in main.tsx
- AC6 ✅: Logger utility exists with all four log levels, Tauri integration, and sensitive data redaction; global handlers wired in main.tsx
- AC7 ✅: logging.rs `log()` now emits `eprintln!` on file open/write failures
- TypeScript type check: `tsc --noEmit` passes with zero errors
- Existing test suite: 4/4 tests pass (Vitest)

## Not Verified
- Runtime CSP enforcement: No automated coverage (requires Tauri webview runtime)
- Error boundary rendering: No automated coverage (requires DOM rendering test)
- Log file write failure behavior on macOS: No automated coverage (requires actual disk error simulation)
- Rust compilation: Not available (no Rust toolchain); code changes are minimal and follow existing patterns
