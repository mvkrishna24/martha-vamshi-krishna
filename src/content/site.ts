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

export const reelCeremonies: CeremonyLabelData[] = [
  { te: "పెళ్లికూతురు", en: "Pellikuthuru" },
  { te: "హల్ది", en: "Haldi" },
  { te: "సంగీత్", en: "Sangeet" },
  { te: "ముహూర్తం", en: "Muhurtham" },
  { te: "రిసెప్షన్", en: "Reception" },
];
