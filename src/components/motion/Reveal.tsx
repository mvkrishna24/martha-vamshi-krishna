"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";
import { gsap } from "@/lib/gsapClient";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * On-enter reveal: a quiet fade-up (or plain fade under reduced motion),
 * fired once at 85% viewport entry. Children with [data-reveal-item] are
 * staggered; otherwise the whole element reveals.
 */
export function Reveal({
  as,
  children,
  className = "",
  stagger = 0.08,
  y = 28,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = prefersReducedMotion();
    const items = el.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const targets = items.length ? Array.from(items) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y: reduced ? 0 : y },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? 0.6 : 0.9,
          ease: "power3.out",
          stagger: reduced ? 0 : stagger,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [stagger, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
