/**
 * Generates the five Ceremony Reel placeholder stills, each graded to a
 * distinct point in a Telugu wedding's arc — soft prep light through the
 * turmeric of haldi, the amber of sangeet, the fire of muhurtham, the
 * cool warmth of the reception. Deterministic.
 *
 * Output: public/reel/frame-*.webp  (1500×1875, 4:5)
 *
 * Replace with real stills per CONTENT-CHECKLIST.md → "Ceremony Reel".
 * Run: pnpm gen:reel
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const W = 1500;
const H = 1875;
const QUALITY = 58;

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/reel");

/**
 * Each frame: a warm background ramp, one soft key light, a low glow,
 * a couple of drifting bokeh points. Tuned per ceremony.
 */
const frames = [
  {
    name: "pellikuthuru",
    // soft morning prep — bone light, rose warmth
    ramp: [["#0f0b07", 0], ["#1e160d", 0.5], ["#2a1e12", 0.82], ["#140d07", 1]],
    key: { cx: 0.34, cy: 0.3, r: 0.6, color: "#eae3d6", o: 0.2 },
    glow: { cx: 0.7, cy: 0.72, color: "#c9a24b", o: 0.14 },
    bokeh: [[0.72, 0.28, 90, 0.4], [0.84, 0.5, 60, 0.3], [0.2, 0.66, 70, 0.28]],
  },
  {
    name: "haldi",
    // turmeric — the brightest, most saturated gold
    ramp: [["#140d05", 0], ["#3a2a0c", 0.5], ["#4a350e", 0.8], ["#1a1206", 1]],
    key: { cx: 0.6, cy: 0.42, r: 0.62, color: "#c9a24b", o: 0.42 },
    glow: { cx: 0.32, cy: 0.7, color: "#c9a24b", o: 0.28 },
    bokeh: [[0.24, 0.32, 96, 0.5], [0.78, 0.6, 72, 0.42], [0.5, 0.2, 54, 0.36]],
  },
  {
    name: "sangeet",
    // music night — deeper, amber stage light in the dark
    ramp: [["#0c0906", 0], ["#171009", 0.55], ["#2c1d0d", 0.86], ["#0c0906", 1]],
    key: { cx: 0.5, cy: 0.36, r: 0.5, color: "#c9a24b", o: 0.34 },
    glow: { cx: 0.68, cy: 0.78, color: "#a63a22", o: 0.16 },
    bokeh: [[0.7, 0.26, 80, 0.55], [0.28, 0.4, 60, 0.4], [0.82, 0.66, 44, 0.5], [0.16, 0.7, 52, 0.34]],
  },
  {
    name: "muhurtham",
    // the vows — sacred fire, brass and kumkuma together
    ramp: [["#0f0b07", 0], ["#241206", 0.5], ["#3a1a0b", 0.82], ["#150c07", 1]],
    key: { cx: 0.5, cy: 0.5, r: 0.55, color: "#c9a24b", o: 0.38 },
    glow: { cx: 0.5, cy: 0.86, color: "#a63a22", o: 0.34 },
    bokeh: [[0.36, 0.34, 70, 0.42], [0.66, 0.38, 70, 0.42], [0.5, 0.68, 90, 0.3]],
  },
  {
    name: "reception",
    // evening — cooler warmth, scattered brass points
    ramp: [["#0c0a08", 0], ["#171009", 0.5], ["#241a10", 0.84], ["#0c0a08", 1]],
    key: { cx: 0.42, cy: 0.32, r: 0.58, color: "#eae3d6", o: 0.14 },
    glow: { cx: 0.66, cy: 0.7, color: "#c9a24b", o: 0.2 },
    bokeh: [[0.72, 0.24, 64, 0.5], [0.84, 0.44, 48, 0.42], [0.6, 0.6, 40, 0.5], [0.24, 0.5, 56, 0.32], [0.4, 0.78, 44, 0.36]],
  },
];

const stops = (arr) =>
  arr.map(([c, o]) => `<stop offset="${o}" stop-color="${c}"/>`).join("");

const bokehCircles = (arr) =>
  arr
    .map(
      ([x, y, r, o]) =>
        `<circle cx="${x * W}" cy="${y * H}" r="${r}" fill="url(#bok)" opacity="${o}"/>`,
    )
    .join("");

function svg(f) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.4" y2="1">${stops(f.ramp)}</linearGradient>
    <radialGradient id="key" cx="${f.key.cx}" cy="${f.key.cy}" r="${f.key.r}">
      <stop offset="0" stop-color="${f.key.color}" stop-opacity="${f.key.o}"/>
      <stop offset="0.5" stop-color="${f.key.color}" stop-opacity="${f.key.o * 0.4}"/>
      <stop offset="1" stop-color="${f.key.color}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow" cx="${f.glow.cx}" cy="${f.glow.cy}" r="0.55">
      <stop offset="0" stop-color="${f.glow.color}" stop-opacity="${f.glow.o}"/>
      <stop offset="1" stop-color="${f.glow.color}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bok" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#c9a24b" stop-opacity="0.7"/>
      <stop offset="0.7" stop-color="#c9a24b" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#c9a24b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.46" r="0.85">
      <stop offset="0" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="0.6" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f0b07" stop-opacity="0.62"/>
    </radialGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="42"/>
    </filter>
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
for (const f of frames) {
  const out = path.join(OUT, `frame-${f.name}.webp`);
  const info = await sharp(Buffer.from(svg(f)))
    .webp({ quality: QUALITY })
    .toFile(out);
  total += info.size;
}
console.log(`${frames.length} reel stills, ${(total / 1024).toFixed(0)} KB total`);
