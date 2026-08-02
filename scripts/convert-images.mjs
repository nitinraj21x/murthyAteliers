/**
 * convert-images.mjs
 * Converts oversized PNG/JPG banner images to WebP at capped quality.
 * Run once: node scripts/convert-images.mjs
 */
import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, '..', 'public');

const JOBS = [
  // Home banner — 2325 KB PNG → WebP, max 1920px wide
  {
    src:  path.join(pub, 'imgs', 'homeBanner.png'),
    dest: path.join(pub, 'imgs', 'homeBanner.webp'),
    width: 1920,
    quality: 80,
  },
  // Bgsec1 background — 2700 KB PNG, only used in philosophy section at low opacity
  {
    src:  path.join(pub, 'imgs', 'bgsec1.png'),
    dest: path.join(pub, 'imgs', 'bgsec1.webp'),
    width: 1600,
    quality: 70,
  },
  // Craft banner — 2263 KB JPG
  {
    src:  path.join(pub, 'imgs', 'bannerCraft.jpg'),
    dest: path.join(pub, 'imgs', 'bannerCraft.webp'),
    width: 1920,
    quality: 80,
  },
  // Heritage banner — 668 KB JPG
  {
    src:  path.join(pub, 'imgs', 'heriBanner.jpg'),
    dest: path.join(pub, 'imgs', 'heriBanner.webp'),
    width: 1920,
    quality: 80,
  },
  // collection1 — 1864 KB WebP → write as collection1-opt.webp
  {
    src:  path.join(pub, 'jewellry', 'Web-Optimised', 'collection1.webp'),
    dest: path.join(pub, 'jewellry', 'Web-Optimised', 'collection1-opt.webp'),
    width: 1400,
    quality: 78,
  },
  // heirStory — 1417 KB WebP (journal banner) → heirStory-opt.webp
  {
    src:  path.join(pub, 'jewellry', 'Web-Optimised', 'heirStory.webp'),
    dest: path.join(pub, 'jewellry', 'Web-Optimised', 'heirStory-opt.webp'),
    width: 1920,
    quality: 78,
  },
  // bannerCollection — 1097 KB WebP → bannerCollection-opt.webp
  {
    src:  path.join(pub, 'jewellry', 'Web-Optimised', 'bannerCollection.webp'),
    dest: path.join(pub, 'jewellry', 'Web-Optimised', 'bannerCollection-opt.webp'),
    width: 1920,
    quality: 78,
  },
];

let totalSaved = 0;

for (const job of JOBS) {
  if (!existsSync(job.src)) {
    console.warn(`SKIP (not found): ${job.src}`);
    continue;
  }
  if (existsSync(job.dest)) {
    console.log(`SKIP (exists):    ${path.basename(job.dest)}`);
    continue;
  }

  const originalSize = statSync(job.src).size;

  await sharp(job.src)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 5 })
    .toFile(job.dest);

  const newSize = statSync(job.dest).size;
  const saved = originalSize - newSize;
  totalSaved += saved;
  const pct = Math.round((saved / originalSize) * 100);
  console.log(
    `✓  ${path.basename(job.dest).padEnd(36)} ${(originalSize/1024).toFixed(0).padStart(6)} KB → ${(newSize/1024).toFixed(0).padStart(6)} KB  (-${pct}%)`
  );
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
