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

## Ceremony Reel (homepage signature)

**Currently:** five generated placeholder stills graded per ceremony
(`pnpm gen:reel`), 4:5 portrait.

**Supply:** one hero still per ceremony from a single real wedding, in
chronological order — the reel walks one couple's day start to finish, so
these must be the *same wedding*:

1. `frame-pellikuthuru.webp` — Pellikuthuru / bridal prep
2. `frame-haldi.webp` — Haldi (turmeric)
3. `frame-sangeet.webp` — Sangeet (music night)
4. `frame-muhurtham.webp` — Muhurtham (the vows)
5. `frame-reception.webp` — Reception

**Export spec:**

- 4:5 portrait, 1500×1875 px, WebP quality ~70 (≤ ~180 KB each)
- Named exactly as above → `public/reel/`
- Compose with room around the subject: the giant Telugu ceremony name
  sits *behind* the photo and bleeds out to either side, so busy edges
  fight the watermark
- Warm, low grade matches the site; the muhurtham frame reads best with
  fire/lamp light

**Copy per frame** lives in `src/content/site.ts` → `reelFrames`
(`en` label, `meta` EXIF caption, `alt` text). Update `alt` to describe
the real photograph once supplied.

## Selected films (homepage strip + /films)

**Currently:** three placeholder 16:9 stills (`pnpm gen:home`) with
placeholder couples, venues and loglines in `src/content/films.ts`.

**Supply per film:** couple names, venue/city, a one-line logline, the
teaser/feature runtime, year, and a 16:9 hero still (1600×900, WebP q~70)
named `still-<slug>.webp` → `public/films/`. The video embed itself is
wired on the /films case study in a later phase (lite-embed, click to
play — never autoplay).

## Services index (16-item taxonomy)

**Telugu service labels** in `src/content/services.ts` are a first pass
and MUST be reviewed by a native Telugu speaker before launch. The
established ceremony names (హల్ది, సంగీత్, నిశ్చితార్థం, రిసెప్షన్, వోణి)
are safe; the craft-service translations (cinematography, candid,
portraits, maternity, etc.) especially need a native check. Each is a
plain string field, CMS-ready.

## Testimonials (homepage)

**Currently:** three placeholder quotes in the site's voice
(`src/content/testimonials.ts`). Replace with real couples' words plus
written consent to publish name + city.
