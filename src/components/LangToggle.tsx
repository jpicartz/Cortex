'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { readPrefs, writePrefs } from '@/lib/prefs';

/**
 * Switching language has to keep you on the same page, and slugs are localised
 * (/es/ansiedad ↔ /en/anxiety), so a naive prefix swap would 404.
 *
 * The layout passes down a small slug map rather than having this component
 * import the content module — that would pull all ten states into the client
 * bundle to answer a question that ten string pairs can answer.
 */
export function LangToggle({
  lang,
  slugMap,
}: {
  lang: Lang;
  /** Current-language slug → other-language slug. */
  slugMap: Record<string, string>;
}) {
  const pathname = usePathname();
  const other: Lang = lang === 'es' ? 'en' : 'es';

  // /es/ansiedad → ['es', 'ansiedad']
  const segments = pathname.split('/').filter(Boolean);
  const currentSlug = segments[1];
  const mapped = currentSlug ? slugMap[currentSlug] : undefined;
  const href = mapped ? `/${other}/${mapped}` : `/${other}`;

  return (
    <Link
      href={href}
      hrefLang={other}
      aria-label={UI.switchLanguageLabel[lang]}
      onClick={() => writePrefs({ ...readPrefs(), lang: other })}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-fg-soft transition-colors hover:bg-raised hover:text-fg"
    >
      {UI.switchLanguage[lang]}
    </Link>
  );
}
