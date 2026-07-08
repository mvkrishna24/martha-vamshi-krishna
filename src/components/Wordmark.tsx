/**
 * The RD wordmark. The dot is kumkuma — one of its three sanctioned uses.
 */
export function Wordmark({ className = "text-2xl" }: { className?: string }) {
  return (
    <span className={`font-display font-extralight leading-none text-bone ${className}`}>
      RD<span className="text-kumkuma">.</span>
    </span>
  );
}
