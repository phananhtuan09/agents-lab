# Agent Labs Desktop

A desktop-first application built with Tauri 2, React, TypeScript, and SQLite.

## Prerequisites

- Node.js 18+
- pnpm (required)
- Rust and Cargo (for Tauri native host)

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the Tauri development server:
   ```bash
   pnpm tauri:dev
   ```

3. Build for production:
   ```bash
   pnpm tauri:build
   ```

To run the frontend standalone (without the Tauri window):
```bash
pnpm dev
```

## Project Structure

- `src/` - React frontend source code
  - `features/` - Feature-based architecture
    - `app-shell/` - App shell with sidebar and header
    - `dashboard/` - Dashboard component
  - `store/` - Zustand state management
    - `useAppStore.ts` - Global app state
- `src-tauri/` - Tauri native host
  - `src/` - Rust source code
    - `main.rs` - Main application entry point
    - `logging.rs` - Local file logging module
  - `icons/` - Application icons
- `docs/` - Project documentation

## Tech Stack

- **Runtime**: Tauri 2
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with Signal Noir theme
- **State Management**: Zustand
- **Database**: SQLite
- **Package Manager**: pnpm

## Theme

Uses the `Signal Noir` dark theme with graphite surfaces, cobalt base, and violet accents.

## Architecture

- Feature-based architecture for frontend
- Local-first data storage with SQLite
- Minimal native capabilities surface
- Local file logging for debugging

## Runtime Data Directories

- **SQLite database**: Stored in the Tauri app data directory (`app_data_dir`). On macOS: `~/Library/Application Support/com.agentlabs.desktop/agent-labs.db`
- **Log files**: Stored in the Tauri app log directory (`app_log_dir`). On macOS: `~/Library/Logs/com.agentlabs.desktop/agent-labs.log`

## Environment Variables

Copy `.env.example` to `.env` and configure as needed:
- `VITE_DEV_SERVER_PORT` - Development server port (default: 5173)
- `LOG_LEVEL` - Logging level (info, warn, error)

## Quality Baseline

Before considering a change complete, run the quality checks for the layer you modified.

### Renderer (TypeScript / React)

```bash
pnpm run quality
```

This runs three checks in sequence:
- **Type-check**: `pnpm run check` — `tsc --noEmit`
- **Lint**: `pnpm run lint` — `eslint .`
- **Tests**: `pnpm run test` — `vitest run`

You can also run each check individually.

### Native Host (Rust)

Run from the repository root:

```bash
pnpm run quality:rust
```

This runs three checks in sequence:
- **Format**: `cargo fmt --check`
- **Clippy**: `cargo clippy -- -D warnings`
- **Tests**: `cargo test`

Or run each individually: `pnpm run check:rust:fmt`, `pnpm run check:rust:clippy`, `pnpm run check:rust:test`.

### Quality Gate Rule

A change is not considered complete if it breaks any of these baseline checks. Both renderer and native host checks must pass independently — failures in one layer do not excuse the other.