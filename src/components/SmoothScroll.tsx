"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import { isDesktopMotion } from "@/lib/motion";

/** Lenis smooth scroll — desktop pointer devices only, driven by GSAP's ticker. */
export function SmoothScroll() {
  useEffect(() => {
    if (!isDesktopMotion()) return;

    const lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
