import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60svh] flex-col justify-center py-section">
      <p className="eyebrow mb-6">Scene missing</p>
      <h1 className="max-w-[16ch] text-display-lg font-extralight text-bone">
        This frame didn&apos;t make the cut.
      </h1>
      <Link href="/" className="cta-book mt-12 self-start">
        Back to the beginning
      </Link>
    </section>
  );
}
