# Agent Context

## Structure
| Path | Purpose |
| --- | --- |
| `docs/ai/project` | Meta workflow docs inherited from agent-labs; not the app implementation guide |
| `.agents` | Shared skills, themes, and command helpers for local agents |
| `.claude` | Claude runtime settings and helper scripts |
| `.codex` | Codex runtime settings |
| `.pi` | Agent runtime metadata |

## Conventions
- Repo state: greenfield; no app source tree exists yet.
- Planned stack (user-defined): `Tauri 2`, `React`, `Vite`, `TypeScript`, `Tailwind CSS`, `Zustand`, `SQLite`, `pnpm`.
- Durable docs live in Markdown at repo root or under `docs/`.
- Application code conventions are not established yet; define them when scaffolding lands.

## Constraints
- Do not infer app architecture from `docs/ai/project`; those files describe agent workflow only.
- Keep solutions simple; optimize early only for security-critical and performance-sensitive paths.
- Ask only when ambiguity is blocking; batch questions into one block.
- Use Vietnamese for collaborator-facing discussion and English for code, commits, and comments.
- Before `/spec`, run a lightweight `Shape -> Recon -> Decide` pass.
- Keep styling token-driven so the Tailwind theme stays centralized and aligned with `docs/patterns/theme.md`.
- Current product direction is local-first desktop app; do not introduce auth, cloud sync, or remote backend unless a new spec explicitly requires them.
- Prefer `SQLite` for persistence and local file logging for runtime diagnostics in the current phase.

## Patterns
- Theme foundation -> `docs/patterns/theme.md`
- Desktop bootstrap -> `docs/ai/specs/platform-bootstrap-tauri-sqlite-desktop.md`
- Local data architecture -> `docs/ai/specs/desktop-local-data-architecture-sqlite.md`
- Runtime safety and logging -> `docs/ai/specs/desktop-runtime-safety-and-local-logging.md`
- Local quality baseline -> `docs/ai/specs/local-quality-baseline.md`
- Workflow meta docs -> `docs/ai/project/README.md`
