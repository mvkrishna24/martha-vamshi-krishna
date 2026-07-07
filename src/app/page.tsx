import { CeremonyLabel } from "@/components/CeremonyLabel";
import { Hero } from "@/components/hero/Hero";
import { reelCeremonies } from "@/content/site";

/**
 * Home. The ceremonies strip below the hero is a Phase 2 placeholder —
 * it becomes the pinned Ceremony Reel in Phase 3.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-t border-hairline">
        <div className="container-site py-section">
          <p className="eyebrow mb-14">One wedding, start to finish</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {reelCeremonies.map((c) => (
              <li key={c.en}>
                <CeremonyLabel ceremony={c} size="md" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
