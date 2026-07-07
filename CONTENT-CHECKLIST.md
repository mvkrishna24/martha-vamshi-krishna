# Content Checklist

Every image/video slot on the site, what to supply, and where it goes.
Placeholders currently ship in each slot; this file grows as sections
are built.

## Hero sequence (homepage)

**Currently:** generated placeholder (warm gradient camera push-in),
regenerable with `pnpm gen:hero`.

**Supply:** one slow, continuous cinematic camera move — 3–4 seconds of
real footage from a wedding film (e.g. a slow push toward the mandapam,
or a pan across the haldi crowd). Low, warm light grades best against
the type.

**Export spec:**

- 72 frames (3s at 24fps), exported as WebP
- 1600×900 px, quality ~50 (target ≤ 4 MB total for the sequence)
- Named `frame-000.webp` … `frame-071.webp` → `public/hero/frames/`
- Frame 0 additionally at 1920×1080, quality ~72 →
  `src/components/hero/poster.webp` (this is the LCP poster; keep it
  under ~80 KB)
- No burned-in text or logos; keep the left/lower third quiet — the
  headline sits there
- ffmpeg example:
  `ffmpeg -i move.mp4 -vf "fps=24,scale=1600:900" -frames:v 72 -c:v libwebp -q:v 50 frame-%03d.webp`

**Alt/context note:** the sequence is decorative (headline carries the
message); no alt text needed.
