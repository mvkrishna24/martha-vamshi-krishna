import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = { title: "Photography" };

export default function Page() {
  return <PageStub eyebrow="Photography" title="Sixteen ways a wedding is remembered." />;
}
