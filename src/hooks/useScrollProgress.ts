'use client';

import { useEffect, type RefObject } from 'react';

import { clamp01, prefersReducedMotion, subscribeToScroll } from '@/lib/scrollDriver';

/**
 * How an element's scroll position becomes a 0→1 number.
 *
 * `travel` — the element is taller than the viewport and holds a sticky child.
 *   0 when its top reaches the top of the viewport, 1 when its bottom does.
 *   This is the pinned-stage case: the diagram, the hero.
 *
 * `enter`  — the element is normal height and is arriving from below.
 *   0 when its top is at the bottom edge, 1 once it has risen into the upper
 *   reading zone. Deliberately reaches 1 early: prose that stays translucent
 *   while you are trying to read it is worse than no animation at all.
 *
 * `through` — the element's whole pass across the viewport, 0 as it appears at
 *   the bottom to 1 as it leaves at the top. The parallax range: unlike
 *   `travel` it does not require the element to be taller than the screen.
 */
export type ProgressMode = 'travel' | 'enter' | 'through';

/** Fraction of the viewport an `enter` element crosses before it is fully in. */
const ENTER_BAND = 0.45;

export function measureProgress(el: HTMLElement, mode: ProgressMode): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  const through = () => clamp01((vh - rect.top) / (vh + rect.height));

  if (mode === 'travel') {
    const distance = rect.height - vh;
    /*
      An element shorter than the viewport has no travel to measure. Returning
      a constant 0 here is the worst kind of bug — nothing errors, the effect
      still runs, and the animation is simply frozen at its start value on any
      screen tall enough to swallow the element. Fall through to the pass-across
      measurement instead, which is defined at every height.
    */
    if (distance <= 0) return through();
    return clamp01(-rect.top / distance);
  }

  if (mode === 'through') return through();

  return clamp01((vh - rect.top) / (vh * ENTER_BAND));
}

/**
 * Calls `onProgress` with a continuous 0→1 on every frame the page moves.
 *
 * The callback is expected to write `transform` / `opacity` / `filter` straight
 * to the DOM. It deliberately does NOT set React state: at 60fps that would be
 * a re-render per frame, which is the difference between motion that tracks
 * your finger and motion that stutters.
 *
 * Under reduced motion it fires once with the resting value and never
 * subscribes, so no loop ever starts.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  {
    mode = 'travel',
    enabled = true,
    /**
     * The single value used instead of scrolling when motion is turned off.
     * Defaults to 1, meaning "arrived" — a drawing is complete, a reveal is
     * visible. Anything centred on the midpoint of its range, like a parallax
     * offset, should pass 0.5 so it rests where it was authored.
     */
    restingProgress = 1,
  }: { mode?: ProgressMode; enabled?: boolean; restingProgress?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    if (prefersReducedMotion()) {
      onProgress(restingProgress);
      return;
    }

    return subscribeToScroll(() => onProgress(measureProgress(el, mode)));
  }, [ref, onProgress, mode, enabled, restingProgress]);
}
