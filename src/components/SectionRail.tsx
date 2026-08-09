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
 * puts the dead margin to work: at 1470px the prose column leaves ~350px of
 * nothing on each side, and the right one already belongs to the Cajal tracery.
 *
 * Gated to `xl`, because below that the margin it lives in does not exist.
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
    if (!host || host.offsetParent === null) return;

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
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-screen -translate-x-1/2 xl:block"
    >
      <div className="absolute left-6 top-0 h-full w-44">
        <div className="sticky top-1/3 pointer-events-auto">
          <div className="relative pl-4">
            {/* Track, and the filled portion of it. */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 w-px bg-edge"
            />
            <span
              ref={progressRef}
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-1 w-px origin-top bg-accent transition-transform duration-300 ease-out"
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
                    className="group flex items-baseline gap-2.5 text-fg-mute transition-colors data-[active=true]:text-fg hover:text-fg"
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
      </div>
    </nav>
  );
}
