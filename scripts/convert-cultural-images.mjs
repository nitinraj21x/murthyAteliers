/**
 * convert-cultural-images.mjs
 * Converts all JPG images in Cultural jewel folders to WebP.
 * Run: node scripts/convert-cultural-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const culturalRoot = path.join(__dirname, '..', 'public', 'jewellry', 'Web-Optimised', 'jewellry', 'Cultural');

let totalSaved = 0;
let converted  = 0;
let skipped    = 0;

const folders = readdirSync(culturalRoot).filter(f =>
  statSync(path.join(culturalRoot, f)).isDirectory()
);

for (const folder of folders) {
  const folderPath = path.join(culturalRoot, folder);
  const files = readdirSync(folderPath).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const file of files) {
    const src  = path.join(folderPath, file);
    const dest = path.join(folderPath, path.basename(file, path.extname(file)) + '.webp');

    if (existsSync(dest)) {
      console.log(`SKIP (exists):  ${folder}/${path.basename(dest)}`);
      skipped++;
      continue;
    }

    const originalSize = statSync(src).size;

    await sharp(src)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(dest);

    const newSize = statSync(dest).size;
    const saved   = originalSize - newSize;
    totalSaved   += saved;
    converted++;

    const pct = Math.round((saved / originalSize) * 100);
    console.log(
      `✓  ${(folder + '/' + path.basename(dest)).padEnd(55)} ${(originalSize/1024).toFixed(0).padStart(6)} KB → ${(newSize/1024).toFixed(0).padStart(6)} KB  (-${pct}%)`
    );
  }
}

console.log(`\nConverted: ${converted}  |  Skipped: ${skipped}`);
console.log(`Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
