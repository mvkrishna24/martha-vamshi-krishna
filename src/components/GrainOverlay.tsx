/**
 * Animated film grain over the whole viewport.
 * Pure CSS (see .grain in globals.css): one fixed compositor layer,
 * SVG feTurbulence tile, steps() jitter. No JS, no canvas repaints.
 */
export function GrainOverlay() {
  return <div aria-hidden className="grain z-50" />;
}
