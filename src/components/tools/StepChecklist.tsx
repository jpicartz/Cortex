'use client';

import { useId, useState } from 'react';

/**
 * For techniques whose steps ARE the exercise, the written steps become the
 * tool: same text, tickable. Nothing is persisted — ticking is only there to
 * hold your place while you work through it.
 */
export function StepChecklist({ steps }: { steps: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => steps.map(() => false));
  const baseId = useId();

  function toggle(index: number) {
    setChecked((prev) => prev.map((value, i) => (i === index ? !value : value)));
  }

  return (
    <ol className="space-y-2.5">
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
  );
}
