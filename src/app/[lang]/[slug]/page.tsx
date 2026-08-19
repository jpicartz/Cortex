import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { allStateParams, getStateBySlug, isLang, relatedStates } from '@/content';
import { UI } from '@/lib/ui';
import { StateIcon } from '@/components/StateIcon';
import { SectionHeading } from '@/components/SectionHeading';
import { StateWave } from '@/components/StateWave';
import { TransitionLink } from '@/components/TransitionLink';
import { TechniqueCard } from '@/components/TechniqueCard';
import { Coach } from '@/components/Coach';
import { MechanismStage } from '@/components/brain/MechanismStage';
import { CajalField } from '@/components/brain/CajalField';
import { AmbientField } from '@/components/AmbientField';
import { SectionRail } from '@/components/SectionRail';
import { RelatedStates } from '@/components/RelatedStates';

/** All 20 pages (10 states × 2 languages) are generated at build time. */
export function generateStaticParams() {
  return allStateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const state = getStateBySlug(lang, slug);
  if (!state) return {};

  const title = state.seo.title[lang];
  const description = state.seo.description[lang];

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/${state.slug[lang]}`,
      languages: {
        es: `/es/${state.slug.es}`,
        en: `/en/${state.slug.en}`,
        // Spanish is the primary voice, so it is what an unmatched locale gets.
        'x-default': `/es/${state.slug.es}`,
      },
    },
    openGraph: { title, description, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const state = getStateBySlug(lang, slug);
  if (!state) notFound();

  const { mechanism } = state;

  /*
    Structured data, and deliberately thin.

    Only fields backed by real data: no `author` (there is no named one), no
    `datePublished` (we do not track it), no ratings. The citation list is the
    part worth exposing and the one thing this site has that a wellness blog
    does not — so it is built from the same `sources` the page renders visibly,
    which means the two cannot drift.
  */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: state.seo.title[lang],
    description: state.seo.description[lang],
    inLanguage: lang,
    isAccessibleForFree: true,
    citation: state.sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.label,
      url: source.url,
    })),
  };

  return (
    <article
      data-accent={state.accent}
      className="relative mx-auto max-w-3xl px-5 py-8 sm:py-10 min-[1440px]:max-w-4xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/*
        Mounted inside the accented wrapper, not the layout, so both fields
        inherit this state's --hue for free.
      */}
      <AmbientField />

      {/*
        Sits in the margin, outside the prose column, and only above xl — see
        CajalField for why hairlines behind body text are not worth the risk.
      */}
      <CajalField side="right" />

      {/*
        Fills the left margin, opposite the tracery. Anchors below match these
        ids; keep them in step or the rail silently marks the wrong section.
      */}
      <SectionRail
        sections={[
          { id: 'start', label: UI.startHere[lang] },
          { id: 'feel', label: UI.sectionFeel[lang] },
          { id: 'understand', label: UI.sectionUnderstand[lang] },
          { id: 'fix', label: UI.sectionFix[lang] },
          { id: 'sources', label: UI.sectionSources[lang] },
        ]}
      />

      {/* A TransitionLink, so going back morphs too rather than only forward. */}
      <TransitionLink
        href={`/${lang}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-fg-mute transition-colors hover:text-fg"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <path d="M15 6 9 12l6 6" />
        </svg>
        {UI.backToMenu[lang]}
      </TransitionLink>

      {/*
        ── Header, and the morph target from the menu card. ───────────────

        It carries the card's own composition — bordered, rounded, icon tile,
        label, blurb, waveform — because a shared-element transition only
        convinces if the destination resembles the thing that grew into it.
        Land on a different shape and the morph visibly snaps at the end.

        The name lives here and NOT on the icon: a nested `view-transition-name`
        is lifted out of its parent's snapshot, so naming both would punch an
        icon-shaped hole in the card as it expands. The icon still travels, as
        part of the card.
      */}
      <header
        className="mt-6 overflow-hidden rounded-card border border-edge bg-card p-5"
        style={{ viewTransitionName: `card-${state.id}` }}
      >
        <div className="flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-tile bg-accent/12 text-accent-ink">
            <StateIcon name={state.icon} className="size-8" />
          </span>
          <div className="min-w-0 pt-0.5">
            <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              {state.label[lang]}
            </h1>
            <p className="mt-1.5 text-base leading-relaxed text-fg-soft">{state.blurb[lang]}</p>
          </div>
        </div>
        <StateWave
          signature={state.signature}
          className="mt-4 h-8 w-full text-accent opacity-45"
        />
      </header>

      {/*
        ── The fast path. ────────────────────────────────────────────────

        The first technique used to sit 4,010px down, past the entire mechanism.
        Someone mid-panic should not have to read four screens of neuroscience
        to reach a breathing exercise, so the primary technique is surfaced here
        with its tool already open.

        `techniques[0]` by convention: the content is authored most-immediate
        first (physiological sigh for ansiedad, ninety seconds for enojo). It
        deliberately appears again in the full list below — this block is for
        someone who will not scroll, the list is for someone reading through.
      */}
      <section id="start" className="mt-6 scroll-mt-8">
        {/*
          A real h2, visually hidden. The card's own title is an h3, and without
          a section heading above it a screen-reader user met a subheading with
          no section — an h1 → h3 jump. The card already announces itself
          visually with the "Start here" eyebrow, so showing this twice would be
          noise; omitting it from the accessibility tree would be the bug.
        */}
        <h2 className="sr-only">{UI.startHere[lang]}</h2>
        <TechniqueCard technique={state.techniques[0]} lang={lang} prominent />
      </section>

      {/* ── FEEL: recognition before explanation. ───────────────────────── */}
      <section id="feel" className="mt-10 scroll-mt-8">
        <SectionHeading>{UI.sectionFeel[lang]}</SectionHeading>
        <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {state.feel[lang].map((line) => (
            <li
              key={line}
              data-reveal="rise"
              className="flex gap-3 text-[1.0625rem] leading-relaxed text-fg-soft"
            >
              <span
                aria-hidden="true"
                className="mt-[0.65rem] size-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/*
        ── UNDERSTAND: the mechanism. The reason this app exists. ─────────

        One pinned sequence rather than a headline, then a diagram panel, then
        the prose. Those three were separate blocks, which is what made the page
        read as a deck: the panel pinned for three screens with a single name on
        it while the paragraphs explaining that name waited below. The stage owns
        all of it now, so the amygdala paragraph is on screen while the amygdala
        is lit.
      */}
      <MechanismStage mechanism={mechanism} signature={state.signature} lang={lang} />

      {/* ── FIX: written steps, plus a tool to actually do it here. ─────── */}
      <section id="fix" className="mt-12 scroll-mt-8">
        <SectionHeading>{UI.sectionFix[lang]}</SectionHeading>
        <div className="mt-4 space-y-4">
          {state.techniques.map((technique) => (
            <div key={technique.id} data-reveal="rise">
              <TechniqueCard technique={technique} lang={lang} />
            </div>
          ))}
        </div>
      </section>

      {/* ── The optional AI layer, deliberately below the curated content. ─ */}
      <section className="mt-12">
        <Coach lang={lang} stateId={state.id} />
      </section>

      {/*
        The graph, made visible. Renders on every page, including the four
        anatomical islands — those say plainly that nothing shares their parts
        rather than quietly vanishing, and every page keeps its door to the
        atlas.
      */}
      <RelatedStates state={state} related={relatedStates(state)} lang={lang} />

      {/* ── SOURCES: the line between this and a wellness blog. ─────────── */}
      <section id="sources" className="mt-12 scroll-mt-8">
        <SectionHeading>{UI.sectionSources[lang]}</SectionHeading>
        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {state.sources.map((source) => (
            <li key={source.url} data-reveal="fade">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-relaxed text-fg-soft underline decoration-edge underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
