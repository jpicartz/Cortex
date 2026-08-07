import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { ParallaxLayer } from '@/components/ParallaxLayer';

/**
 * The hero, and the one authored moment on the site.
 *
 * The field behind the type breathes on an 11-second cycle: 5.5 seconds
 * expanding, 5.5 contracting. That is the coherent-breathing rate this app
 * actually teaches, so the motion is the product's thesis rather than
 * decoration — a visitor starts entraining to it before reading a word.
 *
 * Two offset blobs at different scales keep it from reading as a pulsing
 * circle; the slower one is phase-shifted so the field never returns to
 * exactly the same shape.
 */
export function Hero({ lang }: { lang: Lang }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-edge/60">
      {/*
        The breathing field. aria-hidden: it is atmosphere, not content.

        Each blob is wrapped in its own parallax layer rather than being
        transformed directly — `breath-field` already animates `transform`, and
        a scroll-driven transform on the same node would overwrite the breath.
        The two layers drift at different distances, so the field gains depth on
        scroll without either blob losing its own rhythm.
      */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <ParallaxLayer distance={-90} className="absolute inset-0">
          <div
            className="breath-field absolute left-1/2 top-1/2 size-[46rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, oklch(0.72 0.11 240 / 0.55), transparent 68%)',
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer distance={-40} className="absolute inset-0">
          <div
            className="breath-field absolute left-[38%] top-[58%] size-[30rem] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, oklch(0.74 0.10 155 / 0.42), transparent 70%)',
              animationDelay: '-3.7s',
              animationDuration: '13s',
            }}
          />
        </ParallaxLayer>
      </div>

      {/*
        Vertically centred inside a bounded height rather than top-padded, so
        the space above and below the type stays balanced as the copy reflows
        between languages and breakpoints.
      */}
      <div className="mx-auto flex min-h-[26rem] max-w-3xl flex-col justify-center px-5 py-16 sm:min-h-[32rem] sm:py-20">
        <h1
          data-reveal="unmask"
          className="max-w-[15ch] font-display text-[clamp(2.5rem,7vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-fg"
        >
          {UI.heroLine[lang]}
        </h1>

        {/*
          text-fg, not text-fg-soft. The breathing field lightens the dark
          background as it expands, and measured against the composited peak
          the soft token falls to 3.78:1 — under AA, but only at one moment of
          an 11-second cycle, so it would never have been caught by eye. The
          full token measures 7.19:1 at that same peak and still reads as a
          lede against the display type above it.
        */}
        <p
          data-reveal="fade"
          style={{ '--i': 1 } as React.CSSProperties}
          className="mt-6 max-w-[46ch] text-lg leading-relaxed text-fg sm:text-xl"
        >
          {UI.heroSupport[lang]}
        </p>
      </div>
    </section>
  );
}
