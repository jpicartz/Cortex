import type { IconKey } from '@/content/schema';

/**
 * Ten hand-drawn icons instead of an icon library.
 *
 * We need exactly ten glyphs. Pulling in a 5,000-icon package to get them
 * would add install weight and a dependency for no benefit — this app's whole
 * promise is that it loads instantly when someone needs it. Keys are validated
 * against ICONS in content/schema.ts, so a typo is a build error.
 */
const PATHS: Record<IconKey, React.ReactNode> = {
  // Anxiety — a heartbeat spike
  'activity-heartbeat': <path d="M3 12h3.5l2.2-6.5 3.8 13 2.3-6.5H21" />,

  // Procrastination — an hourglass
  hourglass: (
    <>
      <path d="M7 3h10M7 21h10" />
      <path d="M8.5 3v3.2a3.5 3.5 0 0 0 7 0V3" />
      <path d="M8.5 21v-3.2a3.5 3.5 0 0 1 7 0V21" />
    </>
  ),

  // Stuck in the past — a clock winding backwards
  history: (
    <>
      <path d="M3.5 11a8.5 8.5 0 1 1 2.2 6.6" />
      <path d="M3.5 6.5v4.5H8" />
      <path d="M12 8v4.2l2.8 1.7" />
    </>
  ),

  // Overwhelm — stacked layers
  stack: (
    <>
      <path d="m12 3.5 8.5 4.2-8.5 4.2-8.5-4.2 8.5-4.2Z" />
      <path d="m3.5 12 8.5 4.2 8.5-4.2" />
      <path d="m3.5 16.2 8.5 4.3 8.5-4.3" />
    </>
  ),

  // Anger — a flame
  flame: (
    <path d="M12 3.2c2.9 3.7 4.9 5.9 4.9 8.9a4.9 4.9 0 0 1-9.8 0c0-1.5.6-2.8 1.6-4 .3 1 .9 1.7 1.7 2-.4-2.2.1-4.6 1.6-6.9Z" />
  ),

  // No motivation — a nearly empty battery
  battery: (
    <>
      <rect x="3" y="7" width="15" height="10" rx="2.5" />
      <path d="M21 10.5v3" />
      <path d="M6.5 10.5v3" />
    </>
  ),

  // Comparison — a balance scale
  scale: (
    <>
      <path d="M12 4.5v15M7.5 19.5h9" />
      <path d="m12 7-6.5 2.6M12 7l6.5 2.6" />
      <path d="M5.5 9.6 3 15a2.8 2.8 0 0 0 5 0L5.5 9.6Z" />
      <path d="M18.5 9.6 16 15a2.8 2.8 0 0 0 5 0l-2.5-5.4Z" />
    </>
  ),

  // Fear of judgement — an eye
  eye: (
    <>
      <path d="M2.5 12S6 6.2 12 6.2 21.5 12 21.5 12 18 17.8 12 17.8 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),

  // Can't sleep — a crescent moon
  moon: <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a6.8 6.8 0 0 0 9.5 9.5Z" />,

  // Worrying about the future — one path forking into two
  timeline: (
    <>
      <path d="M3 12h6.5" />
      <path d="m9.5 12 6-5.5M9.5 12l6 5.5" />
      <circle cx="18" cy="6.5" r="1.9" />
      <circle cx="18" cy="17.5" r="1.9" />
    </>
  ),
};

export function StateIcon({
  name,
  className,
  style,
}: {
  name: IconKey;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
