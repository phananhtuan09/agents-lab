# Theme Foundation

## Selected Theme
- Name: `Signal Noir`
- Personality: dark, precise, cinematic, future-agent without neon overload
- Direction: mostly graphite surfaces, restrained cobalt base, violet reserved as accent energy

## Core Palette
| Token | Hex |
| --- | --- |
| `neutral-950` | `#070B14` |
| `neutral-900` | `#0F1422` |
| `neutral-800` | `#1B2233` |
| `neutral-700` | `#30384B` |
| `neutral-600` | `#465166` |
| `neutral-500` | `#5D6A82` |
| `neutral-400` | `#7886A0` |
| `neutral-300` | `#A5B3CB` |
| `neutral-200` | `#CDD7E8` |
| `neutral-100` | `#E9EEF7` |
| `neutral-50` | `#F5F7FB` |
| `primary-600` | `#2F4ED1` |
| `primary-500` | `#3E63F5` |
| `primary-400` | `#5C7DFF` |
| `accent-600` | `#5E31C4` |
| `accent-500` | `#7742F0` |
| `accent-400` | `#9468FF` |

## Semantic Colors
| Role | Light | Dark |
| --- | --- | --- |
| `success` | `#1FA971` | `#34D399` |
| `warning` | `#D18A18` | `#F5B942` |
| `error` | `#D1435B` | `#FF6B81` |
| `info` | `#2F4ED1` | `#5C7DFF` |

## Dark Mode Roles
| Role | Hex |
| --- | --- |
| Page background | `#070B14` |
| Surface | `#0F1422` |
| Elevated surface | `#151D2E` |
| Hairline border | `#30384B` |
| Interactive border | `#5D6A82` |
| Body text | `#CDD7E8` |
| Heading text | `#F5F7FB` |
| Muted text | `#7886A0` |
| Primary action | `#3E63F5` |
| Accent highlight | `#7742F0` |

## Gradients
- App background: `linear-gradient(135deg, #070B14 0%, #10182A 46%, #1A1638 100%)`
- Accent stroke: `linear-gradient(90deg, #3E63F5 0%, #7742F0 100%)`
- Glow usage: hero panels, active charts, focus halo only; not full-page fills and not default button backgrounds

## Typography
- Heading: `Space Grotesk`, weights `500/700`, line-height `1.05-1.15`
- Body: `IBM Plex Sans`, weights `400/500/600`, line-height `1.55`
- Data and code: `IBM Plex Mono`, weight `500`
- Type scale: `14 / 16 / 18 / 24 / 32 / 48 / 64`

## Spacing And Shape
- Base unit: `4`
- Scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96`
- Radius: cards `18px`, inputs `14px`, pill actions `999px`
- Shadows: soft depth with cool tint, avoid large blurred neon shadows

## Component Rules
- Primary buttons use solid `primary-500`; reserve gradient fills for hero CTA or selected tabs only.
- Panels should feel layered: dark surface, subtle top-left highlight, thin border, optional noise texture.
- Use violet as a controlled accent for status, chart peaks, active markers, and focus states.
- Tables, logs, and agent activity views should lean on `IBM Plex Mono` labels and high text contrast.
- Background visuals should prefer grid lines, scanlines, and faint radial blooms over random glassmorphism.

## Contrast Checks
- `neutral-200` on `neutral-950`: `13.57:1`
- `neutral-50` on `neutral-950`: `18.35:1`
- `#FFFFFF` on `primary-500`: `4.87:1`
- `primary-600` on `#FFFFFF`: `6.71:1`
- `neutral-400` on `neutral-900`: `5.00:1`

## Tailwind Token Map
```css
:root {
  --bg-canvas: #070B14;
  --bg-surface: #0F1422;
  --bg-elevated: #151D2E;
  --border-subtle: #30384B;
  --border-strong: #5D6A82;
  --text-main: #CDD7E8;
  --text-muted: #7886A0;
  --text-heading: #F5F7FB;
  --brand-primary: #3E63F5;
  --brand-primary-strong: #2F4ED1;
  --brand-accent: #7742F0;
  --brand-accent-soft: #9468FF;
}
```

## Usage Rules
- Default to solid surfaces first; add glow only when it communicates state or hierarchy.
- Keep layouts dark and quiet so charts, commands, and agent status indicators carry the energy.
- Avoid the usual purple-on-white AI look; the project should feel like a control room, not a marketing template.
