import Link from 'next/link';
import type { Lang } from '@/content/schema';
import { STATES } from '@/content';
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
  const slugMap = Object.fromEntries(STATES.map((s) => [s.slug[lang], s.slug[other]]));

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
          <LangToggle lang={lang} slugMap={slugMap} />
          <ThemeToggle lang={lang} />
        </div>
      </div>
    </header>
  );
}
