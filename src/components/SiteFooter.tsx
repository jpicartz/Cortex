import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';

/**
 * The disclaimer is permanent chrome, not a dismissible banner. An app about
 * mental distress should never be one scroll position away from looking like
 * it is offering treatment.
 */
export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mt-16 border-t border-edge/70">
      <div className="mx-auto max-w-3xl space-y-3 px-5 py-8 text-sm leading-relaxed text-fg-mute">
        <p className="font-medium text-fg-soft">{UI.disclaimerShort[lang]}</p>
        <p>{UI.disclaimerLong[lang]}</p>
        <p>{UI.privacyNote[lang]}</p>
      </div>
    </footer>
  );
}
