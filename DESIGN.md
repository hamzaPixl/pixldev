---
version: "1"
name: Pixl Signal System
description: A dark editorial identity where one green pixel becomes a frame, a signal, and a system.
colors:
  background: "#08090A"
  foreground: "#F7F8F8"
  primary: "#30CB77"
  primary-foreground: "#07140D"
  secondary: "#171A18"
  accent: "#153523"
  muted: "#8A918C"
  danger: "#E45757"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 10vw, 9rem)"
    fontWeight: 850
    lineHeight: 0.88
    letterSpacing: "-0.065em"
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
rounded:
  sm: "2px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
---

# Pixl Signal System

## Overview

Pixl is a Belgian AI studio for people who need working systems, not theatre. The visual character is precise, kinetic and quietly opinionated. A single pixel is the atomic unit. It expands into a conversation frame, a product surface and a connected operating system.

## Colors

The page is locked to a dark, green-tinted neutral system. Signal Green is the only structural accent and should occupy less than 10 percent of a composition. Foreground on background and primary foreground on Signal Green are intended to meet WCAG AA. Product colors may identify products inside product-specific material, but never compete with Signal Green on Pixl corporate surfaces.

## Typography

Brand surfaces use Archivo for display statements, system UI for body copy and JetBrains Mono only for concise measurements or file labels. Scale contrast should be strong: monumental display, readable body, compact technical metadata. The production site still uses Inter and Space Grotesk globally; brand surfaces intentionally avoid that default while a broader typography migration remains out of scope.

## Layout

Use a 12-column editorial layout with a maximum width of 1440px. Prefer asymmetric spans and intentional empty zones. Whitespace separates content, without decorative grid lines or repeated frames. Desktop gutters are 48-72px. Mobile gutters are 20px. Long copy stays below 68 characters per line.

## Elevation & Depth

Depth comes from surface lightness, overlap and whitespace, not diffuse shadows or hairline grids. Use background, secondary and elevated surfaces in three steps. Glow is reserved for a short motion beat around the central pixel, never for persistent decoration.

## Shapes

Small radii only. The pictogram owns the strongest shape language: stepped corners, a square center and a speech-frame tail. Functional icons remain Lucide. Custom geometry is reserved for the canonical Pixl mark and its lockups.

## Components

Navigation is compact and single-line. Primary buttons use Signal Green with dark text; secondary actions are text links or bordered controls when a visible interactive boundary is required. Specimens rely on spacing and surface contrast rather than decorative frames. Product cards must include default, hover, focus, active, loading, empty, error and disabled behavior when they become interactive.

## Motion

The canonical pictogram reveal lasts 6.4 seconds and starts only when the main stage is substantially visible. It is orchestrated with Motion for React: SVG `pathLength` drives one continuous pictogram route and a spring drives the child extraction. The center pixel blinks exactly three times, then remains fixed as the source point. A second pixel of exactly the same size extracts directly below it with no connector or intermediate effect. That same unit traces the complete pictogram path like a progress indicator, including the left stem and tail. There is no intermediate completed square and no particle emission. At the final lock, the completed route stays at full opacity while compatible SVG coordinates move only the stepped corners and tail into their canonical positions; there is no color or opacity crossfade. Signal Green and Signal White use the same component and timing. The public header and footer compose this finite pictogram motion with the static wordmark; GIF exports are 512 by 640 pixels, 20 fps and seven seconds long. Automatic logo motion runs once and exposes a replay control where appropriate. Reduced motion shows the completed static pictogram immediately.

## Voice & Content

Direct, specific and evidence-led. Use short declarative sentences. Buttons name the outcome. Avoid hype, filler verbs, generic AI claims and decorative technical jargon. Visible copy uses regular hyphens, never em dashes or en dashes.

## References

- Existing Pixl website tokens and logo assets: preserve the dark foundation, green signal and current wordmark.
- Local saoul.studio brand lab: borrow the durable architecture of canonical assets, motion specimens, channel templates and machine-readable rules. Do not borrow its cobalt, astronaut or Swiss frame identity.
- Editorial production manuals: borrow large type, measured captions and explicit usage constraints.

## Do's and Don'ts

Do:

- Let one green pixel explain the whole system.
- Show real downloadable assets and exact output sizes.
- Keep logo animation finite, replayable and reduced-motion safe.
- Use the pictogram alone only where Pixl is already identifiable.

Don't:

- Stretch, rotate, outline or recolor the mark arbitrarily.
- Add purple-blue gradients, glass cards or decorative glow fields.
- Repeat equal icon cards as the main page structure.
- Use the full wordmark below 72px wide.
- Treat the pictogram as a generic interface icon.

## Verification Viewports

- Mobile: 390px
- Tablet: 768px
- Desktop: 1440px
