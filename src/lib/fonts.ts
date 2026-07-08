import localFont from "next/font/local";

/**
 * Font slots for RD Photography.
 *
 * The design system defines four roles: display, body, mono, telugu.
 * Components only ever reference the CSS variables below — never a
 * family name — so swapping a typeface touches this file only.
 *
 * Boska and General Sans (Fontshare) could not be fetched in this
 * build environment; Fraunces and Hanken Grotesk are the interim
 * stand-ins. See FONTS.md for the two-line swap once the licensed
 * Fontshare files are added to src/fonts/.
 */

export const display = localFont({
  src: "../fonts/fraunces-var.woff2",
  weight: "200 300",
  display: "swap",
  variable: "--font-slot-display",
  fallback: ["Georgia", "serif"],
  adjustFontFallback: false,
});

export const body = localFont({
  src: "../fonts/hanken-var.woff2",
  weight: "300 400",
  display: "swap",
  variable: "--font-slot-body",
  fallback: ["system-ui", "sans-serif"],
});

export const mono = localFont({
  src: "../fonts/fragment-mono-400.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-slot-mono",
  fallback: ["ui-monospace", "monospace"],
});

export const telugu = localFont({
  src: "../fonts/noto-serif-telugu-400.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-slot-telugu",
  fallback: ["serif"],
  // Telugu-subset file; latin glyphs come from the display/body slots.
  preload: false,
});

export const fontVariables = [
  display.variable,
  body.variable,
  mono.variable,
  telugu.variable,
].join(" ");
