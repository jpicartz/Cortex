'use client';

import { useId, useState } from 'react';

import type { Lang, MentalState, Region } from '@/content/schema';
import { REGION_INFO } from '@/content/regions';
import { UI } from '@/lib/ui';
import { StateIcon } from '../StateIcon';
import { TransitionLink } from '../TransitionLink';
import { OUTLINE, REGION_GEOMETRY, VIEWBOX, type Shape } from './regions';

type Entry = {
  region: Region;
  states: { id: string; label: string; slug: string; icon: MentalState['icon']; accent: string }[];
};

/** Region pairs that appear together in one state, with the states naming them. */
type Edge = { a: Region; b: Region; via: string[] };

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

/**
 * The schematic, explorable.
 *
 * NAMES ARE NOT ON THE DRAWING. The first pass put each region's label at its
 * anchor, and twelve labels — "corteza prefrontal ventrolateral", "núcleo
 * supraquiasmático" — collided into an unreadable pile and hung off the left
 * edge. Real anatomical atlases number the figure and key the numbers beside
 * it, for exactly this reason. So the brain carries numbered nodes and the
 * list carries the names, and both are buttons for the same region.
 *
 * Both controls are real `<button>` elements rather than click handlers bolted
 * to SVG paths, so they are tabbable and have accessible names for free. The
 * SVG itself is `aria-hidden`: it is a picture of what the list already says.
 *
 * This is the answer to wanting a 3D brain. What that reaches for is
 * exploration, and exploration is whether you can poke at the thing — not how
 * many dimensions it has. The geometry, the anchors and the region→state
 * mapping all already existed.
 */
