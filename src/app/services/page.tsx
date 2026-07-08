import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = { title: "Services" };

export default function Page() {
  return <PageStub eyebrow="Services" title="What a booking includes." />;
}
