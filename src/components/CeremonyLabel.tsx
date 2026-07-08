import type { CeremonyLabelData } from "@/content/site";

const teSizes = {
  sm: "text-xl",
  md: "text-display-md",
  lg: "text-display-lg",
} as const;

/**
 * The bilingual label pair — core brand atom, used identically everywhere.
 * Telugu serif above (display, bone), English mono below (caption, dim).
 * Never reversed.
 */
export function CeremonyLabel({
  ceremony,
  size = "sm",
  className = "",
}: {
  ceremony: CeremonyLabelData;
  size?: keyof typeof teSizes;
  className?: string;
}) {
  return (
    <span className={`flex flex-col gap-1.5 ${className}`}>
      <span lang="te" className={`font-telugu text-bone ${teSizes[size]}`}>
        {ceremony.te}
      </span>
      <span className="eyebrow">{ceremony.en}</span>
    </span>
  );
}
