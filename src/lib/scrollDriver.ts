/**
 * One rAF loop for the whole page.
 *
 * Every scroll-linked effect on the site subscribes here rather than attaching
 * its own listener. That matters for smoothness: N components with N listeners
 * and N rAF loops means N independent measurements per frame, each able to read
 * layout at a slightly different moment. One loop measures once and everything
 * moves together.
 *
 * Subscribers are called on each frame while scrolling and for a couple of
 * frames afterwards, then the loop stops entirely — an idle page costs nothing.
 */

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();

let rafId = 0;
let dirty = true;
let idleFrames = 0;

/**
 * Frames to keep running after the last scroll event. Smooth-scroll momentum
 * and the tail of a trackpad flick can land between events; stopping on the
 * very first quiet frame makes those drop their final pixel of motion.
 */
const IDLE_GRACE = 2;

function loop() {
  rafId = 0;

  if (dirty) {
    dirty = false;
    idleFrames = 0;
  } else if (++idleFrames > IDLE_GRACE) {
    return;
  }

  for (const fn of subscribers) fn();

  rafId = requestAnimationFrame(loop);
}

function start() {
  if (rafId || subscribers.size === 0) return;
  rafId = requestAnimationFrame(loop);
}

function wake() {
  dirty = true;

  /*
    A hidden document does not run requestAnimationFrame AT ALL — not throttled,
    stopped. A frame scheduled here would never fire, `rafId` would stay set, and
    every later wake would be swallowed by the guard in `start()`, leaving every
    subscriber frozen at a stale position for the rest of the session.

    Nothing is painting, so measuring inline is both cheap and correct. This also
    keeps the automated checks honest, since they drive a hidden preview pane.
  */
  if (typeof document !== 'undefined' && document.hidden) {
    dirty = false;
    for (const fn of subscribers) fn();
    return;
  }

  start();
}

/*
  rAF does not run while the document is hidden, so any scrolling that happened
  in a background tab was never measured. Wake on the way back rather than
  waiting for a scroll event that may never come — this is the same trap that
  once made the brain diagram look permanently frozen.
*/
function attach() {
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', wake, { passive: true });
  document.addEventListener('visibilitychange', wake);
}

function detach() {
  window.removeEventListener('scroll', wake);
  window.removeEventListener('resize', wake);
  document.removeEventListener('visibilitychange', wake);
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
}

/** Subscribe to per-frame scroll updates. Returns an unsubscribe. */
export function subscribeToScroll(fn: Subscriber): () => void {
  const first = subscribers.size === 0;
  subscribers.add(fn);
  if (first) attach();

  // Measure immediately so a component mounting mid-page is correct on frame 1.
  fn();
  wake();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) detach();
  };
}

/** True when the visitor has asked for less motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Smooth acceleration and deceleration. Nothing here should start abruptly. */
export function smoothstep(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return x * x * (3 - 2 * x);
}

export function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
