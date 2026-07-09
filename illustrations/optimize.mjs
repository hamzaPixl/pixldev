#!/usr/bin/env node
// Downscale + recompress generated illustrations for the web. The model returns
// ~1.4 MB 1408px frames; the site never shows them wider than ~800px, so cap at
// 1600px (retina headroom) and recompress. Rewrites the files in place.
//
//   node illustrations/optimize.mjs            # all under public/illustrations
//   node illustrations/optimize.mjs blog/foo.jpg
//
// Requires `sharp` if present; falls back to macOS `sips`.
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "public", "illustrations");
const MAXW = 1600;

function walk(d) {
  const out = [];
  for (const name of readdirSync(d)) {
    const p = join(d, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (extname(p).toLowerCase() === ".jpg") out.push(p);
  }
  return out;
}

const only = process.argv.slice(2);
const files = only.length
  ? only.map((r) => join(DIR, r))
  : walk(DIR);

for (const f of files) {
  const before = statSync(f).size;
  // sips: resize to max width and re-encode JPEG at ~72% quality.
  execFileSync("sips", [
    "-Z", String(MAXW),
    "-s", "format", "jpeg",
    "-s", "formatOptions", "72",
    f, "--out", f,
  ]);
  const after = statSync(f).size;
  console.log(
    `${f.replace(ROOT + "/", "")}  ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB`
  );
}
