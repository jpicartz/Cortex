'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Lang, MentalState } from '@/content/schema';
import { UI } from '@/lib/ui';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { clamp01, smoothstep } from '@/lib/scrollDriver';
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

  const outerRef = useRef<HTMLElement>(null);
  const regionRefs = useRef<(SVGGElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nearestRef = useRef(-1);

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
   * The whole point of the rework: scroll position stays a float.
   *
   * The previous version floored it to an integer, so ~78vh of scrolling
   * produced no change at all and then a 650ms transition fired on its own
   * clock — motion decoupled from the input, which is what made it feel bulky.
   * Here every part's weight is a continuous falloff from the current position,
   * so all of them are always partially lit and the scroll IS the timing.
   *
   * Nothing below sets React state. At 60fps that would be a re-render per
   * frame; instead this writes compositor-only properties straight to the DOM.
   */
  const onProgress = useCallback(
    (p: number) => {
      /*
        Maps progress onto part CENTRES, not part slots. The naive `p * length`
        puts position 0 half a slot before the first centre and position
        `length` half a slot past the last, so the first part arrived already
        half faded and the last faded back out while the panel was still
        pinned. Running 0.5 → length-0.5 lands the first part fully lit the
        moment the section sticks and holds the last one until it releases.
      */
      const position = 0.5 + p * (parts.length - 1);

      for (let i = 0; i < parts.length; i++) {
        // Linear falloff hits 0.5 exactly at the midpoint between two parts,
        // so the pair cross-fades rather than one leaving before the next.
        const distance = Math.abs(position - (i + 0.5));
        const weight = smoothstep(clamp01(1 - distance));

        const region = regionRefs.current[i];
        if (region) region.style.opacity = (0.1 + 0.9 * weight).toFixed(3);

        const label = labelRefs.current[i];
        if (label) {
          const drift = position - (i + 0.5);
          label.style.opacity = (weight * weight).toFixed(3);
          label.style.transform = `translateY(${(drift * -16).toFixed(2)}px)`;
          // Blur only on the way out — a sharp label never gets softened.
          label.style.filter = weight > 0.85 ? 'none' : `blur(${((1 - weight) * 2.4).toFixed(2)}px)`;
        }

        const pip = pipRefs.current[i];
        if (pip) {
          pip.style.width = `${(20 + 20 * weight).toFixed(1)}px`;
          pip.style.opacity = (0.3 + 0.7 * weight).toFixed(3);
        }
      }

      // Semantics, unlike pixels, are discrete — so only touch them on change.
      const nearest = Math.min(parts.length - 1, Math.max(0, Math.floor(position)));
      if (nearest !== nearestRef.current) {
        nearestRef.current = nearest;
        for (let i = 0; i < parts.length; i++) {
          pipRefs.current[i]?.setAttribute('aria-current', String(i === nearest));
        }
      }
    },
    [parts.length],
  );

  useScrollProgress(outerRef, onProgress, { mode: 'travel', enabled: scrollMode });

  /** Clicking a step scrolls to its segment rather than jumping state. */
  const goTo = useCallback(
    (index: number) => {
      const node = outerRef.current;
      if (!node) return;
      const travel = node.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: node.offsetTop + (travel * (index + 0.5)) / parts.length,
        behavior: 'smooth',
      });
    },
    [parts.length],
  );

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
            ref={(el) => {
              regionRefs.current[index] = el;
            }}
            className="text-accent"
            fill="currentColor"
            stroke="currentColor"
            /*
              The glow is applied unconditionally rather than toggled. Adding
              and removing a filter mid-scroll forces a repaint of the layer at
              exactly the moment the eye is on it; leaving it on is a constant,
              cheaper cost and lets opacity alone carry the reveal.
            */
            filter="url(#brain-glow)"
            style={{
              opacity: scrollMode ? (index === 0 ? 1 : 0.1) : 1,
              willChange: scrollMode ? 'opacity' : undefined,
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
      <section className="my-12 w-screen border-y border-edge/70 bg-raised [margin-inline:calc(50%-50vw)]">
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
      <section className="my-12 w-screen border-y border-edge/70 bg-raised [margin-inline:calc(50%-50vw)]">
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
      className="relative my-12 w-screen border-y border-edge/70 bg-raised [margin-inline:calc(50%-50vw)]"
    >
      <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {brain}

          <div>
            {eyebrow}

            {/*
              Every label is rendered at once and stacked, rather than swapping
              one out for another. That is what lets two of them be partly
              present at the same time and hand over mid-drift — a single
              swapped node can only ever cut.
            */}
            <div className="relative mt-6 min-h-[12rem]">
              {parts.map((part, index) => (
                <div
                  key={part.name[lang]}
                  ref={(el) => {
                    labelRefs.current[index] = el;
                  }}
                  className="absolute inset-x-0 top-0"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    willChange: 'opacity, transform, filter',
                  }}
                >
                  <p className="font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.08] tracking-tight text-fg">
                    {part.name[lang]}
                  </p>
                  {!part.region && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
                      {UI.diagramConcept[lang]}
                    </p>
                  )}
                  <p className="mt-3 max-w-prose text-[1.0625rem] leading-[1.75] text-fg-soft">
                    {part.role[lang]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {parts.map((part, index) => (
                <button
                  key={part.name[lang]}
                  ref={(el) => {
                    pipRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={part.name[lang]}
                  aria-current={index === 0}
                  className="h-1.5 rounded-full bg-accent"
                  style={{ width: index === 0 ? 40 : 20, opacity: index === 0 ? 1 : 0.3 }}
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
