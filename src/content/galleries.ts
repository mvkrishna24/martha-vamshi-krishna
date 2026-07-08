import { allServices, type Service } from "@/content/services";

/**
 * Photography galleries. Placeholder imagery for now (pnpm gen:gallery):
 * one graded cover per category plus a shared, varied-aspect pool for the
 * masonry. Structured so each real category can later own its own image
 * list without touching components — see CONTENT-CHECKLIST.md.
 */
export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  /** EXIF-style mono caption */
  meta: string;
  alt: string;
};

// aspect cycle — MUST match scripts/generate-gallery.mjs `ratios`
const RATIOS = [
  [1000, 1250], [1000, 1500], [1200, 800], [1000, 1000],
  [1200, 675], [1000, 1200], [1050, 1400], [1200, 900],
] as const;

const META = [
  "35MM · f/2 · GODAVARI",
  "50MM · f/1.8 · MORNING",
  "85MM · f/1.4 · CANDID",
  "24MM · f/2.8 · WIDE",
  "35MM · f/2 · AVAILABLE LIGHT",
  "50MM · f/1.8 · DETAIL",
  "135MM · f/2 · ACROSS THE ROOM",
  "35MM · f/1.4 · NIGHT",
];

const POOL: GalleryImage[] = Array.from({ length: 20 }, (_, i) => {
  const [width, height] = RATIOS[i % RATIOS.length];
  return {
    src: `/gallery/g-${String(i + 1).padStart(2, "0")}.webp`,
    width,
    height,
    meta: META[i % META.length],
    alt: "", // filled per category below so alt text is meaningful
  };
});

export type Category = {
  service: Service;
  cover: GalleryImage;
  images: GalleryImage[];
};

/** rotate the pool per category so galleries don't read identically */
function galleryFor(service: Service, offset: number): GalleryImage[] {
  const rotated = [...POOL.slice(offset), ...POOL.slice(0, offset)];
  return rotated.map((img, i) => ({
    ...img,
    alt: `${service.en} — placeholder photograph ${i + 1}`,
  }));
}

export const categories: Category[] = allServices.map((service, i) => ({
  service,
  cover: {
    src: `/gallery/cover-${service.slug}.webp`,
    width: 1000,
    height: 1250,
    meta: "PLACEHOLDER · TO BE SHOT",
    alt: `${service.en} — placeholder cover image`,
  },
  images: galleryFor(service, (i * 3) % POOL.length),
}));

export const categoryBySlug = new Map(
  categories.map((c) => [c.service.slug, c]),
);
