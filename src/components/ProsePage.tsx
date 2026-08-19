import type { Lang, StaticPage } from '@/content/schema';
import { UI } from '@/lib/ui';
import { SectionHeading } from './SectionHeading';
import { AmbientField } from './AmbientField';
import { CajalField } from './brain/CajalField';
import { TransitionLink } from './TransitionLink';

/**
 * A prose page: no diagram, no tools, no waveform.
 *
 * Deliberately not the state layout with the interactive parts removed. A state
 * page is a sequence — feel, then mechanism, then something to do. This is an
 * argument, and an argument reads better as headed sections in one column than
 * as a stripped-down version of something else.
 */
export function ProsePage({ page, lang }: { page: StaticPage; lang: Lang }) {
  return (
    <article data-accent="sky" className="relative mx-auto max-w-3xl px-5 py-8 sm:py-10">
      <AmbientField />
      <CajalField side="right" />

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
        <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
          {page.label[lang]}
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-fg-soft">{page.lede[lang]}</p>
      </header>

      <div className="mt-12 space-y-12">
        {page.sections.map((section) => (
          <section key={section.heading.es} data-reveal="rise">
            <SectionHeading>{section.heading[lang]}</SectionHeading>
            <div className="mt-4 space-y-4">
              {section.body[lang].map((paragraph) => (
                <p key={paragraph} className="max-w-prose text-[1.0625rem] leading-[1.75] text-fg-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <SectionHeading>{UI.sectionSources[lang]}</SectionHeading>
        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {page.sources.map((source) => (
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
