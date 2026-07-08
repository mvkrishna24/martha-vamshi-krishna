"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsapClient";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A section heading — mono eyebrow over a display title. The title
 * reveals word by word on 20% viewport entry (once). This is the single
 * orchestrated moment allotted to most sections.
 *
 * Reduced motion collapses to a plain opacity fade.
 */
export function SectionHeading({
  eyebrow,
  title,
  id,
  align = "start",
  className = "",
}: {
  eyebrow: string;
  title: string;
  id?: string;
  align?: "start" | "between";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const heading = el.querySelector<HTMLElement>("[data-heading]");
    if (!heading) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(heading, { autoAlpha: 1 });
        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.8,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          },
        );
        return;
      }

      document.fonts.ready.then(() => {
        if (!el.isConnected) return;
        // ensure the heading is never left hidden if SplitText can't run
        gsap.set(heading, { autoAlpha: 1 });
        SplitText.create(heading, {
          type: "words",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(heading, { autoAlpha: 1 });
            return gsap.from(self.words, {
              autoAlpha: 0,
              yPercent: 40,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.06,
              scrollTrigger: { trigger: el, start: "top 80%", once: true },
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col gap-5 ${
        align === "between" ? "sm:flex-row sm:items-end sm:justify-between" : ""
      } ${className}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        data-heading
        className="max-w-[18ch] text-display-lg font-extralight text-bone opacity-0"
      >
        {title}
      </h2>
    </div>
  );
}
