'use client';

import { useId, useState } from 'react';

import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';

/**
 * The written steps, tickable, with a progress bar.
 *
 * Every technique uses this now, not only the ones whose tool IS a checklist.
 * Reading a numbered list and doing the thing are different acts, and a page
 * that cannot tell them apart reads as a document rather than something you
 * work through — which was the note: "plain text rather than an interactive
 * platform".
 *
 * Nothing is persisted, deliberately. Ticking holds your place for the minute
 * you are here and disappears with the tab, which keeps the promise on the
 * privacy line: the only things stored on your device are language and theme.
 */
export function StepChecklist({ steps, lang }: { steps: string[]; lang: Lang }) {
  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));
  const baseId = useId();

  const done = checked.filter(Boolean).length;
  const complete = done === steps.length;

  function toggle(index: number) {
    setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-edge"
          role="progressbar"
          aria-valuenow={done}
          aria-valuemin={0}
          aria-valuemax={steps.length}
          aria-label={UI.theSteps[lang]}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${(done / steps.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-fg-mute">
          {complete ? UI.done[lang] : `${done} / ${steps.length}`}
        </span>
      </div>

      <ol className="space-y-1">
        {steps.map((step, index) => {
          const id = `${baseId}-${index}`;
          const isChecked = checked[index];

          return (
            <li key={step}>
              <label
                htmlFor={id}
                className="flex cursor-pointer items-start gap-3 rounded-tile px-2 py-1.5 transition-colors hover:bg-raised"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(index)}
                  className="mt-1 size-4 shrink-0 accent-[var(--c-accent-fill)]"
                />
                <span
                  className={`text-[1.0625rem] leading-relaxed transition-colors ${
                    isChecked ? 'text-fg-mute line-through' : 'text-fg-soft'
                  }`}
                >
                  {step}
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
