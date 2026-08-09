'use client';

import { useCallback, useEffect, useRef } from 'react';

import { subscribeToScroll } from '@/lib/scrollDriver';

export type RailSection = { id: string; label: string };

/**
 * A numbered rail down the empty left margin, marking where you are.
 *
 * It exists for two reasons at once. It answers "this page reads like a
 * document" — a numbered structure you can see is the clearest signal that a
 * page is something you move through rather than an article you scroll. And it
 * puts the dead margin to work; the right margin already belongs to the Cajal
 * tracery.
 *
 * Gated to `xl`, the width at which the margin can hold it in every column
 * configuration. See the className for the arithmetic.
 *
 * Deliberately not an IntersectionObserver: this rides the same rAF loop as
 * every other scroll-linked thing on the site, so there is one measurement pass
 * per frame rather than two systems disagreeing about where the page is. It
 * writes DOM directly and never sets state per frame.
 */
export function SectionRail({ sections }: { sections: RailSection[] }) {
  const hostRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);

  const measure = useCallback(() => {
    const host = hostRef.current;
    /*
      NOT `offsetParent === null`: that is always true for a fixed element, so
      the previous check would have early-returned on every frame and frozen the
      rail the moment it stopped being absolutely positioned. A zero-width rect
      is the honest test for `display: none`, whatever the position value.
    */
    if (!host || host.getBoundingClientRect().width === 0) return;

    /*
      "Active" is the last section whose top has passed the reading line, at a
      third of the viewport rather than the very top. Using the top edge would
      flip the marker while the previous section still fills most of the screen.
    */
    const line = window.innerHeight / 3;
    let active = 0;
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id);
      if (el && el.getBoundingClientRect().top <= line) active = i;
    }

    /*
      The last section usually starts closer to the bottom than the reading line
      is to the top, so there is no scroll left to carry it past the line and it
      could never be marked. On this page `sources` begins at 6542px in a
      document that stops scrolling at 6037. Once the page cannot move further,
      whatever is last is what you are looking at.
    */
    const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atEnd) active = sections.length - 1;

    if (progressRef.current && sections.length > 1) {
      const share = active / (sections.length - 1);
      progressRef.current.style.transform = `scaleY(${share.toFixed(3)})`;
    }

    if (active === activeRef.current) return;
    activeRef.current = active;

    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const on = i === active;
      el.dataset.active = String(on);
      el.setAttribute('aria-current', on ? 'true' : 'false');
    });
  }, [sections]);

  /*
    `useEffect` only ever runs on the client after mount, so there is no need to
    gate this behind a mounted flag — and the flag was a `setState` inside an
    effect, which is the exact pattern the lint rule objects to.
  */
  useEffect(() => subscribeToScroll(measure), [measure]);

  return (
    <nav
      ref={hostRef}
      aria-label={sections.map((s) => s.label).join(', ')}
      /*
        Fixed to the viewport, not absolute inside the article.

        Absolute meant the rail lived in a margin whose width is a function of
        the content column — so widening the column would have silently slid the
        rail under the text. Fixed positioning takes it out of that relationship
        entirely. The breakpoint is where the space provably exists: at 1280px
        with a 768px column each margin is 256px, and at 1440px with the widened
        896px column it is 272px. This needs 200 in both cases.
      */
      className="pointer-events-none fixed inset-y-0 left-0 z-10 hidden w-44 pl-6 xl:block"
    >
      <div className="pointer-events-auto flex h-full flex-col justify-center">
        <div className="relative pl-4">
          {/* Track, and the filled portion of it. */}
          <span aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-px bg-edge" />
          <span
            ref={progressRef}
            aria-hidden="true"
            className="absolute bottom-1 left-0 top-1 w-px origin-top bg-accent transition-transform duration-300 ease-out"
            style={{ transform: 'scaleY(0)' }}
          />

          <ol className="space-y-3.5">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={`#${section.id}`}
                  data-active="false"
                  className="group flex items-baseline gap-2.5 text-fg-mute transition-colors hover:text-fg data-[active=true]:text-fg"
                >
                  <span className="text-[0.625rem] tabular-nums text-fg-mute transition-colors group-data-[active=true]:text-accent-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs leading-snug">{section.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
