/**
 * Progressive frame-sequence player for the hero canvas.
 *
 * Loads frames in coarse-to-fine passes (every 8th, 4th, 2nd, then all)
 * so scrubbing works within a few hundred ms of hydration and sharpens
 * as the rest arrives. Draws the nearest loaded frame while gaps remain.
 */
export class FrameSequence {
  private bitmaps: (ImageBitmap | undefined)[];
  private ctx: CanvasRenderingContext2D;
  private abort = new AbortController();
  private dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  private progress = 0;
  private firstDrawn = false;

  onFirstDraw?: () => void;

  constructor(
    private canvas: HTMLCanvasElement,
    private count: number,
    private src: (i: number) => string,
  ) {
    this.bitmaps = new Array(count);
    this.ctx = canvas.getContext("2d")!;
  }

  resize() {
    this.canvas.width = Math.round(this.canvas.clientWidth * this.dpr);
    this.canvas.height = Math.round(this.canvas.clientHeight * this.dpr);
    this.render();
  }

  async preload() {
    for (const step of [8, 4, 2, 1]) {
      if (this.abort.signal.aborted) return;
      const indices: number[] = [];
      for (let i = 0; i < this.count; i += step) {
        if (!this.bitmaps[i]) indices.push(i);
      }
      await this.loadBatch(indices);
    }
  }

  private async loadBatch(indices: number[]) {
    let cursor = 0;
    const worker = async () => {
      while (cursor < indices.length && !this.abort.signal.aborted) {
        const i = indices[cursor++];
        try {
          const res = await fetch(this.src(i), { signal: this.abort.signal });
          if (!res.ok) continue;
          this.bitmaps[i] = await createImageBitmap(await res.blob());
        } catch {
          return; // aborted or offline — poster stays up
        }
        if (!this.firstDrawn || Math.abs(i - this.frameAt(this.progress)) < 8) {
          this.render();
        }
      }
    };
    await Promise.all(Array.from({ length: 6 }, worker));
  }

  private frameAt(p: number) {
    return Math.max(0, Math.min(this.count - 1, Math.round(p * (this.count - 1))));
  }

  draw(progress: number) {
    this.progress = progress;
    this.render();
  }

  private render() {
    const target = this.frameAt(this.progress);
    let bmp: ImageBitmap | undefined;
    for (let d = 0; d < this.count && !bmp; d++) {
      bmp = this.bitmaps[target - d] ?? this.bitmaps[target + d];
    }
    if (!bmp) return;

    const { width: cw, height: ch } = this.canvas;
    if (!cw || !ch) return;
    const scale = Math.max(cw / bmp.width, ch / bmp.height);
    const w = bmp.width * scale;
    const h = bmp.height * scale;
    this.ctx.drawImage(bmp, (cw - w) / 2, (ch - h) / 2, w, h);

    if (!this.firstDrawn) {
      this.firstDrawn = true;
      this.onFirstDraw?.();
    }
  }

  destroy() {
    this.abort.abort();
    for (const bmp of this.bitmaps) bmp?.close();
    this.bitmaps.length = 0;
  }
}
