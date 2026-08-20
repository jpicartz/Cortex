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

  return (
    <aside className="mt-12" data-reveal="rise">
      <div className="relative overflow-hidden rounded-card border border-accent/25 bg-accent/[0.055] p-5 sm:p-6">
        {/*
          A quiet index mark rather than a quotation glyph: this is evidence,
          not a pull-quote, and the difference is the whole point of the card.
        */}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
          {UI.oneTrueThingLabel[lang]}
        </p>

        <p className="mt-3 max-w-prose font-display text-lg leading-[1.6] text-fg sm:text-xl">
          {fact.text[lang]}
        </p>

        <p className="mt-4 text-xs leading-relaxed text-fg-mute">
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
