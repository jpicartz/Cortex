import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PAGES, STATES, TRIAGE, isLang, LANGS } from '@/content';
import type { Lang, MentalState } from '@/content/schema';
import { UI } from '@/lib/ui';
import { StateIcon } from '@/components/StateIcon';
import { SectionHeading } from '@/components/SectionHeading';
import { Triage } from '@/components/Triage';
import { TransitionLink } from '@/components/TransitionLink';
import { Hero } from '@/components/Hero';
import { CajalField } from '@/components/brain/CajalField';
import { AmbientField } from '@/components/AmbientField';
import { StateWave } from '@/components/StateWave';

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  return {
    title: `${UI.siteName[lang]} — ${UI.tagline[lang]}`,
    description: UI.menuHelp[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: { es: '/es', en: '/en', 'x-default': '/es' },
    },
  };
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const difficult = STATES.filter((s) => s.band === 'difficult');
  const good = STATES.filter((s) => s.band === 'good');

  return (
    <>
      <AmbientField />
      <Hero lang={lang} />

      <div className="relative mx-auto max-w-5xl px-5 py-14 sm:py-20">
        {/* Mirrored to the opposite margin from the detail pages, so moving
            between the two does not feel like the same sticker twice. */}
        <CajalField side="left" />

        {/*
          The way in, above the grid rather than instead of it. Someone who
          already knows what they want scrolls past; someone who does not is no
          longer asked to diagnose themselves before the app will help.
        */}
        <div className="mb-10 sm:mb-14">
          <Triage tree={TRIAGE} states={STATES} lang={lang} />
        </div>

        <header className="mb-8 sm:mb-10">
          {/* h2, not h1 — the hero line owns the page's only h1. */}
          <h2
            data-reveal="fade"
            className="font-display text-3xl leading-tight tracking-tight sm:text-4xl"
          >
            {UI.menuHeading[lang]}
          </h2>
          <p data-reveal="fade" className="mt-3 max-w-prose text-base leading-relaxed text-fg-soft">
            {UI.menuHelp[lang]}
          </p>
        </header>

        {/*
          A bento grid on a six-column track: feature tiles take three columns,
          standard ones two, so the rhythm breaks instead of marching. Sizing is
          editorial — how much a state has to say — and NOT a claim about which
          feelings are most common, which we have no data to support.

          The track imposes a real constraint on that editorial choice: a row
          only fills if it is two features (3+3) or three standards (2+2+2), so
          features must fall in adjacent PAIRS in `content/index.ts` order.
          Mixing them leaves a dead column at the end of every row. If you retile
          a state, check the whole sequence still pairs up.

          No fixed stagger. Each card reveals on its own distance from the fold,
          so a row arrives together — they genuinely are at the same height —
          and rows cascade as you scroll. The old delay ran on its own clock,
          which made the last card feel late however fast you moved.
        */}
        <StateGrid states={difficult} lang={lang} />

        {/*
          A divider, never an interleave. Someone opening this at 2am must not
          scroll past a cheerful tile to reach the thing that helps, so the good
          states live strictly below the ten and behind their own heading.
        */}
        <div className="mt-14 sm:mt-16">
          <SectionHeading>{UI.menuGoodBand[lang]}</SectionHeading>
        </div>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-fg-soft">
          {UI.menuGoodBandHelp[lang]}
        </p>

        <div className="mt-6">
          <StateGrid states={good} lang={lang} />
        </div>

        {/*
          The two doors that are not a feeling: the atlas, and the page arguing
          why any of this should work. Both sit at the FOOT of the menu, after
          all fourteen states, because someone arriving in distress should reach
          the thing that helps before an invitation to go exploring.

          They are also both in the header/footer now. Keeping them only here
          meant nobody found them — including the person who asked for them.
        */}
        <div className="mt-14 flex flex-wrap justify-center gap-3 sm:mt-16">
          <TransitionLink href={`/${lang}/atlas`} className="btn-quiet">
            {UI.atlasLink[lang]}
          </TransitionLink>
          {PAGES.map((page) => (
            <TransitionLink key={page.id} href={`/${lang}/${page.slug[lang]}`} className="btn-quiet">
              {page.label[lang]}
            </TransitionLink>
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * One band of the menu.
 *
 * A six-column track only fills if a row is two feature tiles (3+3) or three
 * standard ones (2+2+2), so features must fall in adjacent PAIRS within a band.
 * The `good` band is three standards, which is exactly one row.
 */
function StateGrid({ states, lang }: { states: readonly MentalState[]; lang: Lang }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
      {states.map((state) => (
        <li
          key={state.id}
          data-accent={state.accent}
          className={state.tile === 'feature' ? 'lg:col-span-3' : 'lg:col-span-2'}
        >
          <TransitionLink
            href={`/${lang}/${state.slug[lang]}`}
            data-reveal="rise"
            className="card-lift spotlight group flex h-full flex-col overflow-hidden rounded-card border border-edge bg-card p-4 hover:border-accent/60"
            /*
                    The whole card is the shared element, not just the icon. It
                    pairs with the detail page's header block, which carries the
                    same composition so the morph lands on a matching shape.

                    Only ONE element may hold a given view-transition-name at a
                    time, which is why the icon no longer has its own: a nested
                    name is lifted out of its parent's snapshot and would leave an
                    icon-shaped hole in the card mid-flight.
                  */
            style={{ viewTransitionName: `card-${state.id}` }}
          >
            <span className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-tile bg-accent/12 text-accent-ink transition-colors duration-200 group-hover:bg-accent/20">
                <StateIcon name={state.icon} className="size-6" />
              </span>

              <span className="min-w-0">
                <span className="block font-display text-lg font-medium leading-snug text-fg">
                  {state.label[lang]}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-fg-soft">
                  {state.blurb[lang]}
                </span>
              </span>
            </span>

            {/*
                    The state's own rhythm — erratic for anxiety, flat for
                    no-motivation, looping for stuck-in-the-past. `mt-auto` pins it
                    to the bottom so tiles of different heights still line up.
                  */}
            <StateWave
              signature={state.signature}
              className="mt-auto h-8 w-full pt-4 text-accent opacity-45 transition-opacity duration-300 group-hover:opacity-80"
            />
          </TransitionLink>
        </li>
      ))}
    </ul>
  );
}
