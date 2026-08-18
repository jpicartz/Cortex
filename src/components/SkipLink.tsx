import { UI } from '@/lib/ui';
import type { Lang } from '@/content/schema';

/**
 * Off-screen until focused, which is the whole point.
 *
 * A state page opens with a section rail and a header before any content.
 * Without this, reaching the first paragraph by keyboard means tabbing through
 * every rail entry on every page — the rail exists for orientation, not as a
 * toll.
 *
 * The positioning lives in `globals.css` as `.skip-link`; see the comment there
 * for why two utility-based attempts silently failed.
 */
export function SkipLink({ lang }: { lang: Lang }) {
  return (
    <a
      href="#main"
      className="skip-link rounded-card bg-accent-fill px-4 py-2 text-sm font-semibold text-on-accent"
    >
      {UI.skipToContent[lang]}
    </a>
  );
}
