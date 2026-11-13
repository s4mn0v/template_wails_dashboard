// Circular-reveal transition: the new theme grows out of `origin` as an
// expanding circle until it covers the window.
//
// Preferred path: the View Transitions API — the browser snapshots the old
// page, `update` runs, and we only animate the clip-path of the new snapshot.
// Fallback (webviews without it, e.g. older WebKitGTK): an overlay filled
// with the new backdrop color grows from the origin, the theme is applied
// underneath it while it's fully opaque, then the overlay fades away.

export interface Point {
  x: number;
  y: number;
}

const DURATION_MS = 520;
const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

let running = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Radius needed for a circle at `o` to cover the whole viewport. */
function coverRadius(o: Point): number {
  return Math.hypot(Math.max(o.x, window.innerWidth - o.x), Math.max(o.y, window.innerHeight - o.y));
}

function clipFrames(o: Point): Keyframe[] {
  return [
    { clipPath: `circle(0px at ${o.x}px ${o.y}px)` },
    { clipPath: `circle(${coverRadius(o)}px at ${o.x}px ${o.y}px)` },
  ];
}

async function viaViewTransition(origin: Point, update: () => void): Promise<void> {
  const transition = document.startViewTransition(update);
  await transition.ready;
  document.documentElement.animate(clipFrames(origin), {
    duration: DURATION_MS,
    easing: EASING,
    pseudoElement: "::view-transition-new(root)",
  });
  await transition.finished;
}

async function viaOverlay(origin: Point, update: () => void, fill: string): Promise<void> {
  const overlay = document.createElement("div");
  overlay.className = "theme-reveal-overlay";
  overlay.style.backgroundColor = fill;
  document.body.appendChild(overlay);
  try {
    await overlay.animate(clipFrames(origin), { duration: DURATION_MS, easing: EASING, fill: "forwards" }).finished;
    update();
    await overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, easing: "ease-out", fill: "forwards" })
      .finished;
  } finally {
    overlay.remove();
  }
}

/**
 * Runs `update` (which must apply the new theme synchronously) behind a
 * circular reveal from `origin`. `fill` is the new theme's backdrop color,
 * used only by the fallback path. Overlapping calls and reduced-motion users
 * get an instant switch.
 */
export async function circularReveal(origin: Point, update: () => void, fill: string): Promise<void> {
  if (running || prefersReducedMotion()) {
    update();
    return;
  }
  running = true;
  try {
    if (typeof document.startViewTransition === "function") {
      await viaViewTransition(origin, update);
    } else {
      await viaOverlay(origin, update, fill);
    }
  } finally {
    running = false;
  }
}
