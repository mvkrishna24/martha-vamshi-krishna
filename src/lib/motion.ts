/**
 * Motion eligibility, per the brief's restraint rules:
 * - touch devices / < 1024px: no pins, no scroll-scrub — fade-ups only
 * - prefers-reduced-motion: opacity fades only, non-negotiable
 */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isDesktopMotion = () =>
  window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
  !prefersReducedMotion();
