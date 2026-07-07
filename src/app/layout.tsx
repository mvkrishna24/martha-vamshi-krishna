import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.positioning}`,
    template: `%s — ${site.name}`,
  },
  description: `${site.subline} Wedding cinematography and photography across ${site.serviceAreas.join(", ")}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <GrainOverlay />
        <Nav />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
