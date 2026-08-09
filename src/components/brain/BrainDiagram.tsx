import type { Lang, MentalState } from '@/content/schema';
import { OUTLINE, REGION_GEOMETRY, VIEWBOX, type Shape } from './regions';

type Part = MentalState['mechanism']['parts'][number];

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
 * The brain schematic, and nothing else.
 *
 * This used to own its own scroll listener and decide which part was active.
 * It no longer does: the mechanism is now told as one pinned sequence where the
 * prose and the diagram have to agree on where they are, and two components
 * measuring scroll separately is how they drift apart. `MechanismStage` owns
 * the position and hands each region group to this via `registerRegion`.
 *
 * A server component — there is no interactivity here, only geometry.
 */
export function BrainGraphic({
  parts,
  lang,
  registerRegion,
  className,
  /**
   * Number each region on the figure, keyed to the same numbers beside the
   * prose. This is how the diagram earns its place when there is no motion to
   * link a region to the paragraph about it.
   *
   * Numbers rather than names on purpose: a text label long enough to read
   * ("Corteza prefrontal") needs margin to sit in, which would mean re-padding
   * the viewBox and undoing the crop that just made the drawing 24% bigger.
   * Labels also collide unpredictably once the language changes. A numeral is
   * two characters in every language and always fits.
   */
  numbered = false,
}: {
  parts: Part[];
  lang: Lang;
  /** Called with each region group so the stage can drive its opacity. */
  registerRegion?: (index: number, el: SVGGElement | null) => void;
  className?: string;
  numbered?: boolean;
}) {
  return (
    <svg
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
      className={className ?? 'w-full'}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/*
          The filter region is in USER SPACE and covers the whole viewBox.

          The default `objectBoundingBox` region scales with each element's own
          box, so `-40% / 180%` gave the amygdala dot 6.4 units of falloff room
          and the vagus stroke 5.2 — where `stdDeviation="6"` needs about 18
          before the gaussian has faded to nothing. All three regions were being
          sliced mid-fade, which is what drew a hard rectangle around every
          highlight. A fixed user-space region cannot be outgrown by any shape,
          so nothing clips at any size.
        */}
        <filter
          id="brain-glow"
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
            ref={registerRegion ? (el) => registerRegion(index, el) : undefined}
            className="text-accent"
            fill="currentColor"
            stroke="currentColor"
            /*
              The glow is applied unconditionally rather than toggled. Adding and
              removing a filter mid-scroll forces a repaint of the layer at
              exactly the moment the eye is on it; leaving it on is a constant,
              cheaper cost and lets opacity alone carry the reveal.
            */
            filter="url(#brain-glow)"
            style={{ opacity: registerRegion ? (index === 0 ? 1 : 0.1) : 1 }}
          >
            {REGION_GEOMETRY[part.region].shapes.map((shape, i) => (
              <ShapeNode key={i} shape={shape} />
            ))}
          </g>
        ) : null,
      )}

      {/*
        Markers sit above every region so a badge is never buried under the
        shape it points at. `anchor` has been carried in REGION_GEOMETRY since
        the geometry was authored and was waiting for exactly this.
      */}
      {numbered &&
        parts.map((part, index) => {
          if (!part.region) return null;
          const { x, y } = REGION_GEOMETRY[part.region].anchor;
          return (
            /*
              `accent-fill`, not `accent`. They differ only in light mode — 0.5
              lightness against 0.62 — but white numerals on `accent` measured
              3.26–3.91:1 across all ten hues, every one of them under AA. The
              fill token exists for exactly this pairing; `.btn-accent` already
              uses it with `on-accent` text.
            */
            <g key={`marker-${part.name[lang]}`} className="text-accent-fill">
              <circle cx={x} cy={y} r={8} fill="currentColor" />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={9}
                fontWeight={700}
                className="fill-on-accent"
              >
                {index + 1}
              </text>
            </g>
          );
        })}
    </svg>
  );
}
