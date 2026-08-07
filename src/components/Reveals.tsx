'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { measureProgress } from '@/hooks/useScrollProgress';
import { prefersReducedMotion, smoothstep, subscribeToScroll } from '@/lib/scrollDriver';

/**
 * Drives the scroll reveals.
 *
 * Opacity tracks scroll position every frame rather than firing a fixed 620ms
 * transition when an element crosses a threshold, so the motion is exactly as
 * fast as the reader is.
 *
 * Arrival LATCHES. Once an element is fully in it is dropped from the list and
 * never touched again. Prose that faded back out when you scrolled up to
 * re-read a sentence would be actively hostile, and this is an app people open
 * when their attention is already fragile. Continuous on the way in, solid
 * forever after.
 *
 * Deliberately NOT IntersectionObserver-gated. IO does not deliver while the
 * document is hidden, so gating on it means a page scrolled in a background tab
 * comes back with every paragraph still at `opacity: 0` — the hidden state is
 * the default here, which makes an observer that never fires indistinguishable
 * from a blank page. Measuring directly has no such failure mode, and the cost
 * is bounded because the list only shrinks: nineteen rect reads at the top of an
 * article, zero by the bottom.
 *
 * It only ever moves elements toward visible. The hidden state itself is gated
 * behind `html.reveal-ready`, which the inline script in the layout sets only
 * when JS is running and reduced motion is off — so this failing entirely means
 * everything stays visible rather than the page going blank.
 */
export function Reveals() {
  // Re-scan after client-side navigation, which swaps content without remount.
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('reveal-ready')) return;

    const settle = (el: HTMLElement) => {
      el.classList.add('is-in');
      el.style.opacity = '';
      el.style.transform = '';
      el.style.clipPath = '';
      el.style.willChange = '';
    };

    const pending = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'),
    );
    if (pending.length === 0) return;

    if (prefersReducedMotion()) {
      pending.forEach(settle);
      return;
    }

    pending.forEach((el) => {
      el.style.willChange = 'opacity, transform';
    });

    return subscribeToScroll(() => {
      /*
        At the very bottom there is no scroll left to give, so the last elements
        can never reach the threshold on their own and would sit permanently
        part-faded. Once the page cannot move further, everything still pending
        has arrived by definition.
      */
      const atEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atEnd) {
        pending.forEach(settle);
        pending.length = 0;
        return;
      }

      /*
        Two passes, never interleaved. Reading a rect after writing a style
        forces a synchronous layout; doing that per element would mean one
        forced reflow per reveal per frame. Read everything, then write
        everything, and the browser lays out once.
      */
      const progress = pending.map((el) => smoothstep(measureProgress(el, 'enter')));

      for (let i = pending.length - 1; i >= 0; i--) {
        const el = pending[i];
        const p = progress[i];

        if (p >= 1) {
          settle(el);
          pending.splice(i, 1);
          continue;
        }

        el.style.opacity = p.toFixed(3);

        const kind = el.dataset.reveal;
        if (kind === 'rise') {
          el.style.transform = `translateY(${((1 - p) * 14).toFixed(2)}px)`;
        } else if (kind === 'unmask') {
          el.style.clipPath = `inset(0 0 ${((1 - p) * 100).toFixed(1)}% 0)`;
          el.style.transform = `translateY(${((1 - p) * 6).toFixed(2)}px)`;
        }
      }
    });
  }, [pathname]);

  return null;
}
