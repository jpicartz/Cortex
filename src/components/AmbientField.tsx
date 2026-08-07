'use client';

import { useEffect, useRef } from 'react';

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
 */
export function AmbientField() {
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
      style={{ contain: 'strict' }}
    >
      <div ref={ref} style={{ willChange: 'transform' }} className="absolute inset-0">
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>
    </div>
  );
}
