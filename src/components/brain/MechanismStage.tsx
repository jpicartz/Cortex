'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Lang, MentalState, Signature } from '@/content/schema';
import { UI } from '@/lib/ui';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { clamp01, smoothstep } from '@/lib/scrollDriver';
import { WAVE_BOX, wavePaths } from '../wave';
import { BrainGraphic } from './BrainDiagram';

type Mechanism = MentalState['mechanism'];

/** Scroll allotted to each beat, as a share of the viewport. */
const VH_PER_BEAT = 95;

/**
 * How long a beat holds full opacity, as a share of its segment either side of
 * centre. 0.32 means the middle ~64% is completely solid and only the outer
 * bands cross-fade — the two neighbours meet at 50% each, so there is never a
 * moment with nothing legible on screen.
 *
 * This is the whole readability argument: a linear falloff would leave every
 * paragraph translucent for precisely as long as you were reading it.
 */
const PLATEAU = 0.32;
const FADE_END = 0.68;

function beatWeight(position: number, index: number): number {
  const distance = Math.abs(position - (index + 0.5));
  if (distance <= PLATEAU) return 1;
  return 1 - smoothstep(clamp01((distance - PLATEAU) / (FADE_END - PLATEAU)));
}

/**
 * The graphic's weight, and deliberately NOT the text's.
 *
 * If the brain shared the plateau it would sit frozen for a third of the stage —
 * which is precisely the "scroll a whole screen and nothing changes" feeling
 * this rework exists to kill. So the two are decoupled: prose holds still
 * because it is being read, while the diagram keeps responding to every pixel.
 * Something is always moving; it is just never the sentence under your eye.
 */
function graphicWeight(position: number, index: number): number {
  return smoothstep(clamp01(1 - Math.abs(position - (index + 0.5))));
}

/**
 * The mechanism, told as one pinned sequence.
 *
 * Previously the diagram was a full-bleed panel with a hard border that pinned
 * for three screens showing a single name and one line, and the prose explaining
 * it came afterwards as a separate section. That is a slide followed by an
 * article: the panel had nothing to say, and every section boundary was a
 * visual event.
 *
 * Here one beat is one part, carrying its name, its role AND the paragraphs that
 * describe it — so the amygdala paragraph is on screen while the amygdala is
 * lit. Beat count equals part count, which keeps the total scroll close to what
 * it already was. Pacing matters: this is an app for someone who wants help in
 * the next five minutes, so buying depth with five screens of scrolling would be
 * a bad trade.
 */
