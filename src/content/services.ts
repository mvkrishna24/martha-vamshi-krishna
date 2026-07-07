/**
 * The canonical 16-service taxonomy, grouped. Single source of truth for
 * the homepage services index, the /services page, and the /photography
 * category index. Ordered exactly as the brand brief specifies.
 *
 * Every entry carries a bilingual label pair — Telugu display + English
 * mono — because the bilingual type system is a core brand element.
 *
 * NOTE(client): the Telugu labels below are a first pass and must be
 * reviewed by a native speaker before launch. See CONTENT-CHECKLIST.md →
 * "Telugu service labels". `slug` powers /photography/[category]; keep
 * stable once galleries are shot.
 */
export type Service = {
  te: string;
  en: string;
  slug: string;
  /** one-line director's note, shown on the services page */
  note: string;
};

export type ServiceGroup = {
  title: string;
  te: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    title: "Weddings",
    te: "వివాహాలు",
    services: [
      {
        te: "వివాహ సినిమా",
        en: "Wedding Cinematography",
        slug: "wedding-cinematography",
        note: "A feature film, a teaser, and the reels — the day as cinema.",
      },
      {
        te: "పెళ్లి ఫొటోగ్రఫీ",
        en: "Wedding Photography",
        slug: "wedding-photography",
        note: "Traditional coverage, unhurried and complete.",
      },
      {
        te: "క్యాండిడ్ ఫొటోగ్రఫీ",
        en: "Candid Photography",
        slug: "candid-photography",
        note: "The glances between the rituals.",
      },
      {
        te: "జంట చిత్రాలు",
        en: "Wedding & Couple Portraits",
        slug: "couple-portraits",
        note: "Two people, held still for a moment.",
      },
      {
        te: "పెళ్లికి ముందు",
        en: "Pre-Wedding Shoots",
        slug: "pre-wedding",
        note: "The story before the story.",
      },
      {
        te: "నిశ్చితార్థం",
        en: "Engagement — Nischitartham",
        slug: "nischitartham",
        note: "Where two families become one.",
      },
      {
        te: "హల్ది",
        en: "Haldi",
        slug: "haldi",
        note: "Turmeric, laughter, morning light.",
      },
      {
        te: "సంగీత్",
        en: "Sangeet",
        slug: "sangeet",
        note: "The night the family dances.",
      },
      {
        te: "మెహందీ",
        en: "Mehendi",
        slug: "mehendi",
        note: "Patience drawn onto skin.",
      },
      {
        te: "రిసెప్షన్",
        en: "Reception",
        slug: "reception",
        note: "The last dance, the first as one.",
      },
    ],
  },
  {
    title: "Family & Milestones",
    te: "కుటుంబం",
    services: [
      {
        te: "మెటర్నిటీ",
        en: "Maternity Shoots",
        slug: "maternity",
        note: "The wait, made luminous.",
      },
      {
        te: "నవజాత శిశువు",
        en: "Newborn & Baby Shoots",
        slug: "newborn",
        note: "The first days, kept.",
      },
      {
        te: "మొదటి పుట్టినరోజు",
        en: "First Birthday / Cake Smash",
        slug: "first-birthday",
        note: "One year, all at once.",
      },
      {
        te: "పుట్టినరోజు",
        en: "Birthday Events",
        slug: "birthday",
        note: "Another candle, another chapter.",
      },
      {
        te: "వార్షికోత్సవం",
        en: "Anniversary Events",
        slug: "anniversary",
        note: "Time, marked and honoured.",
      },
      {
        te: "వోణి",
        en: "Half-Saree Function — Voni",
        slug: "voni",
        note: "The threshold into womanhood.",
      },
    ],
  },
];

export const allServices: Service[] = serviceGroups.flatMap((g) => g.services);
