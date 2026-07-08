import { testimonials } from "@/content/testimonials";
import { Reveal } from "@/components/motion/Reveal";

export function Testimonials() {
  return (
    <section aria-labelledby="words-heading" className="container-site py-section">
      <p id="words-heading" className="eyebrow mb-16">
        In their words
      </p>

      <Reveal
        className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3"
        stagger={0.12}
      >
        {testimonials.map((t) => (
          <figure key={t.couple} data-reveal-item className="flex flex-col">
            <span aria-hidden className="font-display text-5xl leading-none text-brass/40">
              &ldquo;
            </span>
            <blockquote className="mt-4 flex-1 font-display text-2xl font-extralight leading-snug text-bone">
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 border-t border-hairline pt-4">
              <span className="block text-sm text-bone">{t.couple}</span>
              <span className="eyebrow mt-1 block">{t.city}</span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  );
}
