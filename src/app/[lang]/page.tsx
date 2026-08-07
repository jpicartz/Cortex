import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { STATES, isLang, LANGS } from '@/content';
import { UI } from '@/lib/ui';
import { StateIcon } from '@/components/StateIcon';
import { TransitionLink } from '@/components/TransitionLink';
import { Hero } from '@/components/Hero';
import { CajalField } from '@/components/brain/CajalField';

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

  return (
    <>
      <Hero lang={lang} />

      <div className="relative mx-auto max-w-3xl px-5 py-14 sm:py-20">
        {/* Mirrored to the opposite margin from the detail pages, so moving
            between the two does not feel like the same sticker twice. */}
        <CajalField side="left" />

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
          No fixed stagger any more. Each card reveals on its own distance from
          the fold, so a row arrives together — they genuinely are at the same
          height — and rows cascade as you scroll. The old delay ran on its own
          clock, which made the last card feel late however fast you moved.
        */}
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STATES.map((state) => (
            <li key={state.id} data-accent={state.accent}>
              <TransitionLink
                href={`/${lang}/${state.slug[lang]}`}
                data-reveal="rise"
                className="card-lift group flex h-full items-start gap-4 rounded-card border border-edge bg-card p-4 hover:border-accent/60"
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-tile bg-accent/12 text-accent-ink transition-colors duration-200 group-hover:bg-accent/20"
                  /* Pairs with the header on the detail page to morph across the
                     navigation. Unique per state, so only one pair ever matches. */
                  style={{ viewTransitionName: `icon-${state.id}` }}
                >
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
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
