"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryImage } from "@/content/galleries";

/**
 * Accessible image lightbox. Keyboard: Esc closes, ←/→ navigate. Touch:
 * swipe left/right navigates. Focus is trapped while open and restored to
 * the trigger on close. Background scroll is locked. role=dialog +
 * aria-modal, live region announces the current frame.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const image = images[index];
  const count = images.length;

  const go = useCallback(
    (dir: number) => onNavigate((index + dir + count) % count),
    [index, count, onNavigate],
  );

  // capture the trigger to restore focus, lock scroll, focus the dialog
  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, []);

  // keyboard: esc / arrows / focus trap
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${count}`}
      className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* top bar */}
      <div className="flex w-full shrink-0 items-center justify-between px-(--spacing-gutter) py-5">
        <p className="eyebrow tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="eyebrow text-bone transition-colors hover:text-brass"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Close ✕
        </button>
      </div>

      {/* stage */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-(--spacing-gutter) pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Previous image"
          className="absolute left-2 z-10 p-4 font-mono text-bone-dim transition-colors hover:text-bone sm:left-6"
          onClick={() => go(-1)}
        >
          ←
        </button>

        <figure className="flex max-h-full flex-col items-center justify-center">
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="h-auto max-h-[74svh] w-auto max-w-full object-contain"
            priority
          />
          <figcaption className="eyebrow mt-4 shrink-0 text-center">
            {image.meta}
          </figcaption>
        </figure>

        <button
          type="button"
          aria-label="Next image"
          className="absolute right-2 z-10 p-4 font-mono text-bone-dim transition-colors hover:text-bone sm:right-6"
          onClick={() => go(1)}
        >
          →
        </button>
      </div>

      <p aria-live="polite" className="sr-only">
        Image {index + 1} of {count}. {image.alt}
      </p>
    </div>
  );
}
