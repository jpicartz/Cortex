'use client';

import { useCallback, useLayoutEffect, useRef } from 'react';

import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/**
 * The thesis page's argument, drawn.
 *
 * This is the one piece of motion on the site that carries meaning rather than
 * atmosphere. The page says grey matter rises within seven days of practice and
 * recedes once practice stops — so the figure is that curve, drawn left to right
 * as you scroll the argument that describes it. Reading and drawing advance
 * together.
 *
 * SCHEMATIC, NOT PLOTTED. The shape is what Draganski (2004) and Driemeyer
 * (2008) report — fast onset, maintenance-dependent, reversible — but no axis
 * here carries measured values, and the caption says so. Drawing a precise-looking
 * chart from numbers nobody plotted would be the same failure as writing a
 * citation from memory.
 *
 * Under reduced motion `useScrollProgress` fires once at `restingProgress` and
 * never subscribes, so the curve simply renders complete and no loop starts.
 */

/* A 320x200 space: flat, a fast rise, a plateau while training holds, a decay. */
const CURVE =
  'M 12 150 L 44 150 C 66 150 84 78 108 62 C 130 48 164 50 190 56 C 224 64 252 108 308 138';

/** Where the two moments the papers actually name fall on that path. */
const MARK_ONSET = { x: 108, y: 62 };
const MARK_STOP = { x: 190, y: 56 };

export function PlasticityCurve({ lang }: { lang: Lang }) {
  const hostRef = useRef<HTMLDivElement>(null);
  /*
    The curve is measured against the ARTICLE, not against this component's own
    box. Its box is a grid item that stops at the prose column's height, which
    on a 900px viewport left 212px of travel — the line finished within one
    flick of the wheel and then sat complete for the rest of the page, which is
    the opposite of "reading and drawing advance together".

    `useLayoutEffect` rather than `useEffect` so the target is resolved before
    `useScrollProgress` subscribes; layout effects run first.
  */
  const targetRef = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    targetRef.current = hostRef.current?.closest('article') ?? hostRef.current;
  }, []);
  const pathRef = useRef<SVGPathElement>(null);
  const onsetRef = useRef<SVGGElement>(null);
  const stopRef = useRef<SVGGElement>(null);

  /*
    Writes straight to the DOM rather than through state. At 60fps a setState
    here would be a re-render per frame, which is the difference between a line
    that tracks your scroll and one that stutters behind it.

    `pathLength={1}` normalises the path so the dash maths is just `1 - p`,
    independent of the actual geometry — change the curve and this still works.
  */
  const onProgress = useCallback((p: number) => {
    const path = pathRef.current;
    if (path) path.style.strokeDashoffset = String(1 - p);

    /* Each marker appears as the line reaches it, not before. */
    const at = (el: SVGGElement | null, threshold: number) => {
      if (!el) return;
      const t = Math.min(1, Math.max(0, (p - threshold) / 0.12));
      el.style.opacity = String(t);
    };
    at(onsetRef.current, 0.3);
    at(stopRef.current, 0.55);
  }, []);

  useScrollProgress(targetRef, onProgress, { mode: 'travel', restingProgress: 1 });

  return (
    <div ref={hostRef} className="h-full">
      <div className="sticky top-24">
        <figure>
          <svg
            viewBox="0 0 320 200"
            className="w-full"
            role="img"
            aria-label={UI.plasticityAlt[lang]}
          >
            {/* Baseline and axis, deliberately unlabelled with values. */}
            <g className="text-edge" stroke="currentColor" strokeWidth={1}>
              <line x1="12" y1="150" x2="308" y2="150" />
              <line x1="12" y1="24" x2="12" y2="150" />
            </g>

            <g
              ref={onsetRef}
              className="text-fg-mute"
              style={{ opacity: 0, transition: 'opacity 120ms linear' }}
            >
              <line
                x1={MARK_ONSET.x}
                y1={MARK_ONSET.y}
                x2={MARK_ONSET.x}
                y2={150}
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="2 3"
              />
              <text x={MARK_ONSET.x - 2} y={168} className="fill-current" fontSize={11}>
                {UI.plasticityOnset[lang]}
              </text>
            </g>

            <g
              ref={stopRef}
              className="text-fg-mute"
              style={{ opacity: 0, transition: 'opacity 120ms linear' }}
            >
              <line
                x1={MARK_STOP.x}
                y1={MARK_STOP.y}
                x2={MARK_STOP.x}
                y2={150}
                stroke="currentColor"
                strokeWidth={1}
                strokeDasharray="2 3"
              />
              <text x={MARK_STOP.x + 6} y={40} className="fill-current" fontSize={11}>
                {UI.plasticityStop[lang]}
              </text>
            </g>

            <path
              ref={pathRef}
              d={CURVE}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              className="text-accent-ink"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="1"
              style={{ strokeDashoffset: 1 }}
            />

            <text x="16" y="18" className="fill-current text-fg-mute" fontSize={11}>
              {UI.plasticityAxis[lang]}
            </text>
          </svg>

          <figcaption className="mt-3 text-xs leading-relaxed text-fg-mute">
            {UI.plasticityCaption[lang]}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
