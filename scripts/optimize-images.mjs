/**
 * Resize + convert public/work/*.{png,jpg} to WebP.
 *
 * The originals were 13.2 MB of full-resolution PNGs, every one of them
 * rendered into a card no wider than ~420 CSS px. This gets them to
 * roughly 1 MB total.
 *
 *   npm run optimize:images
 *
 * Idempotent: skips any file whose .webp is already newer than the source.
 */
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIRS = [
  { dir: "public/work", width: 1200, quality: 78 },
  { dir: "public/hero", width: 1400, quality: 82 },
];

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

async function newerThan(a, b) {
  try {
    const [sa, sb] = await Promise.all([stat(a), stat(b)]);
    return sa.mtimeMs > sb.mtimeMs;
  } catch {
    return false;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;

for (const { dir, width, quality } of DIRS) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    console.log(`  (no ${dir}, skipping)`);
    continue;
  }
  await mkdir(dir, { recursive: true });

  for (const file of entries) {
    const ext = path.extname(file).toLowerCase();
    if (!SOURCE_EXT.has(ext)) continue;

    const src = path.join(dir, file);
    const out = path.join(dir, `${path.basename(file, ext)}.webp`);

    if (await newerThan(out, src)) {
      skipped += 1;
      continue;
    }

    const before = (await stat(src)).size;
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(out);
    const after = (await stat(out)).size;

    totalBefore += before;
    totalAfter += after;
    converted += 1;

    const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
    const pct = (((before - after) / before) * 100).toFixed(0);
    console.log(`  ${file.padEnd(22)} ${kb(before).padStart(9)} → ${kb(after).padStart(8)}  (-${pct}%)`);
  }
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
console.log(
  `\n${converted} converted, ${skipped} already current.` +
    (converted ? `  ${mb(totalBefore)} → ${mb(totalAfter)}` : "")
);
