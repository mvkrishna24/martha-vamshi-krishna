import { Hero } from "@/components/hero/Hero";
import { CeremonyReel } from "@/components/reel/CeremonyReel";
import { SelectedFilms } from "@/components/home/SelectedFilms";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingBand } from "@/components/home/BookingBand";

/**
 * Home. Hero opens the film; the Ceremony Reel carries its back half;
 * the remainder walks selected films, the full services taxonomy, a few
 * words from couples, and the closing booking band.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <CeremonyReel />
      <SelectedFilms />
      <ServicesIndex />
      <Testimonials />
      <BookingBand />
    </>
  );
}
