'use client';

import type { Lang, Technique } from '@/content/schema';
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
}: {
  technique: Technique;
  lang: Lang;
  prominent?: boolean;
}) {
  const steps = technique.steps[lang];
  const tool = technique.tool;

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
    <div className="mt-5">
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
        <StepChecklist steps={steps} lang={lang} />
      </div>
    </div>
  );

  const toolBlock =
    tool && !stepsAreTheTool ? (
      <div className="mt-6 rounded-card border border-edge bg-raised p-4">
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

  return (
    <section
      className={
        prominent
          ? 'rounded-card border border-accent/40 bg-accent/[0.06] p-5 sm:p-6'
          : 'rounded-card border border-edge bg-card p-5'
      }
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
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-soft">
          {UI.startHereHelp[lang]}
        </p>
      )}

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-soft">
        <span className="font-semibold text-fg">{UI.whyItWorks[lang]}: </span>
        {technique.why[lang]}
      </p>

      {prominent && toolBlock}
      {stepsBlock}
      {!prominent && toolBlock}
    </section>
  );
}
