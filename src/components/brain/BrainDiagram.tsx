'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Lang, MentalState } from '@/content/schema';
import { UI } from '@/lib/ui';
import { OUTLINE, REGION_GEOMETRY, VIEWBOX, type Shape } from './regions';

type Part = MentalState['mechanism']['parts'][number];

/** How long each part holds before the sequence advances. */
const STEP_MS = 2600;

function ShapeNode({ shape }: { shape: Shape }) {
  if (shape.kind === 'ellipse') {
    return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} />;
  }
  return (
    <path
      d={shape.d}
      fill="none"
      strokeWidth={shape.width ?? 8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

export function BrainDiagram({ parts, lang }: { parts: Part[]; lang: Lang }) {
  /**
   * `showAll` is the honest default. Until JS has confirmed motion is wanted,
   * every part is on screen with its role — so no-JS and reduce-motion readers
   * get the whole section, not a single frame of an animation that never runs.
   */
  const [showAll, setShowAll] = useState(true);
  const [active, setActive] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const play = useCallback(() => {
    clearTimer();
    setShowAll(false);
    setActive(0);
    setHasPlayed(true);
  }, [clearTimer]);

  /** Manual selection stops the auto-advance — the reader is driving now. */
  const select = useCallback(
    (index: number) => {
      clearTimer();
      setShowAll(false);
      setActive(index);
      setHasPlayed(true);
    },
    [clearTimer],
  );

  useEffect(() => {
    if (showAll) return;
    if (active >= parts.length - 1) return; // rest on the last part, don't loop

    timerRef.current = setTimeout(() => setActive((i) => i + 1), STEP_MS);
    return clearTimer;
  }, [active, showAll, parts.length, clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  /**
   * Autoplay once on scroll-in, gated on `reveal-ready` — the same class the
   * layout's inline script sets only when JS runs AND reduced motion is off.
   * One place decides motion preference for the whole app.
   */
  useEffect(() => {
    if (hasPlayed) return;
    if (!document.documentElement.classList.contains('reveal-ready')) return;

    const node = rootRef.current;
    if (!node || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          play();
        }
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasPlayed, play]);

  const lit = (index: number) => showAll || active === index;
  const current = parts[active];

  return (
    <div
      ref={rootRef}
      /*
        Full-bleed: this section breaks out of the article's measure so the
        diagram gets the whole viewport. `overflow-x: clip` on body (globals.css)
        stops 100vw from producing a scrollbar next to a vertical one.
      */
      className="my-12 w-screen border-y border-edge/70 bg-raised/60 [margin-inline:calc(50%-50vw)]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/*
          aria-hidden: names and roles are real text in the column beside this,
          so the diagram is a second reading of the section, never the only one.
        */}
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          className="w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter id="brain-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Silhouette — the ground. Never highlighted. */}
          <g
            fill="none"
            stroke="currentColor"
            className="text-fg-mute/35"
            strokeWidth={1.6}
            strokeLinecap="round"
          >
            <path d={OUTLINE.cerebrum} />
            <path d={OUTLINE.cerebellum} />
            <path d={OUTLINE.cerebellumFolia} strokeWidth={1} />
            <path d={OUTLINE.brainstem} strokeWidth={7} />
            <path d={OUTLINE.callosum} strokeWidth={1.4} />
            {/* Fainter than the silhouette: texture, not structure. */}
            <path d={OUTLINE.sulci} strokeWidth={1} opacity={0.65} />
          </g>

          {parts.map((part, index) =>
            part.region ? (
              <g
                key={part.name[lang]}
                className="text-accent"
                fill="currentColor"
                stroke="currentColor"
                filter={lit(index) ? 'url(#brain-glow)' : undefined}
                style={{
                  opacity: lit(index) ? 1 : 0.12,
                  transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {REGION_GEOMETRY[part.region].shapes.map((shape, i) => (
                  <ShapeNode key={i} shape={shape} />
                ))}
              </g>
            ) : null,
          )}
        </svg>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
            {UI.diagramLabel[lang]}
          </p>

          {showAll ? (
            /* Static: everything present, nothing depending on motion. */
            <ul className="mt-6 space-y-6">
              {parts.map((part) => (
                <li key={part.name[lang]}>
                  <p className="font-display text-2xl leading-tight tracking-tight text-fg">
                    {part.name[lang]}
                    {!part.region && (
                      <span className="ml-2 align-middle text-xs font-normal uppercase tracking-wider text-fg-mute">
                        {UI.diagramConcept[lang]}
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-fg-soft">
                    {part.role[lang]}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              {/* Cross-fade on the part itself; `key` restarts the animation. */}
              <div key={active} className="animate-rise mt-6 min-h-[10rem]">
                <p className="font-display text-[clamp(1.9rem,4.2vw,2.9rem)] leading-[1.1] tracking-tight text-fg">
                  {current.name[lang]}
                </p>
                {!current.region && (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
                    {UI.diagramConcept[lang]}
                  </p>
                )}
                <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-fg-soft">
                  {current.role[lang]}
                </p>
              </div>

            </>
          )}

          {/*
            Controls are always rendered, including in the static state. The
            autoplay only fires when the section scrolls into a *rendering*
            document — if it is already above the fold, or the tab never
            painted, the observer may never fire, and without a control here
            the reader would have no way into the sequence at all.
          */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {parts.map((part, index) => (
              <button
                key={part.name[lang]}
                type="button"
                onClick={() => select(index)}
                aria-label={part.name[lang]}
                aria-current={!showAll && active === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  !showAll && active === index
                    ? 'w-10 bg-accent'
                    : 'w-5 bg-edge hover:bg-fg-mute'
                }`}
              />
            ))}
            <button
              type="button"
              onClick={play}
              className="ml-3 rounded-full px-3 py-1 text-xs font-medium text-fg-mute transition-colors hover:bg-card hover:text-fg"
            >
              {showAll ? UI.diagramPlay[lang] : UI.diagramReplay[lang]}
            </button>
          </div>

          <p className="mt-8 max-w-prose text-xs leading-relaxed text-fg-mute">
            {UI.diagramCaption[lang]}
          </p>
        </div>
      </div>
    </div>
  );
}
