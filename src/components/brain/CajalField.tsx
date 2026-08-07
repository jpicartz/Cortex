'use client';

import { useCallback, useRef } from 'react';

import { useScrollProgress } from '@/hooks/useScrollProgress';
import { clamp01, smoothstep } from '@/lib/scrollDriver';
import { CAJAL_PATHS, CAJAL_VIEWBOX } from './cajal';

/**
 * The neuron draws itself as the page scrolls.
 *
 * Deliberately confined to the margin and only above `xl`. Running hairlines
 * behind body copy changes the local contrast of the text pixel by pixel in a
 * way no ratio check would catch and no reader would thank you for — so on any
 * viewport narrow enough that the drawing would sit under the words, it simply
 * does not render. Decoration belongs in the space the text is not using.
 *
 * `pathLength={1}` normalises every path to a 0→1 scale regardless of its true
 * length, so the draw needs no `getTotalLength()` measurement and is correct on
 * the server, before hydration, and at any size.
 */

/** Share of total scroll spent starting new paths; the rest lets the last finish. */
const STAGGER_SPAN = 0.72;
/** Share of total scroll any single path takes to draw. */
const DRAW_WINDOW = 0.3;

export function CajalField({ side = 'right' }: { side?: 'left' | 'right' }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const groupRef = useRef<SVGGElement>(null);

  const onProgress = useCallback((p: number) => {
    const paths = pathRefs.current;

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (!path) continue;
      const start = (i / paths.length) * STAGGER_SPAN;
      const local = smoothstep(clamp01((p - start) / DRAW_WINDOW));
      path.style.strokeDashoffset = String(1 - local);
    }

    /*
      A little slower than the page itself. The parallax is what stops it
      reading as a sticker on the side of the article.
    */
    if (groupRef.current) {
      groupRef.current.style.transform = `translateY(${(p * -70).toFixed(2)}px)`;
    }
  }, []);

  /*
    `through`, not `travel`: this spans whatever column it is dropped into, and
    the menu page's is shorter than a tall viewport. Measuring the whole pass
    across the screen is defined at every height.
  */
  useScrollProgress(hostRef, onProgress, { mode: 'through' });

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      /*
        `-z-10` is load-bearing, not decoration. A positioned element at
        `z-index: auto` paints ABOVE non-positioned in-flow content, so without
        it the neuron is drawn over the words rather than behind them. The
        negative index puts it under the article's text but still above the page
        background, and the full-bleed panels below occlude it in their own band.
      */
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 xl:block"
    >
      <div className={`absolute top-0 h-full w-60 ${side === 'right' ? 'right-6' : 'left-6'}`}>
        <div className="sticky top-0 flex h-dvh items-center">
          <svg
            viewBox={`0 0 ${CAJAL_VIEWBOX.width} ${CAJAL_VIEWBOX.height}`}
            className="h-[86vh] w-full text-accent opacity-[0.28] dark:opacity-[0.32]"
            fill="none"
            focusable="false"
          >
            {/*
              Mirror and parallax live on separate groups on purpose: both are
              transforms, and writing the scroll one per frame onto the same
              element would silently drop the flip.
            */}
            <g
              transform={
                side === 'left' ? `translate(${CAJAL_VIEWBOX.width} 0) scale(-1 1)` : undefined
              }
            >
              <g
                ref={groupRef}
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {CAJAL_PATHS.map((d, i) => (
                  <path
                    key={d}
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={d}
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                  />
                ))}
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
