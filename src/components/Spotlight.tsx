'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Feeds cursor position to every `.spotlight` surface on the page.
 *
 * One delegated listener on the document rather than one per card: ten cards
 * with ten listeners each writing styles on every mouse move is a lot of work
 * for a highlight. This writes two custom properties on whichever card the
 * cursor is actually over, once per frame.
 *
 * Never attaches for a coarse pointer. On touch there is no cursor to follow,
 * the CSS already declines to show the highlight, and the work would be pure
 * waste on exactly the devices with the least to spare.
 */
export function Spotlight() {
  // Cards are replaced on client-side navigation; the listener is delegated so
  // it survives that, but the pathname dep keeps the effect honest if the
  // pointer capability changes (a tablet gaining a trackpad, say).
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      pending = null;
    };

    const onMove = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>('.spotlight');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      pending = { el: target, x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
