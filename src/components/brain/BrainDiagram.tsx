'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Lang, MentalState } from '@/content/schema';
import { UI } from '@/lib/ui';
import { OUTLINE, REGION_GEOMETRY, VIEWBOX, type Shape } from './regions';

type Part = MentalState['mechanism']['parts'][number];

/** Scroll distance allotted to each part, as a share of the viewport. */
const VH_PER_PART = 78;

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
   * `scrollMode` is off until the client confirms motion is wanted, so the
   * server — and anyone with JS off or reduced motion on — gets a normal-flow
   * section with every part and role on screen. Only then does it become a
   * tall, sticky, scroll-scrubbed panel.
   */
  const [scrollMode, setScrollMode] = useState(false);
  const [active, setActive] = useState(0);

  const outerRef = useRef<HTMLElement>(null);

  /**
   * Some states are driven entirely by processes with no location — worry is
   * the clear case. Scrubbing a brain where nothing ever lights up reads as a
   * broken diagram, so those states get the names as text and no drawing.
   */
  const hasAnatomy = parts.some((part) => part.region);

  useEffect(() => {
    if (!hasAnatomy) return;
    if (document.documentElement.classList.contains('reveal-ready')) setScrollMode(true);
  }, [hasAnatomy]);

  /**
   * The sequence is driven by scroll position, not a timer: the reader sets
   * the pace, nothing advances out from under them, and scrubbing back works.
   * rAF-throttled so a fast scroll cannot queue more work than it can paint.
   */
  useEffect(() => {
    if (!scrollMode) return;
    const node = outerRef.current;
    if (!node) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const progress = Math.min(Math.max(-rect.top / travel, 0), 0.9999);
      setActive(Math.floor(progress * parts.length));
    };

    const onScroll = () => {
      /*
        rAF is paused while the document is hidden, so a queued frame would
        never run and every later scroll would be dropped by the `frame` guard.
        Nothing is painting anyway, so just measure inline and stay correct.
      */
      if (document.hidden) {
        measure();
        return;
      }
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    /*
      A hidden document pauses requestAnimationFrame, so any scrolling that
      happened while the tab was in the background never got measured. Re-read
      position on the way back rather than waiting for the next scroll.
    */
    document.addEventListener('visibilitychange', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onScroll);
    };
  }, [scrollMode, parts.length]);

  /** Clicking a step scrolls to its segment rather than jumping state. */
  const goTo = useCallback(
    (index: number) => {
      const node = outerRef.current;
      if (!node) return;
      const travel = node.offsetHeight - window.innerHeight;
      const target =
        node.offsetTop + (travel * (index + 0.5)) / parts.length - window.innerHeight * 0;
      window.scrollTo({ top: target, behavior: 'smooth' });
    },
    [parts.length],
  );

  const lit = (index: number) => !scrollMode || active === index;
  const current = parts[Math.min(active, parts.length - 1)];

  const brain = (
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
              opacity: lit(index) ? 1 : 0.1,
              transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {REGION_GEOMETRY[part.region].shapes.map((shape, i) => (
              <ShapeNode key={i} shape={shape} />
            ))}
          </g>
        ) : null,
      )}
    </svg>
  );

  const eyebrow = (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
      {UI.diagramLabel[lang]}
    </p>
  );

  const caption = (
    <p className="mt-8 max-w-prose text-xs leading-relaxed text-fg-mute">
      {hasAnatomy ? UI.diagramCaption[lang] : UI.diagramNoAnatomy[lang]}
    </p>
  );

  const partList = (
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
          <p className="mt-1.5 text-[1.0625rem] leading-relaxed text-fg-soft">{part.role[lang]}</p>
        </li>
      ))}
    </ul>
  );

  // ── Nothing to draw: processes only, so no brain. ────────────────────────
  if (!hasAnatomy) {
    return (
      <section className="my-12 w-screen border-y border-edge/70 bg-raised/60 [margin-inline:calc(50%-50vw)]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          {eyebrow}
          {partList}
          {caption}
        </div>
      </section>
    );
  }

  // ── Static: server render, no JS, or reduced motion ──────────────────────
  if (!scrollMode) {
    return (
      <section className="my-12 w-screen border-y border-edge/70 bg-raised/60 [margin-inline:calc(50%-50vw)]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {brain}
          <div>
            {eyebrow}
            {partList}
            {caption}
          </div>
        </div>
      </section>
    );
  }

  // ── Scroll-scrubbed ──────────────────────────────────────────────────────
  return (
    <section
      ref={outerRef}
      style={{ height: `${parts.length * VH_PER_PART + 100}vh` }}
      className="relative my-12 w-screen border-y border-edge/70 bg-raised/60 [margin-inline:calc(50%-50vw)]"
    >
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {brain}

          <div>
            {eyebrow}

            {/*
              `key` on the part restarts the entrance, so each one arrives
              rather than cross-dissolving into a blur of two names at once.
            */}
            <div key={active} className="animate-rise mt-6 min-h-[11rem]">
              <p className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.08] tracking-tight text-fg">
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

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {parts.map((part, index) => (
                <button
                  key={part.name[lang]}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={part.name[lang]}
                  aria-current={active === index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    active === index ? 'w-10 bg-accent' : 'w-5 bg-edge hover:bg-fg-mute'
                  }`}
                />
              ))}
            </div>

            {caption}
          </div>
        </div>
      </div>
    </section>
  );
}
