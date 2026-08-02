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
export function TechniqueCard({ technique, lang }: { technique: Technique; lang: Lang }) {
  const steps = technique.steps[lang];
  const tool = technique.tool;

  // For checklist techniques the steps themselves become the interaction,
  // so rendering both a plain list and a checklist would just duplicate them.
  const stepsAreTheTool = tool?.kind === 'checklist';

  return (
    <section className="rounded-card border border-edge bg-card p-5">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-xl leading-snug tracking-tight text-fg">
          {technique.name[lang]}
        </h3>
        <span className="shrink-0 rounded-full bg-accent/12 px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
          {technique.durationHint[lang]}
        </span>
      </header>

      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-fg-soft">
        <span className="font-semibold text-fg">{UI.whyItWorks[lang]}: </span>
        {technique.why[lang]}
      </p>

      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-fg-mute">
          {UI.theSteps[lang]}
        </h4>

        <div className="mt-3">
          {stepsAreTheTool ? (
            <StepChecklist steps={steps} />
          ) : (
            <ol className="space-y-2.5">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-raised text-xs font-semibold tabular-nums text-fg-mute">
                    {index + 1}
                  </span>
                  <span className="text-[1.0625rem] leading-relaxed text-fg-soft">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>

      {tool && !stepsAreTheTool && (
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
      )}
    </section>
  );
}
