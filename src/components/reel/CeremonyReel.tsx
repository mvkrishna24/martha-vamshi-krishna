"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import { isDesktopMotion, prefersReducedMotion } from "@/lib/motion";
import { telugu } from "@/lib/fonts";
import {
  REEL_END_SECONDS,
  REEL_START_SECONDS,
  reelFrames,
} from "@/content/site";

function timecode(seconds: number) {
  const total = Math.round(seconds);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `00:${mm}:${ss}`;
}

/**
 * The Ceremony Reel — the homepage's signature. One wedding walked
 * chronologically as a pinned horizontal film strip. Its timecode is a
 * continuation of the hero's: the hero opens the film at 00:00:00 and
 * hands off at 00:01:30; the reel scrubs from there to 00:07:30.
 *
 * Desktop pointer devices get the pin + horizontal scrub. Touch, narrow
 * viewports, and reduced-motion get a quiet vertical stack instead — no
 * pin, no scroll-jack (per the motion brief).
 */
export function CeremonyReel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let killed = false;

    const setTimecode = (progress: number) => {
      if (!timecodeRef.current) return;
      const s =
        REEL_START_SECONDS + progress * (REEL_END_SECONDS - REEL_START_SECONDS);
      timecodeRef.current.textContent = timecode(s);
    };
    setTimecode(0);

    // Telugu shaping must be present before the 8%-opacity watermarks
    // paint — a system-font flash reads badly at that size. Force-load
    // the subset, then build motion.
    const teluguFamily = telugu.style.fontFamily.split(",")[0].replace(/["']/g, "").trim();

    const build = () => {
      if (killed || !section.isConnected) return;

      const reduced = prefersReducedMotion();
      const horizontal = isDesktopMotion();

      const ctx = gsap.context(() => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-reel-frame]", track);

        if (!horizontal) {
          // vertical stack — reveal each frame on entry (or instantly if reduced)
          frames.forEach((frame) => {
            gsap.fromTo(
              frame,
              { autoAlpha: reduced ? 1 : 0, y: reduced ? 0 : 40 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: frame, start: "top 82%" },
              },
            );
          });
          return;
        }

        // — desktop: pin the section, translate the track horizontally —
        // Measure travel from the frames' own box metrics, NOT
        // track.scrollWidth: the oversized watermarks overflow each figure
        // and would make scrollWidth (and thus the pin end) unstable.
        // offsetLeft/offsetWidth exclude the absolute watermark, so this
        // lands the last frame flush against the right padding, exactly.
        const distance = () => {
          const last = frames[frames.length - 1];
          if (!last) return 0;
          const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
          return Math.max(
            0,
            last.offsetLeft + last.offsetWidth + padRight - window.innerWidth,
          );
        };

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setTimecode(self.progress),
          },
        });

        // gentle watermark parallax — each drifts against the scroll for depth
        frames.forEach((frame) => {
          const mark = frame.querySelector<HTMLElement>("[data-reel-watermark]");
          if (!mark) return;
          gsap.fromTo(
            mark,
            { xPercent: 8 },
            {
              xPercent: -8,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      }, section);

      return ctx;
    };

    let ctx: ReturnType<typeof gsap.context> | undefined;
    // load Telugu at a watermark size, then wait for the whole set, then build
    Promise.resolve(document.fonts.load(`400 12rem "${teluguFamily}"`))
      .catch(() => {})
      .then(() => document.fonts.ready)
      .then(() => {
        if (killed) return;
        ctx = build();
        ScrollTrigger.refresh();
      });

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reel-heading"
      className="relative overflow-hidden border-t border-hairline"
    >
      {/* pinned header rail — sits over the strip on desktop, static on mobile */}
      <div className="container-site flex items-baseline justify-between pt-10 lg:absolute lg:inset-x-0 lg:top-0 lg:z-10 lg:pt-8">
        <h2 id="reel-heading" className="eyebrow">
          The Ceremony Reel — One Wedding
        </h2>
        <p className="eyebrow tabular-nums">
          <span ref={timecodeRef}>{timecode(REEL_START_SECONDS)}</span>
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-16 px-(--spacing-gutter) py-14 lg:h-svh lg:flex-row lg:flex-nowrap lg:items-center lg:gap-[8vw] lg:py-0 lg:pr-[14vw] lg:pl-[10vw] lg:will-change-transform"
      >
        {reelFrames.map((frame, i) => (
          <figure
            key={frame.en}
            data-reel-frame
            className="relative mx-auto flex w-full max-w-md shrink-0 flex-col lg:mx-0 lg:h-[74vh] lg:w-[58vh] lg:max-w-none lg:justify-center"
          >
            {/* oversized Telugu watermark behind the image */}
            <span
              data-reel-watermark
              aria-hidden
              lang="te"
              className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 text-center font-telugu text-[26vw] leading-none text-bone opacity-[0.08] lg:text-[15vw]"
            >
              {frame.te}
            </span>

            {/* the film frame: image between two sprocket rails */}
            <div className="relative z-[1] overflow-hidden bg-ink-2">
              <div aria-hidden className="film-perf" />
              <div className="relative aspect-4/5 w-full">
                <Image
                  src={frame.still}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 1024px) 58vh, 100vw"
                  className="object-cover"
                />
              </div>
              <div aria-hidden className="film-perf" />
            </div>

            <figcaption className="relative z-[1] mt-5 flex items-baseline justify-between gap-4">
              <span className="font-display text-2xl font-extralight text-bone">
                {frame.en}
              </span>
              <span className="eyebrow shrink-0">{frame.meta}</span>
            </figcaption>

            <span
              aria-hidden
              className="eyebrow absolute -top-2 left-0 z-[1] text-brass lg:-top-6"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </figure>
        ))}
      </div>
    </section>
  );
}
