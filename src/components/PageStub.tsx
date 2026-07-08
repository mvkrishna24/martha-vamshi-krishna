import Link from "next/link";

/**
 * Interim page shell for routes whose build phase hasn't arrived yet.
 * Replaced section by section; keeps navigation coherent meanwhile.
 */
export function PageStub({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="container-site flex min-h-[60svh] flex-col justify-center py-section">
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h1 className="max-w-[16ch] text-display-lg font-extralight text-bone">{title}</h1>
      <p className="mt-8 max-w-md text-sm text-bone-dim">
        This page is in the edit. It arrives with a later cut of the site.
      </p>
      <Link href="/contact" className="cta-book mt-12 self-start">
        Book a date
      </Link>
    </section>
  );
}
