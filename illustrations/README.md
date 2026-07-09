# Pixl Illustrations

One house style for every visual on the site — blog heroes, product panels, and
OG cards — so nothing looks stocky or off-brand. This folder is the **spec + the
generator**; `public/brand.md` §7 is the art direction it implements.

## The look

Cinematic, editorial, abstract. Near-black canvas, **one** accent light source
with soft bloom and horizontal motion-blur light trails, film grain and a faint
pixel grid, generous negative space. Reference feel: motion-blur portraits,
neon light trails, high-contrast profiles — premium and engineered, never a
gradient blob or an "AI brain".

## Files

- `manifest.mjs` — the block. One spec per illustration: `id`, `kind`
  (`blog` / `product` / `hero`), `accent` hex, `aspect`, a one-line `concept`,
  and `tags`. `STYLE_BASE` is the shared house-style suffix; `buildPrompt()`
  composes `concept + STYLE_BASE` with the accent injected. Edit specs here.
- `generate.mjs` — runs the manifest through OpenRouter (same pipeline as
  `feen-generation`: `chat/completions`, `modalities:["image","text"]`,
  `google/gemini-3-pro-image`, fallback `gemini-2.5-flash-image`).

## Generate

```bash
export OPENROUTER_API_KEY=$(grep '^OPENROUTER_API_KEY=' ../feen-api/.env | cut -d= -f2-)
node illustrations/generate.mjs              # all missing
node illustrations/generate.mjs feen bumpi   # only these
FORCE=1 node illustrations/generate.mjs       # redo existing
```

Outputs to `public/illustrations/<kind>/<id>.jpg`.

**Aspect trick** (from feen-generation): Nano Banana ignores aspect hints in
text. To force a ratio, send a blank canvas of that size as an input image and
the output matches it. `gemini-3-pro-image` respects the prompt better; if
ratios drift, add the canvas step in `generate.mjs`.

## Wire the generated images in

- **Blog post** — add `image: "/illustrations/blog/<slug>.jpg"` to the post's
  `en.md` frontmatter, then `npm run blog:build`. It fills the card, the post
  hero, and the OG panel automatically.
- **Product** — pass the path to the product panel + OG (`?image=`). (Product
  wiring is a small follow-up once the images exist.)
- **OG** — any page already accepts `/og?...&image=<url>`; without it, the OG
  falls back to the green hero horizon.

## Next: the build-in-public article

This whole flow (spec → OpenRouter → wired-in) is itself a post: "How every
image on this site is generated from one manifest." Draft lives with the other
vision posts once the first batch is generated and we have real before/after
frames.
