import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, categoryBySlug } from "@/content/galleries";
import { Gallery } from "@/components/photography/Gallery";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const found = categoryBySlug.get(category);
  if (!found) return {};
  return {
    title: found.service.en,
    description: `${found.service.en} — ${found.service.note}`,
  };
}

export default async function CategoryGallery({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const found = categoryBySlug.get(category);
  if (!found) notFound();

  const { service, images } = found;

  return (
    <div className="container-site py-section">
      <Link href="/photography" className="eyebrow inline-block transition-colors hover:text-bone">
        ← All photography
      </Link>

      <header className="mt-10 mb-16 flex flex-col gap-4 border-b border-hairline pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <h1 lang="te" className="font-telugu text-display-md text-bone">
            {service.te}
          </h1>
          <p className="eyebrow">{service.en}</p>
        </div>
        <p className="max-w-xs text-sm text-bone-dim sm:text-right">
          {service.note}
        </p>
      </header>

      <Gallery images={images} />

      <div className="mt-20 border-t border-hairline pt-8">
        <Link href="/contact" className="cta-book">
          Book {service.en.toLowerCase()}
        </Link>
      </div>
    </div>
  );
}
