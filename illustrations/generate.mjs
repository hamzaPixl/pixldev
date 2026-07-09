#!/usr/bin/env node
// Generate Pixl illustrations from the manifest via OpenRouter, following the
// feen-generation pipeline (chat/completions with image modality).
//
// Usage:
//   export OPENROUTER_API_KEY=sk-or-...
//   node illustrations/generate.mjs            # generate all missing
//   node illustrations/generate.mjs feen bumpi # only these ids
//   FORCE=1 node illustrations/generate.mjs    # regenerate even if present
//
// Output: public/illustrations/<kind>/<id>.jpg
// Wire-up: blog posts read `image:` in frontmatter; product panels + OG read
// the same path. See README.md.

import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  illustrations,
  buildPrompt,
  outPath,
  MODEL,
  MODEL_FALLBACK,
} from "./manifest.mjs";

const KEY = process.env.OPENROUTER_API_KEY;
if (!KEY) {
  console.error("Set OPENROUTER_API_KEY (see feen-api/.env).");
  process.exit(1);
}

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const only = process.argv.slice(2);
const force = process.env.FORCE === "1";

async function genOne(spec, model) {
  const prompt = buildPrompt(spec);
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://pixldev.be",
      "X-Title": "Pixl illustration gen",
    },
    body: JSON.stringify({
      model,
      modalities: ["image", "text"],
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`${model} → HTTP ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const msg = data.choices?.[0]?.message ?? {};
  const url = msg.images?.[0]?.image_url?.url;
  if (!url) return null;
  const b64 = url.split(",", 2)[1];
  return Buffer.from(b64, "base64");
}

async function main() {
  const specs = illustrations.filter((s) => !only.length || only.includes(s.id));
  let done = 0;
  for (const spec of specs) {
    const rel = outPath(spec);
    const abs = join(PUBLIC, rel);
    if (existsSync(abs) && !force) {
      console.log(`skip  ${rel} (exists; FORCE=1 to redo)`);
      continue;
    }
    mkdirSync(dirname(abs), { recursive: true });
    try {
      let buf = await genOne(spec, MODEL);
      if (!buf) {
        console.log(`…retry ${spec.id} on ${MODEL_FALLBACK}`);
        buf = await genOne(spec, MODEL_FALLBACK);
      }
      if (!buf) {
        console.error(`FAIL  ${spec.id}: no image returned`);
        continue;
      }
      writeFileSync(abs, buf);
      console.log(`OK    ${rel} (${Math.round(buf.length / 1024)} KB)`);
      done++;
    } catch (e) {
      console.error(`FAIL  ${spec.id}: ${e.message}`);
    }
  }
  console.log(`\nGenerated ${done}/${specs.length}. Then set the paths (see README).`);
}

main();
