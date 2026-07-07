import Link from "next/link";
import { footerLinks, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="container-site pb-10 pt-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow mb-4">{site.positioning}</p>
            <p className="max-w-sm font-display text-display-md font-extralight text-bone">
              {site.subline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-5">Index</p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={site.social.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={site.social.youtube}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm text-bone-dim transition-colors duration-300 hover:text-bone"
                >
                  YouTube
                </a>
              </li>
            </ul>
            <p className="eyebrow mt-10 mb-3">Serving</p>
            <p className="text-sm text-bone-dim">
              {site.serviceAreas.join(" · ")}
            </p>
          </div>
        </div>

        {/* the RD wordmark, large — set as type, clipped at the baseline */}
        <p
          aria-hidden
          className="mt-24 select-none overflow-hidden font-display text-[26vw] font-extralight leading-[0.78] text-bone/10 md:text-[20vw]"
        >
          RD<span className="text-kumkuma/25">.</span>
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <p className="eyebrow">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="eyebrow">35MM · GODAVARI · MMXXVI</p>
        </div>
      </div>
    </footer>
  );
}
