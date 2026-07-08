/**
 * Generates the placeholder hero frame sequence: a slow cinematic
 * push-in rendered from an SVG master graded to the site palette
 * (ink / bone / brass / kumkuma). Deterministic — same output every run.
 *
 * Output:
 *   public/hero/frames/frame-000.webp … frame-071.webp  (1600×900)
 *   src/components/hero/poster.webp                      (1920×1080, frame 0)
 *
 * Replace with real footage per CONTENT-CHECKLIST.md → "Hero sequence".
 *
 * Run: pnpm gen:hero
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const MW = 3200;
const MH = 1800;
const FRAME_COUNT = 72;
const FW = 1600;
const FH = 900;
const QUALITY = 46;

const ROOT = path.resolve(import.meta.dirname, "..");
const FRAMES_DIR = path.join(ROOT, "public/hero/frames");
const POSTER_PATH = path.join(ROOT, "src/components/hero/poster.webp");

/* master scene: warm haze, one brass glow (a lamp / muhurtham fire),
   a kumkuma ember low in frame, drifting bokeh, one diagonal shaft */
const masterSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${MW}" height="${MH}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f0b07"/>
      <stop offset="0.45" stop-color="#1c130a"/>
      <stop offset="0.72" stop-color="#2b1b0c"/>
      <stop offset="1" stop-color="#140d07"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.63" cy="0.42" r="0.55">
      <stop offset="0" stop-color="#c9a24b" stop-opacity="0.36"/>
      <stop offset="0.35" stop-color="#c9a24b" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#c9a24b" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="ember" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#a63a22" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#a63a22" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="bokeh" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#c9a24b" stop-opacity="0.55"/>
      <stop offset="0.7" stop-color="#c9a24b" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#c9a24b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="shaft" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#eae3d6" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#eae3d6" stop-opacity="0.05"/>
      <stop offset="1" stop-color="#eae3d6" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="46"/>
    </filter>
    <filter id="softer" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="90"/>
    </filter>
  </defs>

  <rect width="${MW}" height="${MH}" fill="url(#bg)"/>
  <rect width="${MW}" height="${MH}" fill="url(#glow)"/>
  <ellipse cx="740" cy="1520" rx="860" ry="520" fill="url(#ember)"/>
  <g transform="rotate(-24 1600 900)" filter="url(#softer)">
    <rect x="1200" y="-400" width="420" height="2600" fill="url(#shaft)"/>
  </g>
  <g filter="url(#soft)">
    <circle cx="2470" cy="620" r="120" fill="url(#bokeh)"/>
    <circle cx="2740" cy="980" r="74" fill="url(#bokeh)" opacity="0.7"/>
    <circle cx="2180" cy="1210" r="96" fill="url(#bokeh)" opacity="0.5"/>
    <circle cx="620" cy="560" r="66" fill="url(#bokeh)" opacity="0.45"/>
    <circle cx="980" cy="330" r="44" fill="url(#bokeh)" opacity="0.35"/>
    <circle cx="1520" cy="1440" r="58" fill="url(#bokeh)" opacity="0.4"/>
  </g>
</svg>`;

/* per-frame vignette so it stays fixed to the frame, not the scene */
const vignetteSvg = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="v" cx="0.5" cy="0.46" r="0.85">
      <stop offset="0" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="0.62" stop-color="#0f0b07" stop-opacity="0"/>
      <stop offset="1" stop-color="#0f0b07" stop-opacity="0.55"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
</svg>`;

const ease = (t) => t * t * (3 - 2 * t); // smoothstep — slow in, slow out

function cameraAt(t) {
  const e = ease(t);
  const scale = 1.02 + 0.2 * e; // slow push-in
  const w = Math.round(MW / scale);
  const h = Math.round(MH / scale);
  const cx = MW * (0.42 + 0.2 * e); // drift toward the glow
  const cy = MH * (0.54 - 0.08 * e);
  const left = Math.min(Math.max(Math.round(cx - w / 2), 0), MW - w);
  const top = Math.min(Math.max(Math.round(cy - h / 2), 0), MH - h);
  return { left, top, width: w, height: h };
}

async function renderFrame(master, t, outW, outH) {
  const region = cameraAt(t);
  const breathing = 1 + 0.03 * Math.sin(t * Math.PI * 2);
  return sharp(master)
    .extract(region)
    .resize(outW, outH)
    .modulate({ brightness: breathing })
    .composite([{ input: Buffer.from(vignetteSvg(outW, outH)) }]);
}

const master = await sharp(Buffer.from(masterSvg)).png().toBuffer();
await mkdir(FRAMES_DIR, { recursive: true });

let total = 0;
for (let i = 0; i < FRAME_COUNT; i++) {
  const t = i / (FRAME_COUNT - 1);
  const frame = await renderFrame(master, t, FW, FH);
  const out = path.join(
    FRAMES_DIR,
    `frame-${String(i).padStart(3, "0")}.webp`,
  );
  const info = await frame.webp({ quality: QUALITY }).toFile(out);
  total += info.size;
}

const poster = await renderFrame(master, 0, 1920, 1080);
await poster.webp({ quality: 72 }).toFile(POSTER_PATH);

console.log(
  `${FRAME_COUNT} frames, ${(total / 1024 / 1024).toFixed(2)} MB total + poster`,
);
