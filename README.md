# RD Photography

Cinematic Wedding Films & Photography — Telugu weddings, told like cinema.

Production website. Next.js App Router · TypeScript · Tailwind v4 ·
GSAP + Lenis · deployed on Vercel.

## Development

```sh
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
```

## Structure

- `src/app` — routes (App Router)
- `src/components` — UI components
- `src/content` — structured content data (CMS-replaceable later)
- `src/lib` — fonts, utilities
- `src/fonts` — self-hosted woff2 (see `FONTS.md`)

Design tokens live in `src/app/globals.css` (`@theme`). No ad-hoc hex
values anywhere else.
