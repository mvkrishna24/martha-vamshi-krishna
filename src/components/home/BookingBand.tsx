import Link from "next/link";
import { SectionHeading } from "@/components/motion/SectionHeading";

/**
 * Closing booking band — the film's last card. One SplitText moment on
 * the heading; everything else stays quiet. The real WhatsApp deep-link
 * and form land on /contact in Phase 9.
 */
export function BookingBand() {
  return (
    <section
      aria-labelledby="booking-heading"
      className="relative overflow-hidden border-t border-hairline"
    >
      <div className="container-site py-section">
        <SectionHeading
          id="booking-heading"
          eyebrow="Book a date"
          title="Hold a date before the season fills."
        />

        <p className="mt-8 max-w-md text-sm text-bone-dim">
          Wedding dates book months ahead. Tell me about yours — the venue,
          the ceremonies, the feeling you want the film to hold. I reply on
          WhatsApp.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Link
            href="/contact"
            className="border border-hairline px-8 py-4 font-mono text-caption uppercase tracking-mono text-bone transition-colors duration-300 hover:border-brass hover:text-brass"
          >
            Start a booking
          </Link>
          <Link href="/films" className="cta-book">
            Watch a film first
          </Link>
        </div>

        <p className="eyebrow mt-20">Reel ends · 00:07:30 · Fade to booking</p>
      </div>
    </section>
  );
}
