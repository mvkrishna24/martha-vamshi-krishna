"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapClient";
import { isDesktopMotion, prefersReducedMotion } from "@/lib/motion";
import type { GalleryImage } from "@/content/galleries";
import { Lightbox } from "./Lightbox";

/**
 * Masonry gallery (CSS columns — preserves DOM order for keyboard/AT).
 * Each image reveals on enter: clip-path wipe + 1.05→1 scale on desktop,
 * a plain fade-up on touch, opacity only under reduced motion. Clicking
 * an image opens the accessible lightbox.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-gallery-item]", grid);
    const reduced = prefersReducedMotion();
    const cinematic = isDesktopMotion();

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const img = item.querySelector<HTMLElement>("[data-gallery-media]");
        const trigger = { trigger: item, start: "top 88%", once: true };

        if (reduced) {
          gsap.fromTo(item, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, scrollTrigger: trigger });
          return;
        }
        if (!cinematic) {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: trigger },
          );
          return;
        }
        // desktop: clip-path wipe + scale drift-in
        gsap.set(item, { autoAlpha: 1 });
        gsap.fromTo(
          item,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.out", scrollTrigger: trigger },
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.06 },
            { scale: 1, duration: 0.9, ease: "power3.out", scrollTrigger: trigger },
          );
        }
      });
    }, grid);

    return () => ctx.revert();
  }, [images]);

  return (
    <>
      <div
        ref={gridRef}
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
      >
        {images.map((img, i) => (
          <button
            key={img.src + i}
            data-gallery-item
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Open image ${i + 1}: ${img.alt}`}
            className="group block w-full break-inside-avoid overflow-hidden opacity-0 rounded-[var(--radius-thumb)] focus-visible:outline-brass"
          >
            <span className="relative block overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                data-gallery-media
                className="w-full transition-transform duration-[6000ms] ease-out will-change-transform group-hover:scale-[1.05]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-ink/80 to-transparent p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="eyebrow">{img.meta}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </>
  );
}
