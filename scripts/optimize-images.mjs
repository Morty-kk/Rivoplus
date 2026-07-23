// One-off / reusable image optimizer: converts heavy raster assets to WebP,
// resized to sane maximum dimensions for how they actually render on the site.
// Run: npm run optimize-images
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ASSETS = path.resolve("src/assets");

// per-file: max width the image is ever displayed at (with retina headroom) + quality
const TARGETS = [
  { file: "247_pic.png",           maxW: 800,  quality: 80 }, // product gallery image
  { file: "hero-bg.jpg",           maxW: 1920, quality: 72 }, // full-bleed dimmed hero bg
  { file: "canva_pic.png",         maxW: 700,  quality: 80 }, // product card
  { file: "canva_pic_ar.png",      maxW: 700,  quality: 80 },
  { file: "music_pic.png",         maxW: 700,  quality: 80 },
  { file: "music_pic_ar.png",      maxW: 700,  quality: 80 },
  { file: "mastercard_pm_pic.png", maxW: 400,  quality: 82 }, // payment badge (~48px tall on screen)
  { file: "visa_pm_pic.png",       maxW: 400,  quality: 82 },
  { file: "paypal_pm_pic.png",     maxW: 400,  quality: 82 },
];

const kb = (n) => (n / 1024).toFixed(1) + " KB";

let before = 0, after = 0;
for (const { file, maxW, quality } of TARGETS) {
  const src = path.join(ASSETS, file);
  const out = path.join(ASSETS, file.replace(/\.(png|jpe?g)$/i, ".webp"));
  const input = await readFile(src);
  const srcSize = input.length;
  const buf = await sharp(input)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();
  await writeFile(out, buf);
  before += srcSize;
  after += buf.length;
  console.log(
    `${file.padEnd(24)} ${kb(srcSize).padStart(10)}  ->  ${path
      .basename(out)
      .padEnd(24)} ${kb(buf.length).padStart(10)}  (-${(
      100 - (buf.length / srcSize) * 100
    ).toFixed(0)}%)`
  );
}
console.log("-".repeat(80));
console.log(`TOTAL  ${kb(before)}  ->  ${kb(after)}  (saved ${kb(before - after)})`);
