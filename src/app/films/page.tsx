import type { Metadata } from "next";
import { PageStub } from "@/components/PageStub";

export const metadata: Metadata = { title: "Films" };

export default function Page() {
  return <PageStub eyebrow="Films" title="Wedding cinematography." />;
}
