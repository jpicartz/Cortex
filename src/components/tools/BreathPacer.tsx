'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';

type Phase = {
  labelKey: 'inhale' | 'inhaleAgain' | 'exhale' | 'hold';
  ms: number;
  /** Ring size at the END of this phase. */
  scale: number;
};

/**
 * Phases are driven from JS and the ring is a CSS transition triggered by the
 * phase change — so the label, the countdown and the animation are the same
 * source of truth and cannot drift apart. (A pure CSS keyframe animation with
 * separately-timed labels drifts within a few cycles.)
 */
const PATTERNS: Record<'sigh' | 'box' | 'exhale', Phase[]> = {
  // Physiological sigh: full inhale, short top-up inhale, long slow exhale.
  sigh: [
    { labelKey: 'inhale', ms: 2000, scale: 0.9 },
    { labelKey: 'inhaleAgain', ms: 900, scale: 1 },
    { labelKey: 'exhale', ms: 5000, scale: 0.5 },
  ],
  box: [
    { labelKey: 'inhale', ms: 4000, scale: 1 },
    { labelKey: 'hold', ms: 4000, scale: 1 },
    { labelKey: 'exhale', ms: 4000, scale: 0.5 },
    { labelKey: 'hold', ms: 4000, scale: 0.5 },
  ],
  // Extended exhale: the out-breath is what lowers heart rate.
  exhale: [
    { labelKey: 'inhale', ms: 4000, scale: 1 },
    { labelKey: 'exhale', ms: 8000, scale: 0.5 },
  ],
};

export function BreathPacer({
  pattern,
  cycles,
  lang,
}: {
  pattern: 'sigh' | 'box' | 'exhale';
  cycles: number;
  lang: Lang;
}) {
  const phases = PATTERNS[pattern];

  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cyclesLeft, setCyclesLeft] = useState(cycles);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /**
   * Cycle countdown lives in a ref as well as state. The ref is the source of
   * truth for the timing logic (the timeout closure would otherwise read a
   * stale value); the state copy exists only to render the number.
   */
  const cyclesRef = useRef(cycles);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!running) return;

    const phase = phases[phaseIndex];

    timerRef.current = setTimeout(() => {
      const isLastPhase = phaseIndex === phases.length - 1;
      if (!isLastPhase) {
        setPhaseIndex((i) => i + 1);
        return;
      }

      /*
        This runs in a timeout callback, NOT inside a state updater. Updaters
        must be pure: React StrictMode invokes them twice in development, so
        driving the cycle count from inside one burned through every cycle in
        a couple of seconds instead of running the full exercise.
      */
      const remaining = cyclesRef.current - 1;
      cyclesRef.current = remaining;
      setCyclesLeft(remaining);

      if (remaining <= 0) {
        setRunning(false);
        setFinished(true);
      } else {
        setPhaseIndex(0);
      }
    }, phase.ms);

    return clearTimers;
  }, [running, phaseIndex, phases, clearTimers]);

  function start() {
    clearTimers();
    cyclesRef.current = cycles;
    setFinished(false);
    setCyclesLeft(cycles);
    setPhaseIndex(0);
    setRunning(true);
  }

  function stop() {
    clearTimers();
    setRunning(false);
  }

  function reset() {
    clearTimers();
    cyclesRef.current = cycles;
    setRunning(false);
    setFinished(false);
    setPhaseIndex(0);
    setCyclesLeft(cycles);
  }

  const phase = phases[phaseIndex];
  const scale = running ? phase.scale : 0.6;

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <div className="relative grid size-44 place-items-center">
        {/* Track */}
        <div className="absolute inset-0 rounded-full border border-edge" />

        {/* The breathing ring. Duration matches the phase exactly. */}
        <div
          className="breath-ring absolute size-40 rounded-full bg-accent/15 ring-1 ring-accent/40"
          style={{
            transform: `scale(${scale})`,
            transitionProperty: 'transform',
            transitionDuration: `${running ? phase.ms : 400}ms`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.4, 1)',
          }}
        />

        <div className="relative text-center">
          {finished ? (
            <p className="px-6 text-sm leading-relaxed text-fg-soft">{UI.breathFinished[lang]}</p>
          ) : running ? (
            <>
              {/* Announce phase changes for screen reader users. */}
              <p aria-live="polite" className="font-display text-xl text-fg">
                {UI[phase.labelKey][lang]}
              </p>
              {/*
                Keyed by phase, so a new phase REMOUNTS it and the seconds come
                from `useState`'s initialiser. That is the whole reason this is
                a component: the count used to be parent state reset by a
                synchronous `setRemaining` inside the timing effect, which
                rendered once with the previous phase's number before correcting
                itself.
              */}
              <PhaseCountdown
                key={`${cyclesLeft}-${phaseIndex}`}
                seconds={Math.ceil(phase.ms / 1000)}
              />
            </>
          ) : (
            <p className="text-sm text-fg-mute">
              {cyclesLeft} {UI.cyclesLeft[lang]}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!running && !finished && (
          <button type="button" onClick={start} className="btn-accent">
            {UI.start[lang]}
          </button>
        )}
        {running && (
          <button type="button" onClick={stop} className="btn-quiet">
            {UI.pause[lang]}
          </button>
        )}
        {(finished || (!running && cyclesLeft !== cycles)) && (
          <button type="button" onClick={reset} className="btn-quiet">
            {UI.reset[lang]}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * The per-second countdown for one phase.
 *
 * Visible so the exercise still reads correctly for anyone with reduced motion
 * enabled, where the ring does not animate and the number is the only cue that
 * time is passing. It floors at 1 rather than 0: the phase ends on the parent's
 * timeout, and showing 0 for a beat before the label changes reads as a stall.
 */
function PhaseCountdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => (r > 1 ? r - 1 : 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mt-0.5 text-3xl font-semibold tabular-nums text-accent-ink">{remaining}</p>
  );
}
