"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsapClient";
import { isDesktopMotion, prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/site";
import { FrameSequence } from "./frameSequence";
import { FRAME_COUNT, frameSrc } from "./frames";
import poster from "./poster.webp";

/** the hero's fake runtime — the timecode scrubs 00:00:00 → 00:01:30 */
const RUNTIME_SECONDS = 90;

function formatTimecode(progress: number) {
  const total = Math.round(progress * RUNTIME_SECONDS);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `00:${mm}:${ss}`;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const reduced = prefersReducedMotion();
    const scrub = isDesktopMotion();
    let sequence: FrameSequence | null = null;
    let observer: ResizeObserver | null = null;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector<HTMLElement>("[data-hero-eyebrow]");
      const headline = section.querySelector<HTMLElement>("[data-hero-headline]");
      const fades = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", section);
      const allType = [eyebrow, headline, ...fades].filter(Boolean) as HTMLElement[];

      if (reduced) {
        // opacity fades only — non-negotiable
        gsap.to(allType, { autoAlpha: 1, duration: 0.8, ease: "none", stagger: 0.1 });
        return;
      }

      if (!scrub) {
        // touch / < 1024px: simple fade-up reveals only
        gsap.fromTo(
          allType,
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.15 },
        );
        return;
      }

      // — desktop choreography: eyebrow types on, headline line-mask reveal —
      document.fonts.ready.then(() => {
        if (!section.isConnected || !eyebrow || !headline) return;

        gsap.set(eyebrow, { autoAlpha: 1 });
        const eyebrowSplit = SplitText.create(eyebrow, { type: "chars" });
        gsap.from(eyebrowSplit.chars, {
          autoAlpha: 0,
          duration: 0.01,
          ease: "none",
          stagger: 0.028,
        });

        SplitText.create(headline, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(headline, { autoAlpha: 1 });
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.14,
              delay: 0.45,
            });
          },
        });

        gsap.fromTo(
          fades,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 1.2 },
        );
      });

      // — canvas frame sequence, scrubbed by scroll —
      sequence = new FrameSequence(canvas, FRAME_COUNT, frameSrc);
      sequence.onFirstDraw = () => {
        canvas.style.opacity = "1";
      };
      sequence.resize();
      observer = new ResizeObserver(() => sequence?.resize());
      observer.observe(canvas);
      sequence.preload();

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          sequence?.draw(self.progress);
          if (timecodeRef.current) {
            timecodeRef.current.textContent = formatTimecode(self.progress);
          }
        },
      });
    }, section);

    return () => {
      ctx.revert();
      observer?.disconnect();
      sequence?.destroy();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[calc(100svh-4rem)] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden>
        {/* poster paints first — this is the LCP element */}
        <Image
          src={poster}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
        />
        {/* the sequence takes over invisibly once frame 0 is drawn */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700"
        />
        {/* type contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/15 to-ink/35" />
      </div>

      <div className="container-site relative w-full pb-12">
        <p data-hero-eyebrow className="eyebrow mb-8 opacity-0">
          {site.positioning}
        </p>
        <h1
          data-hero-headline
          className="max-w-[12ch] text-display-xl font-extralight text-bone opacity-0"
        >
          Telugu weddings, told like <span className="text-brass">cinema</span>.
        </h1>
        <div className="mt-14 flex items-baseline justify-between gap-6">
          <p data-hero-fade className="eyebrow opacity-0">
            <span ref={timecodeRef}>00:00:00</span>
          </p>
          <p data-hero-fade className="eyebrow hidden opacity-0 sm:block">
            Scroll
          </p>
          <p data-hero-fade className="eyebrow opacity-0">
            35MM · GODAVARI · 2026
          </p>
        </div>
      </div>

      <noscript>
        <style>{`[data-hero-eyebrow],[data-hero-headline],[data-hero-fade]{opacity:1!important}`}</style>
      </noscript>
    </section>
  );
}
