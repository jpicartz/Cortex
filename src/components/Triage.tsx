'use client';

import { useEffect, useRef, useState } from 'react';

import type { Lang, MentalState, TriageTree } from '@/content/schema';
import { UI, fill } from '@/lib/ui';
import { StateIcon } from './StateIcon';
import { TransitionLink } from './TransitionLink';

type Resolved = { state: MentalState };

/**
 * Two taps from "I feel bad" to the right page.
 *
 * The questions ask where a feeling is *located*, never what it is called —
 * because someone who could name it would have used the grid. Answers descend or
 * resolve; the tree itself lives in `content/triage.ts` and is validated against
 * the real state list at build time.
 *
 * On a result this links to `#start` on the state page, which lands directly on
 * the fast-path exercise rather than the top of an article.
 */
export function Triage({
  tree,
  states,
  lang,
}: {
  tree: TriageTree;
  states: readonly MentalState[];
  lang: Lang;
}) {
  const [path, setPath] = useState<string[]>([tree.root]);
  const [result, setResult] = useState<Resolved | null>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);

  const current = tree.questions[path[path.length - 1]];

  /*
    Focus follows the flow. Without this a keyboard or screen-reader user taps an
    answer and focus collapses to the document, leaving them to hunt for the
    question that just replaced the one they were reading.

    An effect keyed on the step, NOT `requestAnimationFrame`. rAF does not run in
    a hidden document, so a frame-scheduled focus call is silently dropped
    whenever the tab is not visible — and this is the one behaviour on the page
    that a keyboard user cannot work around. An effect runs after commit either
    way. `skip` keeps it off the very first render, so landing on the page does
    not yank focus out of the header.
  */
  const step = result ? `result:${result.state.id}` : path.join('/');
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    promptRef.current?.focus();
  }, [step]);

  function choose(answer: (typeof current)['answers'][number]) {
    if (answer.state) {
      const found = states.find((s) => s.id === answer.state);
      if (found) setResult({ state: found });
      return;
    }
    if (answer.next) {
      setPath((p) => [...p, answer.next as string]);
    }
  }

  function back() {
    if (result) {
      setResult(null);
    } else {
      setPath((p) => (p.length > 1 ? p.slice(0, -1) : p));
    }
  }

  function restart() {
    setResult(null);
    setPath([tree.root]);
  }

  if (result) {
    const state = result.state;
    return (
      <div
        data-accent={state.accent}
        className="rounded-card border border-accent/40 bg-accent/[0.06] p-5 sm:p-6"
      >
        {/* Announced, so the answer is not something only sighted users receive. */}
        <div aria-live="polite">
          <p
            ref={promptRef}
            tabIndex={-1}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink outline-none"
          >
            {UI.triageResult[lang]}
          </p>

          <div className="mt-3 flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-tile bg-accent/12 text-accent-ink">
              <StateIcon name={state.icon} className="size-7" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-2xl leading-tight tracking-tight text-fg sm:text-3xl">
                {state.label[lang]}
              </p>
              <p className="mt-1 text-[0.9375rem] leading-relaxed text-fg-soft">
                {state.blurb[lang]}
              </p>
            </div>
          </div>

          {/*
            The honesty line, and it is not decoration. This app's own disclaimer
            says it does not diagnose, and naming someone's state in two taps is
            exactly where that promise gets tested. No score, no confidence, and
            the way out sits next to the way forward rather than below it.
          */}
          <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-fg-soft">
            {fill(UI.triageDisclaimer[lang], { states: states.length })}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <TransitionLink href={`/${lang}/${state.slug[lang]}#start`} className="btn-accent">
            {UI.triageGo[lang]}
          </TransitionLink>
          <button type="button" onClick={restart} className="btn-quiet">
            {UI.triageNotIt[lang]}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-edge bg-card p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-ink">
        {UI.triageEyebrow[lang]}
      </p>

      <p
        ref={promptRef}
        tabIndex={-1}
        className="mt-3 font-display text-2xl leading-tight tracking-tight text-fg outline-none sm:text-3xl"
      >
        {current.prompt[lang]}
      </p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-mute">{UI.triageHelp[lang]}</p>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {current.answers.map((answer) => (
          <li key={answer.label[lang]}>
            <button
              type="button"
              onClick={() => choose(answer)}
              /*
                Same treatment as the menu tiles: these are the interactive
                targets of this section, and they are the same kind of object —
                a card you pick. `Spotlight` in the layout already delegates from
                the document, so this needs the class and nothing else.
              */
              className="card-lift spotlight group h-full w-full rounded-card border border-edge bg-raised p-4 text-left transition-colors hover:border-accent/60"
            >
              <span className="block text-[1.0625rem] leading-snug text-fg">
                {answer.label[lang]}
              </span>
              {answer.hint && (
                <span className="mt-1 block text-sm leading-relaxed text-fg-mute">
                  {answer.hint[lang]}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {path.length > 1 && (
        <button
          type="button"
          onClick={back}
          className="mt-4 text-sm font-medium text-fg-mute transition-colors hover:text-fg"
        >
          {UI.triageBack[lang]}
        </button>
      )}
    </div>
  );
}
