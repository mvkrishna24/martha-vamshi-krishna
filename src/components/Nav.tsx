"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/site";
import { Wordmark } from "@/components/Wordmark";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-ink/85 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="container-site flex h-16 items-center justify-between"
      >
        <Link href="/" aria-label="RD Photography — home" className="shrink-0">
          <Wordmark />
        </Link>

        {/* desktop */}
        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="font-mono text-caption uppercase tracking-mono text-bone-dim transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
                >
                  {link.label}
                </Link>
                {/* active marker — sanctioned kumkuma use */}
                {isActive(link.href) && (
                  <span
                    aria-hidden
                    className="absolute -bottom-2 left-1/2 size-[3px] -translate-x-1/2 bg-kumkuma"
                  />
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="cta-book">
            Book a date
          </Link>
        </div>

        {/* mobile trigger */}
        <button
          type="button"
          className="eyebrow text-bone md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* mobile overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-16 z-40 flex flex-col justify-between bg-ink px-(--spacing-gutter) pb-10 pt-14 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-7">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="flex items-baseline gap-4 font-display text-display-md font-extralight text-bone"
              >
                <span className="eyebrow w-6">0{i + 1}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="cta-book self-start">
          Book a date
        </Link>
      </div>
    </header>
  );
}
