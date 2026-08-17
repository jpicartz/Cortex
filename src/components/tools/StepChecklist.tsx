'use client';

import { useEffect, useId, useState } from 'react';

import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';

/**
 * The written steps, tickable, with a progress bar and a spine.
 *
 * Every technique uses this now, not only the ones whose tool is a checklist.
 * Reading a numbered list and doing the thing are different acts, and a page
 * that cannot tell them apart reads as a document rather than something you
 * work through.
 *
 * Nothing is persisted, deliberately. Ticking holds your place for the minute
 * you are here and disappears with the tab, which keeps the promise on the
 * privacy line: the only things stored on your device are language and theme.
 */
export function StepChecklist({
  steps,
  lang,
  /**
   * Lets the card react when the last step lands. Called from a click handler,
   * never on a timer or a frame — the card's completion state is a response to
   * a person, so it costs one render per tick and nothing at rest.
   */
  onProgress,
}: {
  steps: string[];
  lang: Lang;
  onProgress?: (done: number, total: number) => void;
}) {
  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));
  const baseId = useId();

  const done = checked.filter(Boolean).length;
  const complete = done === steps.length;

  useEffect(() => {
    onProgress?.(done, steps.length);
  }, [done, steps.length, onProgress]);

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

      {/*
        ── The spine ────────────────────────────────────────────────────────

        A rule in its own left gutter, filling as the steps are ticked, so four
        rows read as one sequence rather than four unrelated lines.

        It sits BESIDE the checkboxes rather than running behind them. Threading
        it through their centres would need each box to punch a hole in the line
        using the card's own background — and that background differs between the
        accent-tinted `prominent` card and the plain list cards, so it would
        mismatch on one of them. A gutter has no occlusion problem on any surface.
      */}
      <div className="relative pl-4">
        <span aria-hidden="true" className="absolute bottom-2 left-0 top-2 w-px bg-edge" />
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-0 top-2 w-px origin-top bg-accent transition-transform duration-300 ease-out"
          style={{ transform: `scaleY(${done / steps.length})` }}
        />

        <ol className="space-y-1">
          {steps.map((step, index) => {
            const id = `${baseId}-${index}`;
            const isChecked = checked[index];

            return (
              <li key={step}>
                <label
                  htmlFor={id}
                  className="flex cursor-pointer items-start gap-3 rounded-tile px-2 py-1.5 transition-colors hover:bg-raised active:bg-edge/60"
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
    </div>
  );
}
