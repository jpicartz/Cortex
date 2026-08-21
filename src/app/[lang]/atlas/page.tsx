import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { LANGS, STATES, isLang, REGION_EDGES, REGION_INDEX } from '@/content';
import type { Region } from '@/content/schema';
import { UI, fill } from '@/lib/ui';
import { SectionHeading } from '@/components/SectionHeading';
import { AmbientField } from '@/components/AmbientField';
import { TransitionLink } from '@/components/TransitionLink';
import { BrainAtlas } from '@/components/brain/BrainAtlas';

/*
  A literal segment, which is free: no state uses the slug "atlas", and the word
  is identical in Spanish and English so one folder serves both languages. Next
  resolves static segments before the [slug] catch-all, so this wins without
  needing to be special-cased there.
*/
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
    title: UI.atlasTitle[lang],
    description: fill(UI.atlasIntro[lang], {
      regions: REGION_INDEX.size,
      states: STATES.length,
    }),
    alternates: {
      canonical: `/${lang}/atlas`,
      languages: { es: '/es/atlas', en: '/en/atlas', 'x-default': '/es/atlas' },
    },
  };
}

export default async function AtlasPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const entries = [...REGION_INDEX.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([region, states]) => ({
      region: region as Region,
      states: states.map((s) => ({
        id: s.id,
        label: s.label[lang],
        slug: s.slug[lang],
        icon: s.icon,
        accent: s.accent,
      })),
    }));

  /*
    Flattened to plain strings here, in the server component, so the client
    bundle never imports the content module — the same reason the language
    toggle takes a slug map rather than looking states up itself.
  */
  const edgeList = REGION_EDGES.map((e) => ({
    a: e.a,
    b: e.b,
    via: e.via.map((s) => s.label[lang]),
  }));

  return (
    <div data-accent="sky" className="relative mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <AmbientField />

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

      <header className="mt-6">
        {/* A kicker for the h1 below, not a section of its own — see SectionHeading. */}
        <SectionHeading as="p">{UI.atlasTitle[lang]}</SectionHeading>
        <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          {UI.atlasHeadline[lang]}
        </h1>
        <p className="mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-fg-soft">
          {fill(UI.atlasIntro[lang], { regions: REGION_INDEX.size, states: STATES.length })}
        </p>
      </header>

      <div className="mt-10">
        <BrainAtlas entries={entries} edges={edgeList} lang={lang} />
      </div>

      <p className="mt-10 max-w-prose text-xs leading-relaxed text-fg-mute">
        {UI.diagramCaption[lang]}
      </p>
    </div>
  );
}
