import type { Lang } from '@/content/schema';
import { PAGES } from '@/content';
import { UI } from '@/lib/ui';
import { TransitionLink } from './TransitionLink';

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

        {/*
          The thesis page lives here rather than in the header. It is the answer
          to "why should I believe any of this", which is a question people ask
          after reading something, not before.
        */}
        <nav className="flex flex-wrap gap-x-5 gap-y-1 pt-2">
          {PAGES.map((page) => (
            <TransitionLink
              key={page.id}
              href={`/${lang}/${page.slug[lang]}`}
              className="underline decoration-edge underline-offset-4 transition-colors hover:text-fg-soft hover:decoration-fg-mute"
            >
              {page.label[lang]}
            </TransitionLink>
          ))}
          <TransitionLink
            href={`/${lang}/atlas`}
            className="underline decoration-edge underline-offset-4 transition-colors hover:text-fg-soft hover:decoration-fg-mute"
          >
            {UI.atlasTitle[lang]}
          </TransitionLink>
        </nav>
      </div>
    </footer>
  );
}
