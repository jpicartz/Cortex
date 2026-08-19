import type { Lang, MentalState, Region } from '@/content/schema';
import { REGION_INFO } from '@/content/regions';
import { UI } from '@/lib/ui';
import { SectionHeading } from './SectionHeading';
import { StateIcon } from './StateIcon';
import { TransitionLink } from './TransitionLink';

/**
 * How this state connects to the rest of the brain.
 *
 * Until now every state page was a dead end: you could read that anxiety
 * involves the amygdala and that anger does too, and never learn it from the
 * app. The connection is the interesting part — it is the difference between
 * thirteen articles and one model of a brain.
 *
 * Each link names the region it shares, because "related" on its own is a
 * content-farm move. The reason is the value.
 *
 * THE GRAPH IS GENUINELY SPARSE, and this block says so rather than hiding it.
 * Four states are anatomical islands — social comparison sits on the reward
 * pathway alone, insomnia on the suprachiasmatic nucleus — and worry has no
 * region at all, because it is built from processes. Adding regions to those
 * states would densify the graph and would be inventing anatomy, which is the
 * one thing that would undercut every citation on the site. So an island says
 * it is an island, and still offers the door to the atlas.
 */
export function RelatedStates({
  state,
  related,
  lang,
}: {
  state: MentalState;
  related: { state: MentalState; via: Region }[];
  lang: Lang;
}) {
  const hasRegions = state.mechanism.parts.some((p) => p.region);

  return (
    <section className="mt-12">
      <SectionHeading>
        {related.length > 0 ? UI.relatedHeading[lang] : UI.relatedHeadingAlone[lang]}
      </SectionHeading>

      {/*
        Flex-wrap, not a fixed three-column grid. The count varies from one to
        three, and a grid left a dead column standing open whenever it was two —
        the same mismanaged dead space as the old bento rows. Here the cards
        divide whatever row they are on.
      */}
      {related.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-3">
          {related.map(({ state: other, via }) => (
            <li key={other.id} data-accent={other.accent} className="min-w-60 flex-1">
              <TransitionLink
                href={`/${lang}/${other.slug[lang]}`}
                className="card-lift spotlight group flex h-full items-center gap-3 rounded-card border border-edge bg-card p-4 hover:border-accent/60"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-tile bg-accent/12 text-accent-ink">
                  <StateIcon name={other.icon} className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-medium leading-snug text-fg">
                    {other.label[lang]}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-fg-mute">
                    {UI.relatedVia[lang]}{' '}
                    <span className="text-accent-ink">{REGION_INFO[via].name[lang]}</span>
                  </span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 max-w-prose text-[1.0625rem] leading-[1.7] text-fg-soft">
          {hasRegions ? UI.relatedNoneShared[lang] : UI.relatedNoPlace[lang]}
        </p>
      )}

      {/* The door to the atlas, on every state page — including the islands. */}
      <TransitionLink
        href={`/${lang}/atlas`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg-mute transition-colors hover:text-accent-ink"
      >
        {UI.relatedAtlas[lang]}
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
          <path d="M9 6l6 6-6 6" />
        </svg>
      </TransitionLink>
    </section>
  );
}
