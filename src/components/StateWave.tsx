import type { Signature } from '@/content/schema';
import { WAVE_BOX, wavePaths } from './wave';

/**
 * A state's waveform signature.
 *
 * A server component with no motion of its own: ten animated traces on the menu
 * would be ten compositor layers running forever behind cards nobody is looking
 * at. The shape carries the meaning; it does not need to wiggle to do that.
 *
 * `preserveAspectRatio="none"` lets one generated path stretch to a wide feature
 * tile or a narrow standard one without regenerating the geometry.
 */
export function StateWave({
  signature,
  className,
  strokeWidth = 1.5,
}: {
  signature: Signature;
  className?: string;
  strokeWidth?: number;
}) {
  const paths = wavePaths(signature);

  return (
    <svg
      viewBox={`0 0 ${WAVE_BOX.width} ${WAVE_BOX.height}`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={i === 0 ? strokeWidth : strokeWidth * 0.7}
          strokeLinecap="round"
          // The second trace in `compare` is the one you are measuring against,
          // so it reads as secondary rather than as an equal partner.
          opacity={i === 0 ? 1 : 0.5}
        />
      ))}
    </svg>
  );
}
