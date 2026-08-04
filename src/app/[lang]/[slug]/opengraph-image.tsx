import { ImageResponse } from 'next/og';

import { allStateParams, getStateBySlug, isLang } from '@/content';
import { ACCENT_HEX, OG_BG, OG_FG, OG_MUTE, rgba } from '@/lib/accentHex';
import { UI } from '@/lib/ui';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * One card per state per language, generated at build time.
 *
 * Composed rather than templated: the state's own accent tints the breathing
 * field and the ring mark, so a shared link for "Ansiedad" looks different
 * from one for "Enojo" — the same per-state colour logic the app itself uses.
 */
export function generateStaticParams() {
  return allStateParams();
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const state = isLang(lang) ? getStateBySlug(lang, slug) : undefined;

  // A card still has to render if the slug is wrong, or the crawler gets nothing.
  const accent = state ? ACCENT_HEX[state.accent] : ACCENT_HEX.sky;
  const label = state?.label[isLang(lang) ? lang : 'es'] ?? 'Cortex';
  const blurb =
    state?.blurb[isLang(lang) ? lang : 'es'] ?? UI.tagline[isLang(lang) ? lang : 'es'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          /*
            The breathing field lives on the root's own background as stacked
            gradient layers, not as absolutely-positioned child divs: Satori
            does not lay those out the way a browser does, and they rendered as
            visible rectangles over the card.

            Each layer ends at rgba(accent, 0) rather than the `transparent`
            keyword — `transparent` is rgba(0, 0, 0, 0), so fading to it
            interpolates through black and leaves a dirty edge.
          */
          backgroundColor: OG_BG,
          backgroundImage: [
            `radial-gradient(circle at 78% 18%, ${rgba(accent, 0.42)} 0%, ${rgba(accent, 0.12)} 30%, ${rgba(accent, 0)} 58%)`,
            `radial-gradient(circle at 8% 96%, ${rgba(accent, 0.22)} 0%, ${rgba(accent, 0)} 46%)`,
          ].join(', '),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              border: `3px solid ${accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: 16, background: accent }} />
          </div>
          <div style={{ fontSize: 30, color: OG_FG, letterSpacing: -0.5 }}>Cortex</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              color: OG_FG,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 900,
            }}
          >
            {label}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 34,
              color: OG_MUTE,
              lineHeight: 1.35,
              maxWidth: 860,
            }}
          >
            {blurb}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: accent }}>
          <div style={{ width: 40, height: 3, background: accent, borderRadius: 3 }} />
          {UI.tagline[isLang(lang) ? lang : 'es']}
        </div>
      </div>
    ),
    size,
  );
}
