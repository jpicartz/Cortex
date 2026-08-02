import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { STATES, isLang, LANGS } from '@/content';
import { UI } from '@/lib/ui';
import { StateIcon } from '@/components/StateIcon';
import { TransitionLink } from '@/components/TransitionLink';

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
    alternates: { canonical: `/${lang}`, languages: { es: '/es', en: '/en' } },
  };
}

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <header className="animate-rise mb-8 sm:mb-10">
        <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          {UI.menuHeading[lang]}
        </h1>
        <p className="mt-3 max-w-prose text-base leading-relaxed text-fg-soft">
          {UI.menuHelp[lang]}
        </p>
      </header>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {STATES.map((state, i) => (
          <li key={state.id} data-accent={state.accent}>
            <TransitionLink
              href={`/${lang}/${state.slug[lang]}`}
              className="animate-rise stagger group flex h-full items-start gap-4 rounded-card border border-edge bg-card p-4 transition-colors hover:border-accent/60 hover:bg-raised"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span
                className="grid size-11 shrink-0 place-items-center rounded-tile bg-accent/12 text-accent-ink"
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
  );
}
