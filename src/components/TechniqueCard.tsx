'use client';

import { useCallback, useState } from 'react';

import type { Lang, MentalState, Technique } from '@/content/schema';
import { UI } from '@/lib/ui';
import { BreathPacer } from './tools/BreathPacer';
import { CountdownTimer } from './tools/CountdownTimer';
import { BrainDump } from './tools/BrainDump';
import { StepChecklist } from './tools/StepChecklist';

/**
 * Written steps are always present. The tool is a layer on top of them, never
 * a replacement — someone should be able to read this page, close the tab, and
 * still know exactly what to do.
 */
export function TechniqueCard({
  technique,
  lang,
  /**
   * The fast-path rendering at the top of a state page: same technique, same
   * steps, same tool — louder surface and a heading that gives permission to
   * stop there. Deliberately a variant rather than a second component, so the
   * two can never drift apart in content.
   */
  prominent = false,
  /** Which half of the menu the state belongs to; only the blurb varies. */
  band = 'difficult',
}: {
  technique: Technique;
  lang: Lang;
  prominent?: boolean;
  band?: MentalState['band'];
}) {
  const steps = technique.steps[lang];
  const tool = technique.tool;

  const [complete, setComplete] = useState(false);
  /*
    Stable identity matters here. `StepChecklist` reports progress from an
    effect keyed on this callback, so an inline arrow would give it a new
    dependency every render — which would re-fire the effect, set state, render
    again, and loop forever.
  */
  const handleProgress = useCallback((doneCount: number, total: number) => {
    setComplete(total > 0 && doneCount === total);
  }, []);

  // For checklist techniques the steps themselves become the interaction,
  // so rendering both a plain list and a checklist would just duplicate them.
  const stepsAreTheTool = tool?.kind === 'checklist';

  /*
    ── Order flips on the fast path. ────────────────────────────────────────

    Reading a technique and doing it are different jobs. In the list further
    down the page you are reading, so the steps come first and the tool follows
    as somewhere to practise. In the `prominent` block at the top you are not
    reading — you are having a bad minute and you came for the thing that works.
    Four checkboxes standing between someone mid-panic and the breathing pacer
    is a real cost, so up there the tool leads.
  */
  const stepsBlock = (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
        {UI.theSteps[lang]}
      </h4>

      {/*
        Every technique's steps are tickable now, not only the ones whose tool is
        a checklist. The distinction was never meaningful to a reader: you are
        working through a sequence either way, and a static list gives you
        nowhere to put your place when you look up mid-exercise.
      */}
      <div className="mt-3">
        <StepChecklist steps={steps} lang={lang} onProgress={handleProgress} />
      </div>
    </div>
  );

  const toolBlock =
    tool && !stepsAreTheTool ? (
      <div className="rounded-card border border-edge bg-raised p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-mute">
          {UI.practiceHere[lang]}
        </h4>

        {tool.kind === 'breath' && (
          <BreathPacer pattern={tool.pattern} cycles={tool.cycles} lang={lang} />
        )}
        {tool.kind === 'timer' && <CountdownTimer seconds={tool.seconds} lang={lang} />}
        {tool.kind === 'braindump' && <BrainDump prompt={tool.prompt} lang={lang} />}
      </div>
    ) : null;

  /*
    ── Side by side, because neither half needs the full width. ─────────────

    Stacked, this card measured 823px tall at 15% ink: a 176px breathing orb
    centred in a 678×314 box, then four step rows spanning 678px to carry
    359–634px of text. Two narrow things taking turns at being wide.

    Ordering is still expressed as SOURCE order, not as grid placement, so the
    rule above survives untouched — and on mobile, where this collapses to one
    column, the reading order is automatically the right one.
  */
  /*
    The same accent rule the analogy wears in the mechanism section, so the two
    halves of the page share a language instead of one looking newer.
  */
  const whyBlock = (
    <p className="max-w-prose border-l-2 border-accent py-0.5 pl-4 text-[0.9375rem] leading-relaxed text-fg-soft">
      <span className="font-semibold text-fg">{UI.whyItWorks[lang]}: </span>
      {technique.why[lang]}
    </p>
  );

  /*
    Checklist techniques have no separate tool — their steps ARE the exercise —
    so there is nothing to put beside them and they stayed a single column with
    every line using about half the card. The rationale moves into that space
    instead of sitting above as a header paragraph, which both fills the card and
    reads better: why it works belongs next to what you do, not before it.
  */
  const body = toolBlock ? (
    <div
      className={`mt-6 grid gap-5 lg:gap-6 ${
        prominent ? 'lg:grid-cols-[0.85fr_1fr]' : 'lg:grid-cols-[1fr_0.85fr]'
      }`}
    >
      {prominent ? toolBlock : stepsBlock}
      {prominent ? stepsBlock : toolBlock}
    </div>
  ) : (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:gap-8">
      {stepsBlock}
      {/*
        A plain div, not an `<aside>`. This is a fragment inside one card, not
        content complementary to the page — as an aside it registered as a
        `complementary` landmark, unnamed, several per page, cluttering the
        landmark list a screen-reader user navigates by.
      */}
      <div>{whyBlock}</div>
    </div>
  );

  return (
    /*
      ── Two states, and neither is a hover. ──────────────────────────────────

      `focus-within`, deliberately, not `card-lift`. The menu cards lift because
      they are links, and the lift is a promise that clicking does something. A
      technique card is a container you work INSIDE — it is not a target — so a
      hover lift here would be a false affordance. Instead the card responds when
      you are genuinely using it, driven by whichever checkbox or control you
      touched.

      Completion tints the card in its own ACCENT rather than a green. There is
      no success token in this palette, and adding one means a new colour pair
      swept across ten hues in two themes; a per-state accent brightening is also
      more coherent than a green that belongs to no state.
    */
    <section
      className={`rounded-card border p-5 transition-colors duration-300 ${
        prominent ? 'sm:p-6' : ''
      } ${
        complete
          ? // `accent-fill`, not `accent`: the completed border is a state
            // indicator, and against its own tinted surface plain accent tops
            // out at 2.76:1 even fully opaque — under the 3:1 that non-text UI
            // needs. The fill token measures 4.38:1 at the worst of ten hues.
            'border-accent-fill bg-accent/[0.09]'
          : prominent
            ? 'border-accent/40 bg-accent/[0.06] focus-within:border-accent/70'
            : 'border-edge bg-card focus-within:border-accent/50'
      }`}
    >
      {prominent && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
          {UI.startHere[lang]}
        </p>
      )}

      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3
          className={`font-display leading-snug tracking-tight text-fg ${
            prominent ? 'text-2xl sm:text-3xl' : 'text-xl'
          }`}
        >
          {technique.name[lang]}
        </h3>
        <span className="shrink-0 rounded-full bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
          {technique.durationHint[lang]}
        </span>
      </header>

      {prominent && (
        <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-fg-soft">
          {band === 'good' ? UI.startHereHelpGood[lang] : UI.startHereHelp[lang]}
        </p>
      )}

      {/* When there is no tool, this moves down into the second column instead. */}
      {toolBlock && <div className="mt-2.5">{whyBlock}</div>}

      {body}

      {/*
        The one confirmation on the site, and so the one place the spring lives.
        Calm ease-out carries everything explanatory; overshoot is reserved for
        "you just did a thing", which until now nothing on this page was.
      */}
      {complete && (
        <p className="mt-5 flex items-center gap-2.5 text-[0.9375rem] leading-relaxed text-fg">
          <span
            aria-hidden="true"
            className="animate-pop grid size-6 shrink-0 place-items-center rounded-full bg-accent-fill text-on-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-3.5">
              <path
                d="M4 12.5 9.5 18 20 6.5"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          {UI.breathFinished[lang]}
        </p>
      )}
    </section>
  );
}
