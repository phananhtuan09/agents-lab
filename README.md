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