export function BrainAtlas({
  entries,
  edges,
  lang,
}: {
  entries: Entry[];
  edges: Edge[];
  lang: Lang;
}) {
  const [active, setActive] = useState<Region | null>(null);
  /* Hover previews on the drawing without committing the panel to it. */
  const [hover, setHover] = useState<Region | null>(null);
  /* What the live region says; empty except right after a node press. */
  const [spoken, setSpoken] = useState('');
  const panelId = useId();

  const lit = hover ?? active;
  const rowId = (region: Region) => `${panelId}-${region}`;

  /*
    Edges touching the lit region. Most regions have none — `dlpfc` is used by
    three states and still has zero, because each of those names one anatomical
    part and fills the rest with processes. The key row says so in words; the
    figure simply draws nothing, which is the honest picture.
  */
  const litEdges = lit ? edges.filter((e) => e.a === lit || e.b === lit) : [];
  const litNeighbours = new Set(litEdges.map((e) => (e.a === lit ? e.b : e.a)));

  /*
    Below `lg` the figure and the key are stacked, so tapping a node on the
    brain opens an answer that is a full screen below the thing you tapped.
    `block: 'nearest'` is the whole trick: it scrolls only if the row is
    actually out of view, so the two-column layout — where the row is already
    on screen beside the drawing — is left completely alone.
  */
  function select(region: Region, fromFigure = false) {
    const next = active === region ? null : region;
    setActive(next);

    /*
      The list rows are a disclosure pattern — `aria-expanded` on the row, its
      content immediately after it — so a screen reader announces those on its
      own and a live region would only duplicate it.

      The nodes on the drawing are the gap. They carry `aria-pressed` and change
      content that lives elsewhere in the DOM, so pressing one used to announce
      "pressed" and nothing about what appeared. This says what appeared, and
      only for the nodes.
    */
    setSpoken(
      next && fromFigure
        ? `${REGION_INFO[next].name[lang]}. ${REGION_INFO[next].role[lang]}`
        : '',
    );

    if (!next) return;
    requestAnimationFrame(() => {
      document.getElementById(rowId(region))?.scrollIntoView({ block: 'nearest' });
    });
  }

  return (
    /*
      The figure takes the larger share now. It is the point of the page and it
      was rendering at 453px on a 1512px screen — a brain marooned in margin,
      which is exactly what made this page read as empty. The key is a list of
      short names and does not need the width.
    */
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
      {/* ── The figure. Sticky, so the key scrolls against a fixed drawing. ── */}
      <div className="relative lg:sticky lg:top-24">
        <svg
          viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
          className="w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter
              id="atlas-glow"
              filterUnits="userSpaceOnUse"
              x={VIEWBOX.x}
              y={VIEWBOX.y}
              width={VIEWBOX.width}
              height={VIEWBOX.height}
            >
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

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
            <path d={OUTLINE.sulci} strokeWidth={1} opacity={0.65} />
          </g>

          {/*
            TWO LAYERS, and the split matters. Running all twelve regions
            through the blur at once — which is what the first pass did — smears
            the whole left half into one blue haze with no schematic left in it.
            So the flat layer draws every region unblurred, and the glow is a
            separate element carrying only the lit one. It fades in from zero,
            so nothing pops when the filter attaches.
          */}
          <g className="text-accent" fill="currentColor" stroke="currentColor">
            {entries.map(({ region }) => (
              <g
                key={region}
                style={{
                  opacity:
                    lit === null
                      ? 0.4
                      : lit === region
                        ? 0.9
                        : litNeighbours.has(region)
                          ? 0.5
                          : 0.12,
                  transition: 'opacity 260ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {REGION_GEOMETRY[region].shapes.map((shape, i) => (
                  <ShapeNode key={i} shape={shape} />
                ))}
              </g>
            ))}
          </g>

          {/*
            The connections, drawn between the same authored anchors the numbered
            nodes sit on — so an edge always lands exactly under its node. Only
            the lit region's edges are drawn: all six at once, over a schematic
            this small, reads as scribble rather than structure.
          */}
          <g
            className="text-accent-ink"
            stroke="currentColor"
            fill="none"
            strokeWidth={1.4}
            strokeLinecap="round"
            style={{
              opacity: litEdges.length ? 0.75 : 0,
              transition: 'opacity 260ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {litEdges.map((e) => {
              const A = REGION_GEOMETRY[e.a].anchor;
              const B = REGION_GEOMETRY[e.b].anchor;
              return (
                <line key={`${e.a}-${e.b}`} x1={A.x} y1={A.y} x2={B.x} y2={B.y} strokeDasharray="3 4" />
              );
            })}
          </g>

          <g
            className="text-accent"
            fill="currentColor"
            stroke="currentColor"
            filter="url(#atlas-glow)"
            style={{
              opacity: lit === null ? 0 : 0.55,
              transition: 'opacity 260ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {lit
              ? REGION_GEOMETRY[lit].shapes.map((shape, i) => <ShapeNode key={i} shape={shape} />)
              : null}
          </g>
        </svg>

        {/*
          The numbered nodes, positioned from each region's authored anchor as a
          percentage of the viewBox — so they track the drawing at any size
          without measuring anything at runtime.
        */}
        {entries.map(({ region }, i) => {
          const { x, y } = REGION_GEOMETRY[region].anchor;
          const on = lit === region;
          return (
            <button
              key={region}
              type="button"
              onClick={() => select(region, true)}
              onPointerEnter={() => setHover(region)}
              onPointerLeave={() => setHover(null)}
              onFocus={() => setHover(region)}
              onBlur={() => setHover(null)}
              aria-pressed={active === region}
              aria-controls={panelId}
              /*
                `after:-inset-2` grows the touch target to 44px without growing
                the dot. Twelve of these sit within about 90px of each other at
                the base of the brain, and a 24px target there is a coin toss on
                a phone.
              */
              className="absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-[0.6875rem] font-semibold tabular-nums shadow-[0_1px_3px_rgb(0_0_0/0.06)] transition-[background-color,border-color,color,transform] duration-200 after:absolute after:-inset-2 after:content-[''] hover:scale-115 focus-visible:scale-115"
              style={{
                left: `${((x - VIEWBOX.x) / VIEWBOX.width) * 100}%`,
                top: `${((y - VIEWBOX.y) / VIEWBOX.height) * 100}%`,
                /*
                  Five of the twelve sit within about 30 units of each other at
                  the base of the brain, because that is genuinely where the
                  amygdala, hippocampus and striatum are. Lifting the lit node
                  keeps it from being half-hidden behind a neighbour.
                */
                zIndex: on ? 2 : 1,
                background: on ? 'var(--c-accent-fill)' : 'var(--c-card)',
                borderColor: on ? 'var(--c-accent-fill)' : 'var(--c-fg-mute)',
                color: on ? 'var(--c-on-accent)' : 'var(--c-fg-soft)',
              }}
            >
              {i + 1}
              <span className="sr-only"> — {REGION_INFO[region].name[lang]}</span>
            </button>
          );
        })}

        <p aria-live="polite" className="sr-only">
          {spoken}
        </p>
      </div>

      {/* ── The key. Each row is the same control as its node. ────────────── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
          {UI.atlasPick[lang]}
        </p>

        <ul id={panelId} className="mt-4 divide-y divide-edge border-y border-edge">
          {entries.map(({ region, states }, i) => {
            const open = active === region;
            return (
              <li key={region} id={rowId(region)} className="scroll-mt-24">
                <button
                  type="button"
                  onClick={() => select(region)}
                  onPointerEnter={() => setHover(region)}
                  onPointerLeave={() => setHover(null)}
                  onFocus={() => setHover(region)}
                  onBlur={() => setHover(null)}
                  aria-expanded={open}
                  className="group flex w-full items-baseline gap-3 py-3 text-left transition-colors hover:text-accent-ink"
                >
                  <span
                    aria-hidden="true"
                    className="w-4 shrink-0 text-[0.6875rem] font-semibold tabular-nums text-fg-mute transition-colors group-hover:text-accent-ink"
                    style={open ? { color: 'var(--c-accent-ink)' } : undefined}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-lg leading-snug">
                    {REGION_INFO[region].name[lang]}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-fg-mute">
                    {states.length}
                  </span>
                </button>

                {/*
                  Rendered only when open, not hidden with CSS: a collapsed row
                  holds up to four links, and keeping twelve rows' worth of them
                  in the tab order while invisible is the classic accordion bug.
                */}
                {open ? (
                  <div className="pb-5 pl-7">
                    <p className="max-w-prose text-[1.0625rem] leading-[1.7] text-fg-soft">
                      {REGION_INFO[region].role[lang]}
                    </p>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
                      {UI.atlasAppearsIn[lang]}
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {states.map((s) => (
                        <li key={s.id} data-accent={s.accent}>
                          <TransitionLink
                            href={`/${lang}/${s.slug}`}
                            className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent/60"
                          >
                            <StateIcon name={s.icon} className="size-4 text-accent-ink" />
                            {s.label}
                          </TransitionLink>
                        </li>
                      ))}
                    </ul>

                    {/*
                      The connection, in words as well as on the figure. Most
                      regions land in the second branch — six of thirteen have no
                      neighbour at all, `dlpfc` among them despite being the
                      most-used region here. Saying that is better than an empty
                      heading, and it is the same shape as the state pages'
                      "runs on its own".
                    */}
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-fg-mute">
                      {UI.atlasWorksWith[lang]}
                    </p>
                    {(() => {
                      const near = edges
                        .filter((e) => e.a === region || e.b === region)
                        .map((e) => ({ other: e.a === region ? e.b : e.a, via: e.via }));

                      if (!near.length) {
                        return (
                          <p className="mt-2 max-w-prose text-sm leading-relaxed text-fg-soft">
                            {UI.atlasWorksAlone[lang]}
                          </p>
                        );
                      }

                      return (
                        <ul className="mt-2 space-y-1.5">
                          {near.map(({ other, via }) => (
                            <li key={other} className="text-sm leading-relaxed text-fg-soft">
                              <span className="text-accent-ink">
                                {REGION_INFO[other].name[lang]}
                              </span>{' '}
                              <span className="text-fg-mute">
                                {UI.atlasVia[lang]} {via.join(', ')}
                              </span>
                            </li>
                          ))}
                        </ul>
                      );
                    })()}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
