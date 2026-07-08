import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return <PageStub eyebrow="Contact" title="Hold a date." />;
}
