import { Hero } from "@/components/hero/Hero";
import { CeremonyReel } from "@/components/reel/CeremonyReel";

/**
 * Home. Hero opens the film; the Ceremony Reel carries its back half.
 * Selected films, services index, testimonials and the booking band
 * arrive in Phase 4.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CeremonyReel />
    </>
  );
}
