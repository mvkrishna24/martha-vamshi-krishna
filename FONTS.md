# Fonts

The design system defines four font roles. Components never reference a
family name — only the CSS variables `--font-display`, `--font-body`,
`--font-mono`, `--font-telugu` — so a typeface swap touches exactly one
file: `src/lib/fonts.ts`.

| Role    | Spec (brief)              | Currently shipping        | Status |
| ------- | ------------------------- | ------------------------- | ------ |
| Display | Boska 200/300 (Fontshare) | Fraunces 200–300 variable | interim stand-in |
| Body    | General Sans 300/400      | Hanken Grotesk 300–400 variable | interim stand-in |
| Mono    | Fragment Mono             | Fragment Mono 400         | final |
| Telugu  | Noto Serif Telugu (subset)| Noto Serif Telugu 400, Telugu subset | final |

Boska and General Sans could not be downloaded in the build environment
(Fontshare's CDN is not reachable from it). Fraunces and Hanken Grotesk
were chosen as the closest matches in register — thin high-contrast
serif, warm grotesque — so all sizes, weights, and leading are already
tuned for the final faces.

## Swapping in Boska + General Sans

1. Download from Fontshare (free license, requires the download step):
   - https://www.fontshare.com/fonts/boska — extralight (200) and light (300) `woff2`
   - https://www.fontshare.com/fonts/general-sans — light (300) and regular (400) `woff2`,
     or the variable `woff2`
2. Drop the files into `src/fonts/`.
3. In `src/lib/fonts.ts`, change the `src` (and, if using two static
   files instead of a variable font, the `src` array/`weight`) of the
   `display` and `body` slots. Nothing else changes.

All fonts are self-hosted via `next/font/local` — no third-party
requests at runtime, no CLS (size-adjusted fallbacks), preloaded except
the Telugu face which loads on first use.
