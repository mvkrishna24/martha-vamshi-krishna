import Link from "next/link";
import { serviceGroups } from "@/content/services";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The full 16-service taxonomy as a bilingual typographic index —
 * Telugu display over English mono, grouped Weddings / Family. Rendered
 * as an index rather than 16 separate links; the section CTA leads into
 * the galleries (deep-links land in Phase 5).
 */
export function ServicesIndex() {
  return (
    <section
      aria-labelledby="services-heading"
      className="border-t border-hairline bg-ink-2/40"
    >
      <div className="container-site py-section">
        <SectionHeading
          id="services-heading"
          eyebrow="Services"
          title="Everything a family remembers."
          align="between"
        />

        <div className="mt-16 flex flex-col gap-16">
          {serviceGroups.map((group) => (
            <div key={group.title}>
              <div className="mb-8 flex items-baseline gap-4 border-b border-hairline pb-4">
                <h3 className="font-telugu text-2xl text-bone" lang="te">
                  {group.te}
                </h3>
                <span className="eyebrow">{group.title}</span>
              </div>

              <Reveal
                className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4"
                stagger={0.05}
              >
                {group.services.map((service, i) => (
                  <div
                    key={service.slug}
                    data-reveal-item
                    className="flex items-start gap-3"
                  >
                    <span className="eyebrow mt-1 text-brass tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span lang="te" className="font-telugu text-lg leading-tight text-bone">
                        {service.te}
                      </span>
                      <span className="eyebrow">{service.en}</span>
                    </span>
                  </div>
                ))}
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-hairline pt-8">
          <Link href="/photography" className="cta-book">
            See the galleries
          </Link>
        </div>
      </div>
    </section>
  );
}
