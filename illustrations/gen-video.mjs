#!/usr/bin/env node
// Image→video via OpenRouter /videos, following feen-generation/launch_i2v.py.
// Each shot: its keyframe as first_frame + a motion prompt + the style lock.
//   export OPENROUTER_API_KEY=sk-or-...
//   node illustrations/gen-video.mjs <shotId...>   # e.g. spot-02-horizon
// Output: public/video/shots/<shotId>.mp4
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) { console.error("Set OPENROUTER_API_KEY"); process.exit(1); }

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUB = join(ROOT, "public");
const OUT = join(PUB, "video", "shots");
mkdirSync(OUT, { recursive: true });

const BASE = "https://openrouter.ai/api/v1";
const MODEL = process.env.VIDEO_MODEL || "bytedance/seedance-2.0-fast";
const STYLE =
  " Near-black background, one green light source, subtle motion, film grain, cinematic. No on-screen text, no captions, no watermark.";

// Per-shot motion direction (camera + subject), scoped small so it can't wander.
const MOTION = {
  "spot-01-command": "The finger presses the glowing green key down; the key light pulses brighter; a slow push-in.",
  "spot-02-horizon": "The green horizon line brightens and blooms; a slow, subtle drift upward; light trails settle.",
  "spot-03-assemble": "The blocks of green light drift and snap into place, assembling; gentle parallax.",
  "spot-04-core": "The green core pulses slowly; a slow dolly forward down the dark engine room.",
  "spot-05-logo": "The green pixels resolve inward into the crisp mark; a soft settle, slight glow breathing.",
};

function dataUri(p) {
  const b = readFileSync(p);
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

async function api(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pixldev.be",
      "X-Title": "Pixl spot",
      ...(opts.headers || {}),
    },
  });
  return res;
}

async function genShot(shotId) {
  const keyframe = join(PUB, "illustrations", "storyboard", `${shotId}.jpg`);
  if (!existsSync(keyframe)) throw new Error(`missing keyframe ${keyframe}`);
  const body = {
    model: MODEL,
    prompt: (MOTION[shotId] || "Subtle cinematic motion.") + STYLE,
    duration: Number(process.env.DUR || 5),
    aspect_ratio: "16:9",
    frame_images: [{ type: "image_url", image_url: { url: dataUri(keyframe) }, frame_type: "first_frame" }],
  };
  const res = await api("/videos", { method: "POST", body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`POST /videos ${res.status}: ${(await res.text()).slice(0, 400)}`);
  const job = await res.json();
  const id = job.id;
  const pollUrl = job.polling_url ? job.polling_url.replace(BASE, "") : `/videos/${id}`;
  process.stdout.write(`  ${shotId}: job ${id} `);
  // poll
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 8000));
    const pr = await api(pollUrl);
    if (!pr.ok) { process.stdout.write("!"); continue; }
    const st = await pr.json();
    if (st.status === "completed" || st.status === "succeeded") {
      const url = (st.unsigned_urls && st.unsigned_urls[0]) || (st.output && st.output[0]) || st.url;
      if (!url) throw new Error(`no url in ${JSON.stringify(st).slice(0, 300)}`);
      const dl = await fetch(url, { headers: { Authorization: `Bearer ${KEY}` } });
      const buf = Buffer.from(await dl.arrayBuffer());
      const out = join(OUT, `${shotId}.mp4`);
      writeFileSync(out, buf);
      console.log(`OK -> ${out} (${Math.round(buf.length / 1024)} KB)`);
      return;
    }
    if (st.status === "failed" || st.error) throw new Error(`failed: ${JSON.stringify(st).slice(0, 300)}`);
    process.stdout.write(".");
  }
  throw new Error("timeout");
}

const shots = process.argv.slice(2);
for (const s of shots) {
  try { await genShot(s); } catch (e) { console.error(`\nFAIL ${s}: ${e.message}`); }
}
