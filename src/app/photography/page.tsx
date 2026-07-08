import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serviceGroups } from "@/content/services";
import { categoryBySlug } from "@/content/galleries";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Sixteen ways a wedding and a family are remembered — from haldi and muhurtham to maternity, newborn and half-saree galleries.",
};

export default function PhotographyIndex() {
  return (
    <div className="container-site py-section">
      <SectionHeading
        eyebrow="Photography"
        title="Sixteen ways a wedding is remembered."
      />

      <div className="mt-20 flex flex-col gap-20">
        {serviceGroups.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <div className="mb-8 flex items-baseline gap-4 border-b border-hairline pb-4">
              <h2 className="font-telugu text-2xl text-bone" lang="te">
                {group.te}
              </h2>
              <span className="eyebrow">{group.title}</span>
            </div>

            <Reveal
              className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4"
              stagger={0.06}
            >
              {group.services.map((service) => {
                const cover = categoryBySlug.get(service.slug)!.cover;
                return (
                  <Link
                    key={service.slug}
                    href={`/photography/${service.slug}`}
                    data-reveal-item
                    className="group block"
                  >
                    <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-thumb)] bg-ink-2">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-cover transition-transform duration-[5000ms] ease-out will-change-transform group-hover:scale-[1.06]"
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-1.5">
                      <span lang="te" className="font-telugu text-lg leading-tight text-bone transition-colors duration-300 group-hover:text-brass">
                        {service.te}
                      </span>
                      <span className="eyebrow">{service.en}</span>
                    </div>
                  </Link>
                );
              })}
            </Reveal>
          </section>
        ))}
      </div>
    </div>
  );
}
