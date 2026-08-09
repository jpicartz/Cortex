import type { Signature } from '@/content/schema';

/**
 * Waveform signatures — one per mental state.
 *
 * These are illustrative, not measured: no claim is made that this is an EEG
 * trace. The shape encodes something true about the state's rhythm, which is
 * why each state gets its own rather than a shared squiggle. Anxiety is fast
 * and irregular; no-motivation barely leaves the baseline; stuck-in-the-past
 * returns to where it began; anger spikes once and decays.
 *
 * Paths are generated in a fixed 200×36 space and stretched with
 * `preserveAspectRatio="none"`, so one generator serves a wide bento tile and a
 * narrow one without regenerating.
 */

export const WAVE_BOX = { width: 200, height: 36 } as const;

const MID = WAVE_BOX.height / 2;
const STEP = 2;

/** Deterministic pseudo-noise. `Math.random` would make the SSR markup differ. */
function jitter(u: number): number {
  return Math.sin(u * 97.3) * 0.6 + Math.sin(u * 41.7) * 0.4;
}

function sample(signature: Signature, u: number, phase: number): number {
  // Envelope keeps every trace pinned to the baseline at both ends.
  const env = Math.sin(u * Math.PI);

  switch (signature) {
    case 'erratic':
      return Math.sin(u * Math.PI * 14 + phase) * 9 * env + jitter(u) * 2.6;
    case 'stall':
      // Nothing happens, then everything does — at the deadline.
      return u < 0.62
        ? Math.sin(u * Math.PI * 3 + phase) * 1.1
        : Math.sin((u - 0.62) * Math.PI * 7 + phase) * 13 * (u - 0.62) * 2.6;
    case 'layered':
      return (
        (Math.sin(u * Math.PI * 6 + phase) * 5 +
          Math.sin(u * Math.PI * 9 + phase + 1) * 4 +
          Math.sin(u * Math.PI * 13 + phase + 2) * 3) *
        env
      );
    case 'runaway':
      return Math.sin(u * Math.PI * 11 + phase) * (1.5 + u * u * 13);
    case 'loop':
      return Math.sin(u * Math.PI * 4 + phase) * 8 * Math.sin(u * Math.PI * 2 + 0.4);
    case 'spike':
      return u < 0.2
        ? Math.sin(u * Math.PI * 5 + phase) * 15
        : Math.sin(u * Math.PI * 9 + phase) * 13 * Math.exp(-(u - 0.2) * 4.5);
    case 'slow':
      return Math.sin(u * Math.PI * 1.6 + phase) * 11;
    case 'flat':
      return Math.sin(u * Math.PI * 5 + phase) * 1.8;
    case 'compare':
      return Math.sin(u * Math.PI * 7 + phase) * 4 - 5;
    case 'rising':
      // Amplitude and baseline both climb: not a spike, a trend.
      return Math.sin(u * Math.PI * 7 + phase) * (2 + u * 8) - u * 6;
    case 'steady':
      // The only trace that does not decay or wobble. That is the point.
      return Math.sin(u * Math.PI * 5 + phase) * 9;
    case 'scan':
      // A slow sweep with a fast probe riding it — looking, then finding.
      return Math.sin(u * Math.PI * 2 + phase) * 10 + Math.sin(u * Math.PI * 17 + phase) * 2.5 * env;
    case 'echo':
      return u < 0.16
        ? Math.sin(u * Math.PI * 6.2 + phase) * 14
        : Math.sin(u * Math.PI * 12 + phase) * 9 * Math.exp(-(u - 0.16) * 6);
  }
}

function trace(signature: Signature, phase: number, offset: number): string {
  let d = '';
  for (let x = 0; x <= WAVE_BOX.width; x += STEP) {
    const u = x / WAVE_BOX.width;
    const y = MID + offset + sample(signature, u, phase);
    d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
  }
  return d;
}

/**
 * The path(s) for a signature. `compare` returns two, because the whole point
 * of that one is that there are two traces being held against each other.
 */
export function wavePaths(signature: Signature, phase = 0): string[] {
  if (signature === 'compare') {
    return [trace('compare', phase, 0), trace('compare', phase + 1.6, 11)];
  }
  return [trace(signature, phase, 0)];
}
