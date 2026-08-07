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
}: {
  parts: Part[];
  lang: Lang;
  /** Called with each region group so the stage can drive its opacity. */
  registerRegion?: (index: number, el: SVGGElement | null) => void;
  className?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className={className ?? 'w-full'}
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
    </svg>
  );
}
