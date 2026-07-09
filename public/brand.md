# Pixl — Brand & Design System
# https://pixldev.be/brand.md
# The single source of truth for Pixl's visual identity, voice, and the art
# direction for generated visuals (OG cards, blog & product illustrations).
# Reuse this file anywhere a tool or agent needs to render "on-brand" output.

## 1. Who Pixl is
Pixl (Pixl SRL) is a Belgian AI studio building interconnected business tools
for SMEs, freelancers, and accountants — and writing openly about the AI systems
behind them. The visual identity is **engineered, calm, confident**: a near-black
canvas, one confident green, hairline structure, and a quiet nod to its pixel /
terminal heritage. Never neon, never noisy, never "AI slop."

Thesis line (use as a signature): **Models are not the product. Systems are.**

## 2. Core palette (dark-first)
| Token | Hex | Use |
|---|---|---|
| Background | `#08090A` | Page canvas (near-black) |
| Card | `#0F1011` | Panels, cards |
| Elevated | `#17181B` | Hover / raised surfaces |
| Foreground | `#F7F8F8` | Primary text |
| Muted foreground | `#8A8F98` | Secondary text, captions |
| Border (hairline) | `rgba(255,255,255,0.08)` | 1px separators, card edges |
| **Primary (Pixl Green)** | `#30CB77` | The one brand accent — CTAs, highlights, the horizon |
| Primary foreground | `#04160C` | Text on green fills |
| Gold | `#F0B84E` | Rare secondary accent (featured / attention) |

**Rules:** exactly one green. Green is a *confident* emerald, not `#00FF00`. No
glows, blurs on text, or gradients on type. Structure comes from hairline borders
and an 8px corner radius, not heavy shadows.

## 3. Per-product accents
Each product keeps Pixl's dark system but carries one hue. Feen uses its real
brand kit; the rest get a distinct tint until their own brands land.

| Product | Primary | Light accent | Notes |
|---|---|---|---|
| **Feen** | `#0426A8` (Feen Blue) | `#8FA5FF` | Lime `#B0F90E` as fill only, never text |
| **Company Data** | `#22D3EE` cyan | `#67E8F9` | |
| **Bumpi** | `#A78BFA` violet | `#C4B5FD` | |
| **Syncco** | `#34D399` emerald | `#6EE7B7` | |
| **Pixl Web** | `#F472B6` pink | `#F9A8D4` | |
| **Pixl Branding** | `#FBBF24` amber | `#FCD34D` | |

## 4. Typography
- **Display** — Space Grotesk, 600, tight tracking (`-0.02em`). Headlines, product names.
- **Body** — Inter, 400–500. Paragraphs, UI.
- **Mono** — JetBrains Mono. Eyebrows, labels, dates, code, the terminal cursor `_`.
- Eyebrows: mono, uppercase, `0.12em` tracking, preceded by a 8px green square.

## 5. Motifs (the recognizable Pixl details)
- **Green horizon** — a single bright green light-curve over black (the hero). The
  hero image is the reference; keep its "dawn over a dark planet" energy.
- **Dot grid** — faint 32px radial-dot texture on dark panels.
- **Pixel dissolve** — a fine 6px grid that thickens at the edges, as if the image
  resolves from pixels. The literal nod to "Pixl."
- **Terminal cursor** — a blinking green `_` after key headlines.
- **Glass** — floating elements (island nav, badges) use `backdrop-blur` over
  `white/10` with a `white/15` hairline ring.
- **Hairlines & 8px radius** — the structural grammar everywhere.

## 6. Voice
Pragmatic, builder-first, systems-minded, concrete, honest about current state.
Short sentences. Name the constraint. Prefer proof (numbers, architecture,
deployments) over adjectives. First person is allowed for founder notes.
Avoid: hype ("revolutionary", "seamless", "game-changing"), vague AI claims,
feature lists without a workflow, and — in prose — the em-dash tic.
Honesty rule: never present a planned/dormant/archived thing as live.

## 7. Art direction for generated visuals (OG cards, illustrations)
Everything generated should look like it came from the same studio. The spec and
generator live in `illustrations/` (manifest + OpenRouter pipeline); this is the
direction they implement.

**Reference feel:** cinematic editorial — motion-blur portraits, neon light
trails on dark slate, high-contrast profiles. Abstract and conceptual, premium,
photographic light. Never a gradient blob, never an "AI brain" or robot.

**Shared recipe**
- Canvas: near-black `#08090A`. Deep, matte, lots of negative space.
- Light: one accent light source (green `#30CB77` by default), soft bloom, with
  horizontal motion-blur light trails crossing the frame. Product visuals tint
  the light with that product's hue.
- Texture: subtle film grain + a faint pixel/dot grid. Never glossy or stocky.
- Mood: engineered, quiet, premium. "Instrument panel at night."
- Type on visuals: Space Grotesk display in `#F7F8F8`, mono eyebrow in the accent.

**OG / social cards (1200×630)**
- Left-aligned: mono eyebrow (category), then a large display title, then the
  Pixl wordmark or a small green square mark bottom-left.
- Background: dark with a single green horizon arc bleeding from the right or
  bottom-right corner. For product OG, swap green for that product's hue.
- Keep it readable at small sizes: high contrast, ≤ 2 lines of title.

**Blog illustrations (≈16:9)**
- Abstract, conceptual, matching the post's idea (e.g. a baton = a small object
  passed along a line of light). Dark, one accent colour, pixel/grain texture.

**Product illustrations**
- One per module, in that module's accent hue, sitting in the bento illustration
  slot. Abstract product metaphor over black, same grain + grid treatment.

## 8. Don'ts
No pure neon green. No multi-colour gradients on text. No drop shadows on type.
No emoji in product UI. No stock "AI" clichés (brains, circuits, humanoid robots).
No claiming unbuilt features. One accent per surface.
