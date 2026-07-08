/**
 * Global site content. Structured so a CMS can replace it later
 * without touching components.
 */

export const site = {
  name: "RD Photography",
  positioning: "Cinematic Wedding Films & Photography",
  subline: "Telugu weddings, told like cinema.",
  serviceAreas: ["Andhra Pradesh", "Telangana", "Destination"],
  // TODO(client): real handles — tracked in CONTENT-CHECKLIST.md
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Films", href: "/films" },
  { label: "Photography", href: "/photography" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
];

export const footerLinks: NavLink[] = [
  ...navLinks,
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

/**
 * Canonical bilingual ceremony labels — the core brand atom.
 * Telugu script carries the emotion, English mono carries the information.
 */
export type CeremonyLabelData = { te: string; en: string };

/**
 * The Ceremony Reel — one wedding walked chronologically.
 * The homepage's signature section. `still` is a placeholder graded to
 * the palette (pnpm gen:reel); replace per CONTENT-CHECKLIST.md.
 *
 * The reel's timecode is one continuous film with the hero: the hero
 * opens at 00:00:00 and hands off at 00:01:30 (REEL_START_SECONDS),
 * the reel scrubs from there to REEL_END_SECONDS.
 */
export const REEL_START_SECONDS = 90; // hero hands off here
export const REEL_END_SECONDS = 450; // 00:07:30

export type ReelFrame = {
  te: string;
  en: string;
  /** EXIF-style mono caption — lens · place · moment */
  meta: string;
  still: string;
  alt: string;
};

export const reelFrames: ReelFrame[] = [
  {
    te: "పెళ్లికూతురు",
    en: "Pellikuthuru",
    meta: "50MM · f/1.8 · THE GETTING READY",
    still: "/reel/frame-pellikuthuru.webp",
    alt: "Placeholder still for the Pellikuthuru bridal-preparation ceremony",
  },
  {
    te: "హల్ది",
    en: "Haldi",
    meta: "35MM · TURMERIC · PELLIKUTHURU",
    still: "/reel/frame-haldi.webp",
    alt: "Placeholder still for the Haldi turmeric ceremony",
  },
  {
    te: "సంగీత్",
    en: "Sangeet",
    meta: "24MM · f/1.4 · THE MUSIC NIGHT",
    still: "/reel/frame-sangeet.webp",
    alt: "Placeholder still for the Sangeet music-and-dance evening",
  },
  {
    te: "ముహూర్తం",
    en: "Muhurtham",
    meta: "85MM · THE VOWS · GODAVARI",
    still: "/reel/frame-muhurtham.webp",
    alt: "Placeholder still for the Muhurtham wedding vows",
  },
  {
    te: "రిసెప్షన్",
    en: "Reception",
    meta: "35MM · f/2 · THE LAST DANCE",
    still: "/reel/frame-reception.webp",
    alt: "Placeholder still for the wedding Reception",
  },
];

/** kept for the bilingual specimen elsewhere on the site */
export const reelCeremonies: CeremonyLabelData[] = reelFrames.map(
  ({ te, en }) => ({ te, en }),
);
