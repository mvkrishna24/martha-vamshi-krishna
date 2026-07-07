import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return <PageStub eyebrow="About" title="The eye behind the frame." />;
}
