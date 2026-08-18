# Cortex

Understand your brain. Change how you feel.

Cortex explains the neuroscience behind thirteen common mental states in plain
language, and gives you something to actually do about each one in the next five
minutes. Spanish and English, no accounts, no tracking.

Live at [cortex-tau-three.vercel.app](https://cortex-tau-three.vercel.app).

---

## What makes this different from a wellness blog

Every mechanism claim is cited, and the citations are checked (see
[Citations](#citations) below). Where the evidence is a popular book rather than
a controlled trial — the ninety-second anger window, for instance — the prose
says so in-line rather than borrowing authority it does not have.

The app does not diagnose. The triage flow says "closest match, not a diagnosis"
and offers a way out on the same screen as the way forward.

## Architecture

**Content is the source of truth.** Each state is one file in
`src/content/states/`, parsed by Zod at module load — which happens during
`next build`. A missing translation, a mismatched step count between languages,
an unknown icon, a source list that is too short, or a triage answer pointing at
a state that does not exist all fail the build rather than shipping a blank
element to someone having a bad night.

```
src/content/     states, schema, the triage tree — all build-time validated
src/components/  UI; brain/ holds the diagram, the Cajal field and the stage
src/lib/         crisis detection, scroll driver, UI strings, prefs
src/app/[lang]/  every route lives under a language segment
```

There is deliberately no `app/layout.tsx`. The topmost layout is
`app/[lang]/layout.tsx`, which is what lets `<html lang>` be correct per language
instead of hardcoded. `/` redirects via `src/proxy.ts`.

### Invariants worth knowing before you change things

- **The crisis path never makes a network request.** `src/lib/crisis.ts`
  intercepts before anything is sent, and its 42 tests include idioms that must
  *not* fire ("me muero de risa", "this deadline is killing me"). Re-verify the
  helpline numbers against official sources before every release.
- **One rAF loop.** Everything scroll-linked subscribes to
  `src/lib/scrollDriver.ts`. Do not add a second listener or a second observer;
  two systems measuring the page disagree about where it is.
- **Motion is calm by default.** Overshoot is reserved for confirmations — right
  now that is exactly one thing, finishing a technique. Explanatory motion uses
  ease-out, because this app is for people who are already activated.
- **Reduced motion is a design, not a fallback.** The mechanism section has a
  fully composed static form with an annotated figure. Roughly a tenth of users
  have it on, and this audience skews higher.
- **Contrast is measured, not eyeballed.** Three separate colour bugs in this
  project passed visual review and failed WCAG. Sweep every new pair across all
  ten accent hues in both themes.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

The AI coach needs `ANTHROPIC_API_KEY` in `.env.local`. Without it the rest of
the app works; only the coach returns an error.

## Verifying

```bash
npm run typecheck
npm test             # 46 tests, no network
npm run lint         # 3 known pre-existing set-state-in-effect errors
npm run build        # 60 static pages
npm run check:sources   # network — before a release, not in CI
```

### Citations

`npm test` checks citation *shape*: parseable, https, unique, labelled
specifically enough to verify.

`npm run check:sources` fetches every URL and fails on anything that does not
resolve. This exists because shape checks are not enough — two citations in this
project's history were perfectly well-formed and pointed at the wrong paper. It
found a dead Huberman Lab link on its first run.

Publishers that block automated requests (`doi.org`, SAGE, Cell, Oxford
Academic, APA) are allowlisted and reported as unverifiable rather than passing
silently. Roughly half the citations currently fall into that bucket, so a green
run means "nothing known-broken", not "everything confirmed". The list is kept
short on purpose; if it grows, the check becomes theatre.

## Content conventions

- `techniques[0]` is load-bearing — it is surfaced on its own at the top of the
  page as the fast path. Author the most immediate intervention first.
- On the menu's six-column grid, a row only fills as two `feature` tiles (3+3) or
  three `standard` ones (2+2+2), so features must fall in adjacent pairs in
  `content/index.ts` order.
- `mechanism.analogy` names the paragraph carrying the state's one concrete
  image. It renders pulled out, because that is the line people remember.
- `band: 'good'` states render below a divider and are never interleaved. Someone
  opening this at 2am must not scroll past a cheerful tile to reach help.
