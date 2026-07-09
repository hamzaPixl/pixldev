# Pixl spot — "One Command" (brief + storyboard + VO)

_Method: your Feen/`feen-generation` pipeline. VO-first, deadpan, no on-screen text, no music for now. Style-suffix lock on every shot (near-black, one green light, motion blur, film grain). ~18s, 5 shots. Assembled locked to the VO in ffmpeg._

## Brief

- **Subject:** Pixl, the company factory. The vision from "The Company Is an API Call."
- **Problem:** a founder rebuilding the same five things (brand, identity, billing) over and over.
- **Solution:** one command provisions a company; agents build the rest.
- **Us:** "The company is an API call. The rest is operations." → the mark.
- **Tone:** dry, calm, a little grand. One documentary narrator. Nobody on screen speaks.
- **Hook rule:** an unanswered tension in the first line. No "In this video".

## Storyboard (Time | On screen, no dialogue | VO beat)

| Time | On screen | VO |
|---|---|---|
| 0–4s | Shot 1 `spot-01-command` — a finger on one glowing green key, terminal cursor blinking | "Two years. The same five things, rebuilt from scratch." [pause] |
| 4–7s | Shot 2 `spot-02-horizon` — a green horizon line igniting across the dark | "Then, one command. Create a company." |
| 7–12s | Shot 3 `spot-03-assemble` — brand, site, invoice assembling from green light | "Brand. Site. Billing. It builds itself." [pause] |
| 12–15s | Shot 4 `spot-04-core` — one green core in a vast dark engine room | "One system underneath. Every euro accounted for." |
| 15–18s | Shot 5 `spot-05-logo` — the mark resolving out of green pixels | "The company is an API call. [pause] The rest is operations." |

## VO script (TTS-ready — 12–16 words/line, one breath per line)

```
Two years. The same five things, rebuilt from scratch.
[pause]
Then, one command. Create a company.
Brand. Site. Billing. It builds itself.
[pause]
One system underneath. Every euro accounted for.
The company is an API call.
[long pause]
The rest is operations.
```

- Voice: OpenRouter `/audio/speech`, Gemini TTS, voice "Charon" (calm, low). Fallback: local Kokoro / macOS `say`.
- No music this pass (your call). Later: a low end-sting resolving on "operations."

## Generation recipe (same OpenRouter key as feen-generation)

- **Keyframes:** already generated via the manifest (`illustrations/storyboard/spot-0X-*.jpg`), style-suffix lock.
- **Motion:** `POST https://openrouter.ai/api/v1/videos` per shot: `{ model, prompt + STYLE, duration, aspect_ratio:"16:9", frame_images:[{ ...keyframe as data-uri, frame_type:"first_frame" }] }` → poll `polling_url` → download `unsigned_urls[0]` WITH the `Authorization: Bearer` header. Model: `bytedance/seedance-2.0-fast` (no humans in these shots) or `kwaivgi/kling-v3.0-std`.
- **Assembly:** ffmpeg — concat the shot clips (xfade), then mux the VO on top, trim to the VO length. `export LC_ALL=C` so awk uses '.' decimals.

## Honest state

The keyframes are generated and reliable. The motion + VO pass is model-generated via OpenRouter (costs credits). If a shot's motion drifts, the storyboard is the leash: regenerate that one shot, not the film. No stock, no fake footage.
