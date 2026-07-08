/**
 * Generates placeholder imagery for the Photography section:
 *   - one 4:5 cover per service category, graded by category
 *   - a shared pool of varied-aspect gallery stills for the masonry
 *
 * Deterministic (index-derived positions, no RNG) so re-runs don't churn
 * git. Replace with real galleries per CONTENT-CHECKLIST.md → "Galleries".
 *
 * Run: pnpm gen:gallery
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/gallery");

// service slugs (must match src/content/services.ts), each with a hue mood
const covers = [
  "wedding-cinematography", "wedding-photography", "candid-photography",
  "couple-portraits", "pre-wedding", "nischitartham", "haldi", "sangeet",
  "mehendi", "reception", "maternity", "newborn", "first-birthday",
  "birthday", "anniversary", "voni",
];

// warm grade families to cycle — gold, deep amber, ember, bone-lit
const grades = [
  { a: "#0f0b07", b: "#2a1c0b", key: "#c9a24b", ko: 0.34, glow: "#c9a24b", go: 0.16 },
  { a: "#0c0906", b: "#33220a", key: "#c9a24b", ko: 0.42, glow: "#a63a22", go: 0.14 },
  { a: "#0b0806", b: "#241206", key: "#c9a24b", ko: 0.3, glow: "#a63a22", go: 0.3 },
  { a: "#0c0a08", b: "#241a10", key: "#eae3d6", ko: 0.14, glow: "#c9a24b", go: 0.2 },
];

const frac = (n) => n - Math.floor(n);
// deterministic 0..1 from a seed
const rnd = (seed) => frac(Math.sin(seed * 12.9898) * 43758.5453);

function scene(w, h, seed) {
  const g = grades[seed % grades.length];
  const kx = 0.3 + 0.4 * rnd(seed + 1);
  const ky = 0.28 + 0.3 * rnd(seed + 2);
  const gx = 0.3 + 0.45 * rnd(seed + 3);
  const gy = 0.55 + 0.3 * rnd(seed + 4);
  const nB = 3 + (seed % 3);
  const bokeh = Array.from({ length: nB }, (_, i) => {
    const s = seed * 10 + i;
    return [
      0.12 + 0.76 * rnd(s + 5),
      0.12 + 0.76 * rnd(s + 6),
      36 + 64 * rnd(s + 7),
      0.28 + 0.28 * rnd(s + 8),
    ];
  });
  const bok = bokeh
    .map(([x, y, r, o]) => `<circle cx="${(x * w).toFixed(0)}" cy="${(y * h).toFixed(0)}" r="${r.toFixed(0)}" fill="url(#bok)" opacity="${o.toFixed(2)}"/>`)
    .join("");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="${g.a}"/>
      <stop offset="0.55" stop-color="${g.b}"/>
      <stop offset="1" stop-color="${g.a}"/>
    </linearGradient>
    <radialGradient id="key" cx="${kx.toFixed(3)}" cy="${ky.toFixed(3)}" r="0.6">
      <stop offset="0" stop-color="${g.key}" stop-opacity="${g.ko}"/>
      <stop offset="0.5" stop-color="${g.key}" stop-opacity="${g.ko * 0.4}"/>
      <stop offset="1" stop-color="${g.key}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow" cx="${gx.toFixed(3)}" cy="${gy.toFixed(3)}" r="0.5">
      <stop offset="0" stop-color="${g.glow}" stop-opacity="${g.go}"/>
      <stop offset="1" stop-color="${g.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bok" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#c9a24b" stop-opacity="0.6"/>
      <stop offset="0.7" stop-color="#c9a24b" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#c9a24b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.47" r="0.82">
      <stop offset="0" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="0.6" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f0b07" stop-opacity="0.6"/>
    </radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${Math.round(w / 34)}"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#key)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g filter="url(#soft)">${bok}</g>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
</svg>`;
}

await mkdir(OUT, { recursive: true });
let total = 0;
let count = 0;

// covers — 4:5, graded per category index
for (let i = 0; i < covers.length; i++) {
  const out = path.join(OUT, `cover-${covers[i]}.webp`);
  const info = await sharp(Buffer.from(scene(1000, 1250, i + 1)))
    .webp({ quality: 56 })
    .toFile(out);
  total += info.size;
  count++;
}

// pool — varied aspect ratios for masonry
const ratios = [
  [1000, 1250], [1000, 1500], [1200, 800], [1000, 1000],
  [1200, 675], [1000, 1200], [1050, 1400], [1200, 900],
];
const POOL = 20;
for (let i = 0; i < POOL; i++) {
  const [w, h] = ratios[i % ratios.length];
  const out = path.join(OUT, `g-${String(i + 1).padStart(2, "0")}.webp`);
  const info = await sharp(Buffer.from(scene(w, h, i + 40)))
    .webp({ quality: 56 })
    .toFile(out);
  total += info.size;
  count++;
}

console.log(`${count} gallery images, ${(total / 1024).toFixed(0)} KB total`);
