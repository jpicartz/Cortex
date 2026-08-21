import type { Lang, MentalState } from '@/content/schema';
import { UI } from '@/lib/ui';

/**
 * One surprising fact, with the paper it came from named right there.
 *
 * Deliberately NOT a slot on every state page. Most citations on this site sit
 * behind publisher gates, so most states have no fact anyone could verify, and
 * an empty card on eleven pages would be worse than no card. It reads as an
 * occasional aside because that is honestly what it is.
 *
 * The citation is rendered inline rather than left to the sources list at the
 * bottom. A striking number with no visible provenance is the exact move this
 * site exists not to make.
 */
export function OneTrueThing({ state, lang }: { state: MentalState; lang: Lang }) {
  const fact = state.oneTrueThing;
  if (!fact) return null;

  const source = state.sources[fact.source];

  /*
    `<aside>` is the `complementary` landmark, and an unnamed one announces as
    bare "complementary" in a screen reader's landmark list — useless when a
    page has two. Named from the eyebrow, which is already the card's title.
    A deterministic id rather than `useId`: this is a server component, and
    there is at most one of these per page.
  */
  const labelId = `one-true-thing-${state.id}`;

  return (
    <aside className="mt-12" data-reveal="rise" aria-labelledby={labelId}>
      {/*
        Tint and border are stronger than the ambient-field ceilings, and
        deliberately so — `--field-alpha` governs full-bleed background washes
        behind text, where the ceiling exists to protect contrast. This is a
        bounded card that has to read AS a card against the page, and at
        0.055/25 it did not on the cooler accents.
      */}
      <div className="relative overflow-hidden rounded-card border border-accent/40 bg-accent/[0.08] p-5 sm:p-6">
        {/*
          A quiet index mark rather than a quotation glyph: this is evidence,
          not a pull-quote, and the difference is the whole point of the card.
        */}
        <p
          id={labelId}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink"
        >
          {UI.oneTrueThingLabel[lang]}
        </p>

        <p className="mt-3 max-w-prose font-display text-lg leading-[1.6] text-fg sm:text-xl">
          {fact.text[lang]}
        </p>

        {/*
          `fg-soft`, NOT `fg-mute`. The accent tint darkens this panel below the
          page in dark mode, and 12px `fg-mute` measured 3.25:1 against it —
          a real AA failure that shipped. The earlier sweep reasoned "these are
          existing token pairs" instead of measuring the composited surface;
          the tint is exactly what makes that reasoning wrong.
        */}
        <p className="mt-4 text-xs leading-relaxed text-fg-soft">
          {UI.oneTrueThingVia[lang]}{' '}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-edge underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
          >
            {source.label}
          </a>
        </p>
      </div>
    </aside>
  );
}
