'use client';

import { useState } from 'react';
import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';

/**
 * Deliberately ephemeral: component state only, no localStorage, no network.
 *
 * That is the point of the exercise (getting open loops out of working memory
 * does not require storing them) and it is also why this app holds no personal
 * data. The promise is stated in the UI, not just implemented quietly.
 */
export function BrainDump({
  prompt,
  lang,
}: {
  prompt: { es: string; en: string };
  lang: Lang;
}) {
  const [text, setText] = useState('');

  const count = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean).length;

  return (
    <div className="space-y-3">
      <label htmlFor="braindump" className="block text-sm leading-relaxed text-fg-soft">
        {prompt[lang]}
      </label>

      <textarea
        id="braindump"
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={8}
        spellCheck={false}
        className="w-full resize-y rounded-card border border-edge bg-page p-4 text-[1.0625rem] leading-relaxed text-fg placeholder:text-fg-mute focus:border-accent focus:outline-none"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-fg-mute">
          {count > 0 && (
            <span className="font-semibold text-accent-ink">
              {count} {UI.brainDumpCount[lang]}
            </span>
          )}
        </p>
        {text.length > 0 && (
          <button type="button" onClick={() => setText('')} className="btn-quiet">
            {UI.clear[lang]}
          </button>
        )}
      </div>

      <p className="text-xs leading-relaxed text-fg-mute">{UI.brainDumpPrivacy[lang]}</p>
    </div>
  );
}
