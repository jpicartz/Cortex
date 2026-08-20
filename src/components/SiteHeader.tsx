import Link from 'next/link';
import type { Lang } from '@/content/schema';
import { PAGES, STATES } from '@/content';
import { UI } from '@/lib/ui';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';

/**
 * Server component: the slug map is computed here at build time and handed to
 * the (client) language toggle, so the content module never reaches the
 * browser bundle.
 */
export function SiteHeader({ lang }: { lang: Lang }) {
  const other: Lang = lang === 'es' ? 'en' : 'es';

  /*
    Every route the `[slug]` segment can serve, plus the literal `atlas`
    segment. Built from STATES alone, this silently dropped the prose pages and
    the atlas: switching language there fell back to `/en` and threw you back to
    the home page instead of the same page in the other language.
  */
  const slugMap: Record<string, string> = {
    ...Object.fromEntries([...STATES, ...PAGES].map((s) => [s.slug[lang], s.slug[other]])),
    atlas: 'atlas',
  };

  return (
    <header className="border-b border-edge/70">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-5 py-4">
        <Link
          href={`/${lang}`}
          className="font-display text-lg font-semibold tracking-tight text-fg"
        >
          {UI.siteName[lang]}
        </Link>

        <div className="flex items-center gap-1">
          {/*
            The atlas was reachable only from the foot of the menu and the
            footer, which is to say not reachable. It is the most interesting
            thing here and it was the hardest to find.
          */}
          <Link
            href={`/${lang}/atlas`}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-fg-soft transition-colors hover:bg-raised hover:text-fg"
          >
            {UI.atlasTitle[lang]}
          </Link>
          <LangToggle lang={lang} slugMap={slugMap} />
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </header>
  );
}
