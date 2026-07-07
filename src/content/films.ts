/**
 * Selected wedding films. The homepage shows these as a strip; the
 * /films page (Phase 6) will open each into a case study with a lite
 * video embed. Placeholder stills graded per film (pnpm gen:home).
 *
 * NOTE(client): couple names, venues and films are placeholders — see
 * CONTENT-CHECKLIST.md → "Selected films".
 */
export type Film = {
  slug: string;
  couple: string;
  venue: string;
  /** one-line logline in the director's voice */
  logline: string;
  runtime: string;
  year: string;
  still: string;
  alt: string;
};

export const films: Film[] = [
  {
    slug: "ramya-karthik",
    couple: "Ramya & Karthik",
    venue: "Godavari riverside · Rajahmundry",
    logline: "A river wedding, shot at first light.",
    runtime: "04:12",
    year: "2026",
    still: "/films/still-ramya-karthik.webp",
    alt: "Placeholder film still for Ramya and Karthik's wedding film",
  },
  {
    slug: "sravanthi-aakash",
    couple: "Sravanthi & Aakash",
    venue: "Falaknuma-style palace · Hyderabad",
    logline: "Old palace, new vows, one long night.",
    runtime: "05:48",
    year: "2025",
    still: "/films/still-sravanthi-aakash.webp",
    alt: "Placeholder film still for Sravanthi and Aakash's wedding film",
  },
  {
    slug: "deepika-vishnu",
    couple: "Deepika & Vishnu",
    venue: "Coastal estate · Visakhapatnam",
    logline: "A monsoon wedding by the sea.",
    runtime: "03:57",
    year: "2025",
    still: "/films/still-deepika-vishnu.webp",
    alt: "Placeholder film still for Deepika and Vishnu's wedding film",
  },
];
