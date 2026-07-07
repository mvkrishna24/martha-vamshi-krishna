import { CeremonyLabel } from "@/components/CeremonyLabel";
import { reelCeremonies, site } from "@/content/site";

/**
 * Phase 1 placeholder home. The real hero (canvas frame sequence) and
 * Ceremony Reel arrive in Phases 2–3; this static composition proves
 * the type system, tokens, and shell.
 */
export default function Home() {
  return (
    <>
      <section className="container-site flex min-h-[calc(100svh-4rem)] flex-col justify-center">
        <p className="eyebrow mb-8">{site.positioning}</p>
        <h1 className="max-w-[12ch] text-display-xl font-extralight text-bone">
          Telugu weddings, told like{" "}
          <span className="text-brass">cinema</span>.
        </h1>
        <div className="mt-16 flex items-center justify-between">
          <p className="eyebrow">00:00:00</p>
          <p className="eyebrow">Scroll</p>
          <p className="eyebrow">35MM · GODAVARI · 2026</p>
        </div>
      </section>

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
