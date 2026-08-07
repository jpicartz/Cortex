'use client';

import { useCallback, useRef } from 'react';

import { useScrollProgress, type ProgressMode } from '@/hooks/useScrollProgress';

/**
 * Moves its children at a different rate from the page, which is what reads as
 * depth. Distance is in pixels across the element's whole pass through the
 * viewport — negative drifts upward (appears further away), positive downward.
 *
 * It owns its own wrapper element rather than transforming a child, because
 * the things worth parallaxing here already have their own animations on
 * `transform` and writing a second one to the same node would silently
 * overwrite them.
 */
export function ParallaxLayer({
  distance = -60,
  mode = 'through',
  className,
  children,
}: {
  distance?: number;
  mode?: ProgressMode;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onProgress = useCallback(
    (p: number) => {
      const el = ref.current;
      if (!el) return;
      // Centred on the midpoint so the layer sits where it was authored when
      // the element is halfway across, rather than always starting offset.
      el.style.transform = `translate3d(0, ${((p - 0.5) * distance).toFixed(2)}px, 0)`;
    },
    [distance],
  );

  // 0.5 is the neutral midpoint: with motion off the layer sits exactly where
  // it was authored, rather than parked at one end of its travel.
  useScrollProgress(ref, onProgress, { mode, restingProgress: 0.5 });

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
