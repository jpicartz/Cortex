import type { Accent } from '@/content/schema';

/**
 * Accent colours as flat hex, for surfaces that cannot resolve CSS custom
 * properties — currently the generated OG cards, which are rendered by Satori
 * at build time with no browser and no stylesheet.
 *
 * These mirror the dark-mode ramp in globals.css (`oklch(0.78 0.12 <hue>)`),
 * because the OG cards are always on the dark ground. Keep in sync with the
 * [data-accent] hue list there.
 */
export const ACCENT_HEX: Record<Accent, string> = {
  sky: '#8fb8f2',
  amber: '#dcb173',
  violet: '#cf9ee9',
  teal: '#6acdc2',
  rose: '#f2a2ab',
  orange: '#e5aa7b',
  fuchsia: '#e99dd0',
  indigo: '#aaa9f2',
  cyan: '#7cc2e8',
  emerald: '#7ccfa4',
};

/** The page ground the cards are composed on. */
export const OG_BG = '#0f1420';
export const OG_FG = '#f2f5f9';
export const OG_MUTE = '#98a2b3';

/**
 * Satori does not reliably honour 8-digit hex alpha (`#rrggbbaa`), which shows
 * up as a hard rectangle where a radial gradient should have faded out. rgba()
 * is unambiguous, so gradients are built with this rather than hex + alpha.
 */
export function rgba(hex: string, alpha: number): string {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
