/**
 * Generates the three selected-film placeholder stills for the homepage
 * films strip. 16:9 cinematic frames, each graded to its film's mood.
 * Deterministic.
 *
 * Output: public/films/still-*.webp  (1600×900)
 *
 * Replace with real film stills per CONTENT-CHECKLIST.md → "Selected films".
 * Run: pnpm gen:home
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const W = 1600;
const H = 900;
const QUALITY = 52;

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/films");

const stills = [
  {
    name: "ramya-karthik",
    // river dawn — cool warmth breaking to gold
    ramp: [["#0c0a08", 0], ["#181209", 0.55], ["#332209", 0.85], ["#0e0b08", 1]],
    key: { cx: 0.68, cy: 0.34, r: 0.6, color: "#c9a24b", o: 0.32 },
    glow: { cx: 0.2, cy: 0.7, color: "#eae3d6", o: 0.08 },
    bokeh: [[0.74, 0.3, 90, 0.4], [0.86, 0.52, 60, 0.3], [0.3, 0.66, 54, 0.24]],
  },
  {
    name: "sravanthi-aakash",
    // palace night — deep amber, warm lamps
    ramp: [["#0b0806", 0], ["#1a1108", 0.5], ["#2c1c0b", 0.85], ["#0b0806", 1]],
    key: { cx: 0.4, cy: 0.4, r: 0.52, color: "#c9a24b", o: 0.3 },
    glow: { cx: 0.72, cy: 0.72, color: "#a63a22", o: 0.14 },
    bokeh: [[0.24, 0.32, 70, 0.5], [0.66, 0.6, 56, 0.42], [0.82, 0.36, 44, 0.5], [0.5, 0.74, 60, 0.3]],
  },
  {
    name: "deepika-vishnu",
    // coastal monsoon — cooler, silver light in the warmth
    ramp: [["#0b0a09", 0], ["#15110c", 0.55], ["#241c12", 0.85], ["#0b0a09", 1]],
    key: { cx: 0.55, cy: 0.3, r: 0.62, color: "#eae3d6", o: 0.14 },
    glow: { cx: 0.4, cy: 0.74, color: "#c9a24b", o: 0.16 },
    bokeh: [[0.7, 0.28, 64, 0.4], [0.28, 0.44, 52, 0.34], [0.6, 0.62, 44, 0.4]],
  },
];

const bokehCircles = (arr) =>
  arr
    .map(([x, y, r, o]) => `<circle cx="${x * W}" cy="${y * H}" r="${r}" fill="url(#bok)" opacity="${o}"/>`)
    .join("");

const stops = (arr) => arr.map(([c, o]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");

function svg(f) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.7" y2="1">${stops(f.ramp)}</linearGradient>
    <radialGradient id="key" cx="${f.key.cx}" cy="${f.key.cy}" r="${f.key.r}">
      <stop offset="0" stop-color="${f.key.color}" stop-opacity="${f.key.o}"/>
      <stop offset="0.5" stop-color="${f.key.color}" stop-opacity="${f.key.o * 0.4}"/>
      <stop offset="1" stop-color="${f.key.color}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow" cx="${f.glow.cx}" cy="${f.glow.cy}" r="0.5">
      <stop offset="0" stop-color="${f.glow.color}" stop-opacity="${f.glow.o}"/>
      <stop offset="1" stop-color="${f.glow.color}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bok" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#c9a24b" stop-opacity="0.6"/>
      <stop offset="0.7" stop-color="#c9a24b" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#c9a24b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.48" r="0.8">
      <stop offset="0" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="0.6" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f0b07" stop-opacity="0.6"/>
    </radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#key)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g filter="url(#soft)">${bokehCircles(f.bokeh)}</g>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
</svg>`;
}

await mkdir(OUT, { recursive: true });
let total = 0;
for (const f of stills) {
  const out = path.join(OUT, `still-${f.name}.webp`);
  const info = await sharp(Buffer.from(svg(f))).webp({ quality: QUALITY }).toFile(out);
  total += info.size;
}
console.log(`${stills.length} film stills, ${(total / 1024).toFixed(0)} KB total`);
