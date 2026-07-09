# Pixl / Hamza persona + marketing-repo plan (wake-up handoff)

_Goal: a founder persona that talks like you, with an avatar, an art direction, a vision, and a content system (blogs + illustrations + video + voice + subtitles) that runs on one OpenRouter key. Then fold everything back into the **pixl-marketing** skills repo. This doc is the plan to continue after your nap._

---

## What already exists (proven, reusable)

- **Illustration system** (this repo): `illustrations/manifest.mjs` + `generate.mjs` + `optimize.mjs`. One spec per image, a shared `STYLE_BASE` (style-suffix lock). 24 on-brand images shipped. This is your validated consistency method: **style-suffix lock, render each beat independently, no image reference.**
- **Video system** (proven THIS session): `illustrations/gen-video.mjs` calls OpenRouter `POST /videos` (image→video, `bytedance/seedance-2.0-fast` / `kwaivgi/kling-v3.0-std`) with a keyframe as `first_frame`. `illustrations/assemble-spot.sh` beat-times the shots and muxes a VO in ffmpeg. First real clip generated and assembled into a 5-shot Pixl spot. **Same OpenRouter key as feen-generation.**
- **Voice-over**: v0 via local macOS `say` (documentary voice), TTS-ready script format (12–16 words/line, `[pause]`). Upgrade path: OpenRouter Gemini TTS `/audio/speech` (voice "Charon"), then ElevenLabs v3 for the real take.
- **The Feen method** (your canon): `feen/feen-ad-the-quiet-accountant-30s.md` (VO-first, deadpan, **problem → solution → us**, "every brand word = a hard cut", VO split by act). Templated across trades in `feen-generation/ad/launch_*.py`.
- **Bumpi** (slice-studio): a shipping on-brand content studio (brand measured from a URL, locked, injected into every generation; multi-format crops; MCP). Your "content generation system" in production.
- **Voice spec**: `marketing-crew/skills/pixl-copywriter-persona/SKILL.md` + `references/pixl-voice.md` + this repo's `brand.md §6`.
- **This session's output**: 13 posts rewritten in your voice (EN/FR/NL, 0 em-dashes), 2 new posts, 5 drafts (`docs/marketing/drafts/`), a full social pack (`docs/marketing/social-posts.md`), the storyboard method (`docs/marketing/pixl-spot-storyboard.md`).

## The gaps (what to build)

1. **No founder avatar / persona asset.** The character work so far is fictional ad characters (the accountant, the vigneron), not *you*. Need: a consistent Hamza avatar (identity-locked reference sheet) usable across shots, plus an art direction and a bio/positioning.
2. **No end-to-end assembler.** `yt-engine/ASSEMBLER.md` is a spec: no VO generation wired, nothing stitches images+clips+VO+captions+music into an mp4. This session proves the missing pieces (i2v + VO + ffmpeg mux) work; they need to be packaged as a skill.
3. **Subtitles** exist as capability (whisper word-timing used for the Feen "feen"-cuts) but aren't wired into a repeatable caption burn-in.
4. **The marketing-crew skills are under-coded**: the persona skill doesn't encode the humor, the diagram habit, or the em-dash ban we enforced this session; there's no illustration/house-style skill and no video-storyboard skill.

---

## Plan A — Enhance the pixl-marketing (skills) repo

_This is the repo that defines the skills, not the one that posts._

- [ ] **Update `pixl-copywriter-persona`**: encode what we learned — one dry joke per piece, the `→` list habit, the "share the shape not the blueprint" guardrail, and the **em-dash ban in prose** (already in brand.md, not in the skill). Add the two-register model (essay voice vs `gtm-posts` social voice) with examples.
- [ ] **Align `pixl-seo-content`** with the GEO / structured-data-graph approach (schema as a graph, llms.txt, "be cited by ChatGPT", the `seo_rules.yaml` thresholds).
- [ ] **New skill `pixl-illustration`**: the manifest → `STYLE_BASE` → OpenRouter image method, the recognizable-subject archetype system (portrait / hands+object / object / landscape / scene), the optimize step, the wiring (frontmatter → card/hero/OG). Seed from this repo's `illustrations/` + `brand.md §7`.
- [ ] **New skill `pixl-video-storyboard`**: the full method proven this session — brief → problem/solution/us timeline → keyframes (style-suffix lock) → OpenRouter i2v (`/videos`, first_frame) → VO (script cadence rules) → ffmpeg audio-locked assembly, no baked text. Seed from `pixl-spot-storyboard.md` + `gen-video.mjs` + `assemble-spot.sh`.
- [ ] Update `skills/ROUTING.md` and the orchestrator so a "make a spot" / "write + illustrate a post" request routes correctly.

## Plan B — Build the Hamza persona + content engine

- [ ] **Avatar**: generate an identity-locked Hamza reference sheet (6-panel character sheet idea from `pixelforge/references/ai-animation-pipeline.md`) from your real photo (`public/authors/hamza-mounir.jpg`), so shots stay on-face. Art direction = brand.md §5 motifs (green horizon, pixel-dissolve, terminal cursor) + the near-black one-green-light signature.
- [ ] **Voice**: lock one VO voice ID + settings; script cadence per `yt-engine/prompts/14-narration.md`. Draft with Kokoro/`say`, real take with ElevenLabs v3.
- [ ] **Content engine (one pipeline)**: topic → hook → script (blog + VO) → keyframes → i2v → VO → whisper captions → ffmpeg assembly → multi-format crops (9:16, 1:1, 4:5, 16:9) → social pack. Blogs, illustrations, and the video path are already working here; wire captions + crops + the assembler.
- [ ] **Distribution**: the `social-posts.md` format is the template (LinkedIn EN/FR + X, visual-first, link in first comment, no invented metrics, "comment X for access").

## Phased roadmap

1. **Now (this run):** site content finalized, one real spot, drafts + social pack + these plans. Local only.
2. **Next session (post-nap):** move to pixl-marketing repo — land Plan A skills (persona, illustration, video-storyboard, seo-content), seeded from this repo's proven scripts.
3. **Then:** Plan B — Hamza avatar + one-command content engine (blog + images + spot + VO + captions + crops), dogfding a first real founder post.

## Decisions / open questions for you

- Avatar: fully synthetic Hamza vs stylized mark vs your real footage + generated b-roll? (Recommend: real photo → identity-locked b-roll, keep it honest.)
- VO voice: your own voice cloned (ElevenLabs) vs a neutral documentary voice? (Recommend: a documentary voice for brand spots, your own for personal founder notes.)
- Music: you said none for now. Add a low end-sting later.
- Budget: OpenRouter video costs credits per clip (a 5-shot spot ≈ a few clips). Fine to keep using per your instruction; flag a ceiling if you want one.
