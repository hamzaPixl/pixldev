# Pixl — Overnight work plan & marketing roadmap

_Owner: Hamza. Author: agent session 2026-07-09 (nap run). Everything stays **local** on `master`. No push until you say so._

This doc is the "define all the tasks first" deliverable. It is the source of truth for the nap run and the wake-up handoff to the **pixl-marketing** repo (the skills repo, not the post-generator).

---

## 0. Where we are (done this session)

- SEO/i18n: path-based `/fr` `/nl`, hreflang, FAQ + FAQPage schema, localized sitemap (static date), llms.txt, robots AI-allowlist.
- Design: full-screen horizon hero + real scroll parallax, island navbar, product bento, GenLabs footer, Linear theme, fail-visible reveals, grain-blink fix.
- Illustrations: 17 recognizable-subject images (blog + products + article heroes) from one manifest, wired into cards/heroes/bento/product headers/OG. Author photo on bylines.
- Blog: **13 posts** now (11 rewritten in Hamza's voice EN/FR/NL, 0 em-dashes; 2 new: `seo-is-a-graph`, `storyboard-to-generated-video`).
- Video: v0 clip assembled from the storyboard (`public/video/pixl-spot.mp4`) — to be redone with the real method (see Phase 1.4).

Local commits ahead of origin: several. **Not pushed.**

---

## 1. Phase 1 — Finalize the blog (FIRST)

- [ ] **1.1 Build + wire the 2 new posts.** `seo-is-a-graph` and `storyboard-to-generated-video` (EN/FR/NL done). Run `blog:build`, confirm 13 posts, build green.
- [ ] **1.2 Storyboard/video component.** Add `StoryboardExample` (5 frames filmstrip + the clip) as a slug-gated section on the video post, matching the existing diagram-section pattern.
- [ ] **1.3 AI-slop removal pass.** Re-read all 13 posts (EN + spot-check FR/NL): kill any remaining hype words, generic "AI" filler, academic connectors, stray em-dashes; confirm one dry joke each, first person, `→` lists, compressed closings. Confirm every post has a generated hero image and the **same template** (frontmatter shape, italic standfirst, heading rhythm).
- [ ] **1.4 Redo the video the RIGHT way (Hamza's method).** Per your Feen-Generation/Bumpi approach: brief → simple timeline (**problem → solution → us/brand**) → images generated via OpenRouter (same house style) → optional **generated voice-over** (script written in your voice) → assembled clip, no music for now. Rebuild the example spot on that structure (not the abstract montage). Style: emotional, no talking heads, VO-driven, cinematic, first-frame-decides-everything (Arcads mechanic). _Waiting on the video-method research agent before final build._

## 2. Phase 2 — Full SEO / GEO audit + site health

Anchor: your own `pixl-seo/config/seo_rules.yaml` thresholds + the `feen/01-landing-audit.md` scorecard format.

- [ ] **2.1 Scorecard audit** (letter grades + composite /10): crawl/robots, schema coverage, GEO/llms.txt, i18n/hreflang, meta titles (30–60), descriptions (120–160 + CTA), H1 (30–70, primary keyword), H2 (3–7), keyword density (1–3%), readability (grade 8), OG (1200×630 + og:locale en_BE/fr_BE/nl_BE).
- [ ] **2.2 Per-page + per-post word/keyword review.** Titles as `{Brand} | {Value}` where it fits; unique descriptions; keyword silos by value×intent (NL not an afterthought).
- [ ] **2.3 GEO.** Compare our `llms.txt` to the mature `feen-landing` one; add FAQ coverage + citability where useful.
- [ ] **2.4 Site health.** `next build` clean (0 errors), all routes 200, 404 correct, no broken links/images, sitemap correct, Lighthouse-ish sanity (image weights already 120–290 KB). Confirm **fast** and **complete**.
- [ ] **2.5 Fixes** applied and committed locally.

## 3. Phase 3 — 5 new blog drafts (for your validation)

Write full drafts (EN + FR/NL) with chosen illustrations, so you approve on waking. Proposed subjects (pick/kill/reorder):

1. **The Honest Changelog** — what I shipped, what I faked, what broke, across the fleet. _Angle: radical build-in-public honesty (your brand). Proof: real states (gateway cost=0, ~20% agent-callable). Reader: founders/engineers who distrust polished demos._
2. **Why I Don't Let Agents Touch Money (Yet)** — the budget/ledger/gateway problem. _Angle: a problem I hit head-on. Proof: the "believes everything is free" gap. Reader: anyone shipping agents._
3. **One File for Every Image, Then Video, Then Voice** — the generation system as it grows from images → video → VO. _Angle: the system series continues. Proof: this site + the spot. Reader: builders/marketers._
4. **I Gave My Brand a Number** — measuring identity instead of guessing it (Bumpi's "measured, not guessed"). _Angle: brand-as-data. Proof: pixel-sampled colors, scored. Reader: founders/marketers._
5. **The Solo Founder's AI Org Chart** — running a multi-product studio as one person with agents as employees. _Angle: org-chart-as-database, extends "The Company Is an API Call". Proof: identity rows, budgets, audit trail. Reader: solo/small founders._

_Alt bench: "GEO: how to get cited by ChatGPT (and how to check)"; "2 years of Belgian SME software taught me X about AI"._

## 4. Phase 4 — Social posts + map (per article)

- [ ] For **every** published/drafted post: a mini **LinkedIn** post (EN + FR) and **X/Twitter** variant, in your `gtm-posts` register (visual-first, one-line promise, `→` steps, one caveat, link in first comment, "comment X for access" where it fits). No invented metrics.
- [ ] Save to `docs/marketing/social-posts.md` with a **map**: article slug → URL → LinkedIn(EN/FR) → X(EN/FR) → suggested visual (hero image or the spot).

## 5. Phase 5 — Wake-up handoff: the Pixl persona & marketing-repo (pixl-marketing skills)

_This is the end goal. Do AFTER the site tasks. Detailed plan lives in `docs/marketing/PERSONA-PLAN.md` (to be written this run)._

- Enhance the **pixl-marketing** repo (the skills repo) from everything learned this session: update `pixl-copywriter-persona` (encode the humor + diagram habit + the em-dash ban that were under-coded), align `pixl-seo-content` with the GEO/graph approach, add an **illustration/house-style** skill and a **video-storyboard** skill (the manifest → image → video → VO method).
- Build the **Hamza persona** for social: an avatar, an artistic direction, a vision, and a content system (video + generated voice + subtitles + blogs), all in your voice.

---

## Decisions / assumptions (flag if wrong)

- LinkedIn task: dropped per your call ("ignore").
- Motion stack: Framer Motion + real video hero approved (workstream C) — deferred until after content.
- Video VO: no music for now (your call). VO can be drafted with a local/free TTS as a v0; premium voice when a credited tool is available. **Higgsfield = 0 credits (free plan)**, so no model-generated motion right now — the example clip is assembled from generated keyframes with camera moves, and the post says so honestly. True per-shot AI motion is queued for when video credits exist.
- Everything local, no push, until you approve.

## Constraints

- No push. No invented metrics. Never present planned/dormant as live (brand.md honesty rule).
- Keep the same blog template and the recognizable-subject illustration style across everything.
