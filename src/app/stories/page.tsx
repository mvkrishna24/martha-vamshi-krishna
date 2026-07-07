import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = { title: "Wedding Stories" };

export default function Page() {
  return <PageStub eyebrow="Wedding Stories" title="Three weddings, told in full." />;
}
