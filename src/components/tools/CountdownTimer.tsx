'use client';

import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';

function format(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function CountdownTimer({ seconds, lang }: { seconds: number; lang: Lang }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;

    /*
      Anchored to wall-clock time rather than counting interval ticks: a
      backgrounded tab throttles setInterval, and a five-minute timer that
      quietly becomes eight minutes would undermine the whole point.
    */
    const endsAt = Date.now() + left * 1000;

    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining === 0) setRunning(false);
    }, 250);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // `left` is intentionally not a dependency: it changes every tick, and
    // re-running this effect would reset the anchor on each one.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const finished = left === 0;
  const progress = 1 - left / seconds;
  const circumference = 2 * Math.PI * 46;

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="relative grid size-44 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--c-edge)" strokeWidth="3" />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="var(--c-accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 250ms linear' }}
          />
        </svg>

        <div className="relative text-center">
          {finished ? (
            <p className="font-display text-xl text-fg">{UI.timerFinished[lang]}</p>
          ) : (
            <p
              className="text-4xl font-semibold tabular-nums text-fg"
              aria-live="off"
              role="timer"
            >
              {format(left)}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!running && !finished && (
          <button type="button" onClick={() => setRunning(true)} className="btn-accent">
            {left === seconds ? UI.start[lang] : UI.resume[lang]}
          </button>
        )}
        {running && (
          <button type="button" onClick={() => setRunning(false)} className="btn-quiet">
            {UI.pause[lang]}
          </button>
        )}
        {left !== seconds && (
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setLeft(seconds);
            }}
            className="btn-quiet"
          >
            {UI.reset[lang]}
          </button>
        )}
      </div>
    </div>
  );
}
