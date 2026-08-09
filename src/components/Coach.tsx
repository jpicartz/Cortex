'use client';

import { useRef, useState } from 'react';
import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { detectCrisis } from '@/lib/crisis';
import { MAX_SITUATION_CHARS } from '@/lib/prompt';
import { CrisisCard } from './CrisisCard';

type Status = 'idle' | 'streaming' | 'done' | 'crisis' | 'error';

export function Coach({ lang, stateId }: { lang: Lang; stateId: string }) {
  const [situation, setSituation] = useState('');
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorKey, setErrorKey] = useState<'coachError' | 'coachBusy' | 'coachTooShort'>(
    'coachError',
  );
  const abortRef = useRef<AbortController | null>(null);

  const tooShort = situation.trim().length < 10;

  async function submit(event: React.FormEvent) {
    event.preventDefault();

    if (tooShort) {
      setErrorKey('coachTooShort');
      setStatus('error');
      return;
    }

    /**
     * Crisis check runs BEFORE any network call. If it fires, the text never
     * leaves the device — that is the promise made on the resulting screen.
     */
    if (detectCrisis(situation)) {
      setStatus('crisis');
      return;
    }

    setAnswer('');
    setStatus('streaming');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateId, lang, situation: situation.trim() }),
        signal: controller.signal,
      });

      if (!response.ok) {
        setErrorKey(response.status === 429 || response.status === 503 ? 'coachBusy' : 'coachError');
        setStatus('error');
        return;
      }

      // The server's own crisis check (the client one is bypassable).
      const contentType = response.headers.get('content-type') ?? '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        setStatus(data?.crisis ? 'crisis' : 'error');
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setStatus('error');
        return;
      }

      const decoder = new TextDecoder();
      let received = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += decoder.decode(value, { stream: true });
        setAnswer(received);
      }

      // An empty stream means something failed upstream after headers were
      // committed — surface it rather than showing a blank success state.
      setStatus(received.trim().length > 0 ? 'done' : 'error');
    } catch (error) {
      if ((error as Error)?.name === 'AbortError') return;
      setStatus('error');
    } finally {
      abortRef.current = null;
    }
  }

  if (status === 'crisis') {
    return <CrisisCard lang={lang} onBack={() => setStatus('idle')} />;
  }

  const busy = status === 'streaming';

  return (
    <div className="rounded-card border border-edge bg-card p-5">
      <h2 className="font-display text-xl leading-snug tracking-tight text-fg">
        {UI.coachHeading[lang]}
      </h2>
      <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-fg-soft">{UI.coachHelp[lang]}</p>

      <form onSubmit={submit} className="mt-4">
        <label htmlFor="situation" className="sr-only">
          {UI.coachHeading[lang]}
        </label>
        <textarea
          id="situation"
          value={situation}
          onChange={(event) => {
            setSituation(event.target.value.slice(0, MAX_SITUATION_CHARS));
            if (status === 'error') setStatus('idle');
          }}
          placeholder={UI.coachPlaceholder[lang]}
          rows={4}
          maxLength={MAX_SITUATION_CHARS}
          className="w-full resize-y rounded-card border border-edge bg-page p-4 text-[1.0625rem] leading-relaxed text-fg placeholder:text-fg-mute focus:border-accent focus:outline-none"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs tabular-nums text-fg-mute">
            {situation.length}/{MAX_SITUATION_CHARS}
          </span>
          <button type="submit" disabled={busy} className="btn-accent">
            {busy ? UI.coachThinking[lang] : UI.coachSubmit[lang]}
          </button>
        </div>
      </form>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm leading-relaxed text-fg">
          {UI[errorKey][lang]}
        </p>
      )}

      {(busy || status === 'done') && answer && (
        <div className="mt-5 border-t border-edge pt-5">
          <div aria-live="polite" className="space-y-3">
            {answer.split(/\n{2,}/).map((paragraph, index) => (
              <p
                key={index}
                className="text-[1.0625rem] leading-[1.75] text-fg-soft"
              >
                {paragraph}
              </p>
            ))}
          </div>
          {status === 'done' && (
            <p className="mt-4 text-xs leading-relaxed text-fg-mute">
              {UI.coachDisclaimer[lang]}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
