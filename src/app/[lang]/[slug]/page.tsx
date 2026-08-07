import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { allStateParams, getStateBySlug, isLang } from '@/content';
import { UI } from '@/lib/ui';
import { StateIcon } from '@/components/StateIcon';
import { TechniqueCard } from '@/components/TechniqueCard';
import { Coach } from '@/components/Coach';
import { MechanismStage } from '@/components/brain/MechanismStage';
import { CajalField } from '@/components/brain/CajalField';
import { AmbientField } from '@/components/AmbientField';

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

  return (
    <article
      data-accent={state.accent}
      className="relative mx-auto max-w-3xl px-5 py-8 sm:py-10"
    >
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

      <Link
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
      </Link>

      {/* ── Header. The icon is the morph target from the menu card. ───── */}
      <header className="mt-6 flex items-start gap-4">
        <span
          className="grid size-14 shrink-0 place-items-center rounded-card bg-accent/12 text-accent-ink"
          style={{ viewTransitionName: `icon-${state.id}` }}
        >
          <StateIcon name={state.icon} className="size-8" />
        </span>
        <div className="min-w-0 pt-0.5">
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {state.label[lang]}
          </h1>
          <p className="mt-1.5 text-base leading-relaxed text-fg-soft">{state.blurb[lang]}</p>
        </div>
      </header>

      {/* ── FEEL: recognition before explanation. ───────────────────────── */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
          {UI.sectionFeel[lang]}
        </h2>
        <ul className="mt-4 space-y-2.5">
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
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
          {UI.sectionFix[lang]}
        </h2>
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

      {/* ── SOURCES: the line between this and a wellness blog. ─────────── */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
          {UI.sectionSources[lang]}
        </h2>
        <ul className="mt-4 space-y-2">
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