export function MechanismStage({
  mechanism,
  signature,
  lang,
}: {
  mechanism: Mechanism;
  signature: Signature;
  lang: Lang;
}) {
  const { headline, body, parts, focus } = mechanism;

  const [scrollMode, setScrollMode] = useState(false);

  const outerRef = useRef<HTMLElement>(null);
  const regionRefs = useRef<(SVGGElement | null)[]>([]);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);
  const wavePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nearestRef = useRef(-1);

  const hasAnatomy = parts.some((part) => part.region);

  /**
   * Group paragraphs under the part they are about.
   *
   * An even split is the default and is already close — ansiedad's prose runs
   * alarm → labelling → breath, matching its three parts in order. `focus`
   * overrides it where that lands wrong.
   */
  const beats = useMemo(() => {
    const groups: number[][] = parts.map(() => []);
    body[lang].forEach((_, i) => {
      const target = focus
        ? focus[i]
        : Math.min(parts.length - 1, Math.floor((i * parts.length) / body[lang].length));
      groups[target].push(i);
    });
    return groups;
  }, [body, lang, parts, focus]);

  useEffect(() => {
    if (document.documentElement.classList.contains('reveal-ready')) setScrollMode(true);
  }, []);

  const onProgress = useCallback(
    (p: number) => {
      // Progress maps onto beat CENTRES, so the first beat is fully present the
      // moment the stage pins and the last still is when it releases.
      const position = 0.5 + p * (parts.length - 1);

      for (let i = 0; i < parts.length; i++) {
        const weight = beatWeight(position, i);

        const region = regionRefs.current[i];
        if (region) region.style.opacity = (0.1 + 0.9 * graphicWeight(position, i)).toFixed(3);

        const beat = beatRefs.current[i];
        if (beat) {
          /*
            Drift and blur are scaled by (1 - weight), so they are zero while the
            block is solid. Text that keeps sliding under your eye as you read it
            is worse than text that does not move at all; all the motion happens
            during the handoff, when nobody is mid-sentence.
          */
          const fade = 1 - weight;
          const drift = position - (i + 0.5);
          beat.style.opacity = weight.toFixed(3);
          beat.style.transform = `translateY(${(drift * -26 * fade).toFixed(2)}px)`;
          beat.style.filter = fade < 0.02 ? 'none' : `blur(${(fade * 2.6).toFixed(2)}px)`;
          // Keep faded beats out of the tab order and off the a11y tree.
          beat.style.visibility = weight < 0.02 ? 'hidden' : 'visible';
        }

        const pip = pipRefs.current[i];
        if (pip) pip.style.opacity = (0.3 + 0.7 * graphicWeight(position, i)).toFixed(3);
      }

      /*
        A slow counter-drift on the graphic column. Small, but it means the
        stage is never completely static even while a beat is holding — the
        difference between a page that is paused and a slide that has stopped.
      */
      if (visualRef.current) {
        visualRef.current.style.transform = `translate3d(0, ${((p - 0.5) * -46).toFixed(2)}px, 0)`;
      }

      // Semantics, unlike pixels, are discrete — only touch them on a change.
      const nearest = Math.min(parts.length - 1, Math.max(0, Math.round(position - 0.5)));
      if (nearest !== nearestRef.current) {
        nearestRef.current = nearest;
        for (let i = 0; i < parts.length; i++) {
          pipRefs.current[i]?.setAttribute('aria-current', String(i === nearest));
        }
      }

      // States with no anatomy draw their waveform instead; it fills as you go.
      for (const path of wavePathRefs.current) {
        if (path) path.style.strokeDashoffset = String(1 - smoothstep(p));
      }
    },
    [parts.length],
  );

  useScrollProgress(outerRef, onProgress, { mode: 'travel', enabled: scrollMode });

  const registerRegion = useCallback((index: number, el: SVGGElement | null) => {
    regionRefs.current[index] = el;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const node = outerRef.current;
      if (!node) return;
      const travel = node.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: node.offsetTop + (travel * index) / Math.max(1, parts.length - 1),
        behavior: 'smooth',
      });
    },
    [parts.length],
  );

  /** The visual half: a brain when there is somewhere to point, else the wave. */
  const visual = hasAnatomy ? (
    <BrainGraphic
      parts={parts}
      lang={lang}
      registerRegion={scrollMode ? registerRegion : undefined}
      /*
        Small-screen height is a hard constraint, not a preference: the pinned
        panel has to fit a heading, the graphic, a beat of two or three
        paragraphs and the pips inside one viewport, or the end of every beat is
        simply unreachable. The brain gives up the space.
      */
      className="mx-auto max-h-[20vh] w-full sm:max-h-[30vh] lg:max-h-none"
    />
  ) : (
    <svg
      viewBox={`0 0 ${WAVE_BOX.width} ${WAVE_BOX.height}`}
      preserveAspectRatio="none"
      className="h-32 w-full text-accent lg:h-48"
      aria-hidden="true"
      focusable="false"
    >
      {wavePaths(signature).map((d, i) => (
        <path
          key={d}
          ref={(el) => {
            wavePathRefs.current[i] = el;
          }}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 0 ? 1.4 : 1}
          strokeLinecap="round"
          opacity={i === 0 ? 1 : 0.5}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={scrollMode ? 1 : 0}
        />
      ))}
    </svg>
  );

  const heading = (
    <>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
        {UI.sectionUnderstand[lang]}
      </h2>
      <h3 className="mt-3 font-display text-2xl leading-snug tracking-tight text-fg sm:text-3xl">
        {headline[lang]}
      </h3>
    </>
  );

  const beatBody = (index: number) => (
    <>
      <p className="font-display text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.1] tracking-tight text-fg">
        {parts[index].name[lang]}
        {!parts[index].region && (
          <span className="ml-2 align-middle text-xs font-normal uppercase tracking-wider text-fg-mute">
            {UI.diagramConcept[lang]}
          </span>
        )}
      </p>
      <p className="mt-2 text-[0.875rem] leading-relaxed text-fg-mute sm:text-[0.95rem]">{parts[index].role[lang]}</p>
      <div className="mt-4 space-y-3 sm:mt-5">
        {beats[index].map((paragraph) => (
          <p key={paragraph} className="text-[0.9375rem] leading-[1.65] text-fg-soft sm:text-[1.0625rem] sm:leading-[1.7]">
            {body[lang][paragraph]}
          </p>
        ))}
      </div>
    </>
  );

  // ── Static: server render, no JS, or reduced motion ──────────────────────
  if (!scrollMode) {
    return (
      <section className="mt-12">
        {heading}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
          <div>{visual}</div>
          <div className="space-y-10">
            {parts.map((_, index) => (
              <div key={index}>{beatBody(index)}</div>
            ))}
          </div>
        </div>
        <p className="mt-8 max-w-prose text-xs leading-relaxed text-fg-mute">
          {hasAnatomy ? UI.diagramCaption[lang] : UI.diagramNoAnatomy[lang]}
        </p>
      </section>
    );
  }

  // ── Pinned sequence ──────────────────────────────────────────────────────
  return (
    <section
      ref={outerRef}
      style={{ height: `${parts.length * VH_PER_BEAT + 100}vh` }}
      /*
        No border, no opaque panel, no full-bleed break-out. Those were what made
        this read as a slide dropped into the page; the ambient field now runs
        continuously underneath, so the stage can simply be part of the article.
      */
      className="relative mt-12"
    >
      <div className="sticky top-0 flex min-h-dvh flex-col justify-center py-6 lg:py-10">
        {heading}

        <div className="mt-6 grid items-center gap-5 lg:mt-8 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
          <div ref={visualRef} style={{ willChange: 'transform' }}>
            {visual}
          </div>

          {/*
            Every beat is rendered and stacked rather than swapped, which is what
            lets two of them be partly present at once and hand over mid-fade. A
            single swapped node can only ever cut.
          */}
          {/*
            A grid stack, not absolute positioning. Every beat occupies the same
            cell, so the container is exactly as tall as the LONGEST beat —
            automatically, with no reserved min-height to guess at. Absolute
            children contribute no height, so a long beat silently overflowed and
            sat on top of the pips; that is the kind of thing that only shows up
            on the narrowest screen, which is also the most common one.
          */}
          <div className="grid">
            {parts.map((_, index) => (
              <div
                key={index}
                ref={(el) => {
                  beatRefs.current[index] = el;
                }}
                className="[grid-area:1/1]"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  visibility: index === 0 ? 'visible' : 'hidden',
                  willChange: 'opacity, transform, filter',
                }}
              >
                {beatBody(index)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 lg:mt-8">
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
              className="h-1.5 w-8 rounded-full bg-accent"
              style={{ opacity: index === 0 ? 1 : 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
