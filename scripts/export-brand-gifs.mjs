import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const baseUrl = process.env.PIXL_EXPORT_URL ?? "http://localhost:3001";
const outputDir = path.resolve("public/brand");
const fps = 20;
const frameDuration = 1000 / fps;
const animationDuration = 7000;

await mkdir(outputDir, { recursive: true });

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

async function exportVariant(browser, variant) {
  const frameDir = await mkdtemp(path.join(tmpdir(), `pixl-${variant}-`));
  const page = await browser.newPage({ viewport: { width: 512, height: 640 }, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/brand/export?variant=${variant}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    document.querySelectorAll("nextjs-portal").forEach((portal) => portal.remove());
  });
  await page.click("[data-export-replay]", { force: true });

  const startedAt = Date.now();
  const frameCount = Math.ceil(animationDuration / frameDuration);
  for (let frame = 0; frame < frameCount; frame += 1) {
    const target = startedAt + frame * frameDuration;
    const remaining = target - Date.now();
    if (remaining > 0) await page.waitForTimeout(remaining);
    await page.screenshot({ path: path.join(frameDir, `frame-${String(frame).padStart(4, "0")}.png`) });
  }

  await page.close();
  const palette = path.join(frameDir, "palette.png");
  const output = path.join(outputDir, `pixl-pictogram-${variant}.gif`);
  const input = path.join(frameDir, "frame-%04d.png");
  await run("ffmpeg", ["-y", "-framerate", String(fps), "-i", input, "-vf", "palettegen=stats_mode=diff", palette]);
  await run("ffmpeg", ["-y", "-framerate", String(fps), "-i", input, "-i", palette, "-lavfi", "paletteuse=dither=sierra2_4a", "-loop", "0", output]);
  await rm(frameDir, { recursive: true, force: true });
  return output;
}

const browser = await chromium.launch();
try {
  for (const variant of ["green", "white"]) {
    const output = await exportVariant(browser, variant);
    console.log(`Exported ${output}`);
  }
} finally {
  await browser.close();
}
