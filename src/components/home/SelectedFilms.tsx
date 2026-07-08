import Image from "next/image";
import Link from "next/link";
import { films } from "@/content/films";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/** film card — still with slow hover scale drift + caption */
function FilmCard({
  film,
  priority = false,
  sizes,
}: {
  film: (typeof films)[number];
  priority?: boolean;
  sizes: string;
}) {
  return (
    <Link
      href="/films"
      data-reveal-item
      className="group block"
      aria-label={`${film.couple} — wedding film`}
    >
      <div className="relative aspect-video overflow-hidden bg-ink-2">
        <Image
          src={film.still}
          alt={film.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[6000ms] ease-out will-change-transform group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 eyebrow bg-ink/50 px-2 py-1 backdrop-blur-sm">
          {film.runtime}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-display-md font-extralight text-bone transition-colors duration-300 group-hover:text-brass">
          {film.couple}
        </h3>
        <span className="eyebrow shrink-0">{film.year}</span>
      </div>
      <p className="mt-2 max-w-md text-sm text-bone-dim">{film.logline}</p>
      <p className="eyebrow mt-3">{film.venue}</p>
    </Link>
  );
}

export function SelectedFilms() {
  const [lead, ...rest] = films;

  return (
    <section aria-labelledby="films-heading" className="container-site py-section">
      <SectionHeading
        id="films-heading"
        eyebrow="Selected Films"
        title="A few weddings, told in full."
        align="between"
      />

      <Reveal className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <FilmCard
            film={lead}
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-16 lg:col-span-4 lg:pt-24">
          {rest.map((film) => (
            <FilmCard
              key={film.slug}
              film={film}
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
          ))}
        </div>
      </Reveal>

      <div className="mt-16 border-t border-hairline pt-8">
        <Link href="/films" className="cta-book">
          All films
        </Link>
      </div>
    </section>
  );
}
