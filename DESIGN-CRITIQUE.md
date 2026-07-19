# Design Critique - `/brand`

## Scores

| Axis | Score | Rationale |
|---|---:|---|
| Typography | 8/10 | Archivo gives the page a distinct production-manual voice. The display-to-body contrast remains clear on 1440px and 390px renders. |
| Color | 9/10 | Signal Green is rationed consistently against three green-tinted dark surfaces. No generic gradients or mixed accent system appear. |
| Spacing | 8/10 | The page moves between monumental hero space, dense asset rows and medium-density specimen boards without losing the 4px rhythm. |
| Motion | 9/10 | The 6.4-second pictogram sequence has distinct three-blink, two-pixel extraction and one-unit path-progress beats, a full-opacity corner lock, replay, visibility gating and a reduced-motion fallback. |
| Interaction | 8/10 | Download actions, render links and replay control have visible hover and focus states with 44px targets. No affected form or destructive state exists. |
| Responsive | 9/10 | The 12-column attitude becomes a deliberate single-column mobile composition. Browser inspection found no horizontal overflow at 390px. |
| Originality | 9/10 | The stepped pictogram, severe scale contrast and restrained assembly sequence form a recognizably Pixl surface without relying on a generic technical grid. |
| Brand fidelity | 9/10 | The page extends the existing dark foundation and green signal while turning the pictogram into a reusable system asset. |
| **Average** | **8.6/10** | Strong and ready for local review, with the pictogram reveal now carrying the page's main brand moment. |

## AI Slop Test: PASS

No gradient text, glassmorphism, purple-blue palette, centered hero template, equal feature-card grid, pure black/white canvas, stock imagery, generic filler copy or em-dash characters were found in the scoped files.

## Top issues

1. **Resolved: finite motion policy drift.** The three mini specimens now use a single CSS iteration, matching `DESIGN.md`.
2. **P2: legacy green drift.** `public/Logo Color.svg` still uses the historical `#44b75e` instead of canonical Signal Green `#30CB77`.
3. **P2: broader site typography drift.** The brand page intentionally uses Archivo and system UI, while the existing global site still loads Inter and Space Grotesk. This is documented and remains outside this page scope.

## Prioritized fix list

### P0

None.

### P1

- [x] Make mini brand specimens finite and keep the replayable construction in the main motion stage.

### P2

- [ ] Align the color lockup SVG with Signal Green.
- [ ] Evaluate the global typography migration separately after the brand page is approved.

## Evidence

- Desktop: `.pixl/evidence/design/pixl-brand-desktop.png`, 1440 x 1000 viewport.
- Mobile: `.pixl/evidence/design/pixl-brand-mobile.png`, 390 x 844 viewport.
- Primary interaction: motion anchor plus replay control.
- Runtime: no browser console errors; all three page images loaded; no horizontal overflow.

## Recommendation

The motion system is ready for review. Align the legacy color-lockup SVG separately if that asset remains in use.
