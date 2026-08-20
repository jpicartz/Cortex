/**
 * Reading `<html>`'s classes as an external store.
 *
 * Two flags live on the root element rather than in React, and both are set by
 * the inline script in the layout before first paint: `dark` (the theme) and
 * `reveal-ready` (JS is running AND motion is welcome). Both were previously
 * copied into state inside a mount effect, which is the pattern
 * `react-hooks/set-state-in-effect` flags — and it flags it for a real reason:
 * it renders once with the wrong value, then again with the right one.
 *
 * `useSyncExternalStore` is the intended tool. The subscribe functions are
 * module-level constants on purpose: a fresh closure each render makes React
 * tear down and re-establish the subscription on every render.
 */

const NOOP = () => {};

/** Watches for class changes on `<html>`, which is how the theme toggle works. */
export function subscribeToRootClass(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => observer.disconnect();
}

/**
 * For flags the inline script sets once and nothing ever changes again.
 * Subscribing would cost a MutationObserver for an event that cannot happen.
 */
export function subscribeNever(): () => void {
  return NOOP;
}

export const getIsDark = () => document.documentElement.classList.contains('dark');
export const getRevealReady = () => document.documentElement.classList.contains('reveal-ready');

/*
  Server snapshots are both `false`, which is what the old mount-effect versions
  also rendered on the server. Nothing in the markup depends on either being
  right before hydration: the theme is already applied to `<html>` by the inline
  script, and the non-scroll layout is the correct fallback.
*/
export const getFalse = () => false;
