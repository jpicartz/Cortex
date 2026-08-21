import type { Lang, StaticPage } from '@/content/schema';
import { UI } from '@/lib/ui';
import { SectionHeading } from './SectionHeading';
import { AmbientField } from './AmbientField';
import { CajalField } from './brain/CajalField';
import { TransitionLink } from './TransitionLink';
import { PlasticityCurve } from './PlasticityCurve';

/**
 * A prose page: no diagram, no tools, no waveform.
 *
 * Deliberately not the state layout with the interactive parts removed. A state
 * page is a sequence — feel, then mechanism, then something to do. This is an
 * argument, and an argument reads better as headed sections in one column than
 * as a stripped-down version of something else.
 */
export function ProsePage({ page, lang }: { page: StaticPage; lang: Lang }) {
  /*
    The same thin `Article` the state pages carry, and for the same reason: the
    citation list is the one thing this site has that a wellness blog does not,
    and it is built from the `sources` rendered below so the two cannot drift.

    This page was the one shipping without it — which is backwards, since it is
    the page most likely to be linked as evidence. Still no `author` (there is
    no named one), no `datePublished` (not tracked) and no ratings.
  */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.seo.title[lang],
    description: page.seo.description[lang],
    inLanguage: lang,
    isAccessibleForFree: true,
    citation: page.sources.map((source) => ({
      '@type': 'CreativeWork',
      name: source.label,
      url: source.url,
    })),
  };

  /*
    `max-w-3xl` below `xl`, wider above it. At 1512px the old layout was a 768px
    article holding 655px of text with 428px of dead margin either side — 57% of
    the screen doing nothing, which is what made an otherwise decent page read
    as a blog template.

    The fix is NOT a longer line. 655px at 18px is already ~65 characters, the
    right reading measure, and pushing past ~75ch measurably hurts reading. So
    the text grows only modestly and the recovered space goes to a figure.
  */
  return (
    <article
      data-accent="sky"
      className="relative mx-auto max-w-3xl px-5 py-8 sm:py-10 xl:max-w-6xl"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      <div className="mt-12 xl:grid xl:grid-cols-[minmax(0,44rem)_minmax(0,22rem)] xl:gap-16">
        <div className="space-y-12">
        {page.sections.map((section) => (
          <section key={section.heading.es} data-reveal="rise">
            <SectionHeading>{section.heading[lang]}</SectionHeading>
            {/*
              65ch below `xl`, ~70ch above. A deliberate ceiling, not a cap left
              in by accident: past roughly 75ch the eye loses the start of the
              next line and long paragraphs get measurably harder to track. The
              horizontal space goes to the figure instead, which is why there
              is one.
            */}
            <div className="mt-4 space-y-4">
              {section.body[lang].map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-prose text-[1.0625rem] leading-[1.75] text-fg-soft xl:max-w-[44rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
        </div>

        {/*
          Only above `xl`, and only for the page that has one. Below that the
          column would be a third of the screen wide and the curve unreadable;
          the argument stands on its own words there.
        */}
        {page.id === 'por-que-funciona' ? (
          <div className="hidden xl:block">
            <PlasticityCurve lang={lang} />
          </div>
        ) : null}
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
