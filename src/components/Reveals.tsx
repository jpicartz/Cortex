'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Drives the scroll reveals.
 *
 * No dependency and no scroll listener: one IntersectionObserver, and each
 * element is unobserved the moment it has arrived, so this costs nothing once
 * the page has been read through.
 *
 * It only ever ADDS the visible class. The hidden state is gated behind
 * `html.reveal-ready`, which the inline script in the layout sets only when JS
 * is running and reduced motion is off — so this failing means everything
 * stays visible rather than the page going blank.
 */
export function Reveals() {
  // Re-scan after client-side navigation, which swaps content without remount.
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('reveal-ready')) return;

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      {
        // Start slightly before the element reaches the viewport so the motion
        // reads as the page settling, not as content arriving late.
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.01,
      },
    );

    targets.forEach((el) => observer.observe(el));

    /*
      Anything already above the fold on load should not wait for a scroll
      event that may never come — reveal it on the next frame instead.
    */
    const raf = requestAnimationFrame(() => {
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('is-in');
          observer.unobserve(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
