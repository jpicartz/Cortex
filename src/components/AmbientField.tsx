'use client';

import { useEffect, useRef } from 'react';

import type { Signature } from '@/content/schema';
import { clamp01, prefersReducedMotion, subscribeToScroll } from '@/lib/scrollDriver';

/**
 * The ambient field behind the whole page.
 *
 * This is what stops the site reading as a deck of slides. Sections used to
 * start and end cleanly against a flat background, so each one arrived as its
 * own panel; one field running unbroken underneath means a section boundary is
 * no longer a visual event.
 *
 * Three deliberate choices:
 *
 * Only `transform` is written per frame. The blobs carry a static
 * `radial-gradient` and never have their `background-image` touched, because
 * rewriting a gradient on a viewport-sized layer repaints it every frame — the
 * one thing guaranteed to make an ambient background cost more than it is worth.
 *
 * The autonomous drift is a CSS animation, not JS. It should keep breathing when
 * the page is still, and `prefers-reduced-motion` already switches it off in
 * globals.css without this component knowing anything about it.
 *
 * Alpha is a token, not a constant. The same field that reads as atmosphere on a
 * dark background is a haze over text on a light one, so light mode gets its own
 * value — this sits behind every word on the site, unlike the Cajal tracery
 * which is confined to the margin.
 *
 * The state's signature sets the TEMPO and nothing else. Alpha, hue and geometry
 * are untouched, because those are what the contrast sweep measured and they are
 * not free parameters. Anxiety and no-motivation should not breathe at the same
 * rate behind the text; that is the whole of the difference.
 */

/*
 * Tempo by signature, in three groups rather than fifteen bespoke numbers.
 * Grouping is the honest resolution here: the difference between a field that
 * breathes fast and one that barely moves is felt, and nobody is going to
 * perceive fifteen distinct rates. Anything unlisted rests at 1.
 */
const DRIFT_SCALE: Partial<Record<Signature, number>> = {
  /* Fast and unsettled. */
  erratic: 0.62,
  spike: 0.62,
  runaway: 0.68,
  layered: 0.68,
  /* Barely moving. */
  flat: 1.7,
  slow: 1.7,
  stall: 1.45,
  settle: 1.45,
};

export function AmbientField({ signature }: { signature?: Signature } = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    return subscribeToScroll(() => {
      /*
        Document progress, not element progress: this layer is `fixed`, so its
        own rect never changes and measuring it would return a constant.
      */
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? clamp01(window.scrollY / scrollable) : 0;

      // Small travel on purpose. The field should feel like it has depth, not
      // like a second page sliding around behind the first.
      el.style.transform = `translate3d(0, ${(p * -90).toFixed(2)}px, 0)`;
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      style={
        {
          contain: 'strict',
          '--drift-scale': signature ? (DRIFT_SCALE[signature] ?? 1) : 1,
        } as React.CSSProperties
      }
    >
      <div ref={ref} style={{ willChange: 'transform' }} className="absolute inset-0">
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>
    </div>
  );
}
