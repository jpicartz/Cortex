import { z } from 'zod';
import {
  triageTreeSchema,
  mentalStateSchema,
  type Lang,
  type MentalState,
  type Region,
} from './schema';

import { ansiedad } from './states/ansiedad';
import { procrastinacion } from './states/procrastinacion';
import { pasado } from './states/pasado';
import { saturacion } from './states/saturacion';
import { enojo } from './states/enojo';
import { desmotivacion } from './states/desmotivacion';
import { comparacion } from './states/comparacion';
import { miedoAlJuicio } from './states/miedo-al-juicio';
import { insomnio } from './states/insomnio';
import { futuro } from './states/futuro';

/**
 * Menu order. Deliberate rather than alphabetical: the states someone is most
 * likely to open in acute distress come first, so the thing they need is
 * reachable without scrolling on a phone.
 */
import { racha } from './states/racha';
import { enfoque } from './states/enfoque';
import { radar } from './states/radar';
import { aguante } from './states/aguante';
import { triage } from './triage';
import { REGION_INFO } from './regions';

const RAW = [
  ansiedad,
  saturacion,
  procrastinacion,
  pasado,
  futuro,
  enojo,
  insomnio,
  desmotivacion,
  comparacion,
  miedoAlJuicio,

  /*
    The `good` band, rendered below a divider on the menu and never mixed in.
    Order here is still document order; the menu splits on `band`, not position.
  */
  racha,
  enfoque,
  radar,
  aguante,
];

/**
 * Parsed at module load, which happens during `next build` while generating
 * static params. A missing translation, a mismatched step count, an unknown
 * icon or a malformed source URL fails the build here rather than rendering
 * an empty element to someone who is having a bad night.
 */
function loadStates(): MentalState[] {
  return RAW.map((state, i) => {
    const result = mentalStateSchema.safeParse(state);
    if (!result.success) {
      const where = state?.id ?? `index ${i}`;
      // prettifyError gives a readable tree; .format() is deprecated in Zod 4.
      throw new Error(`Invalid content for state "${where}":\n${z.prettifyError(result.error)}`);
    }
    return result.data;
  });
}

export const STATES: readonly MentalState[] = (() => {
  const states = loadStates();

  // Ids and per-language slugs must be unique, or routing silently resolves
  // one page and orphans the other.
  const seen = new Map<string, string>();
  for (const s of states) {
    if (seen.has(s.id)) throw new Error(`Duplicate state id: ${s.id}`);
    seen.set(s.id, s.id);
    for (const lang of ['es', 'en'] as const) {
      const key = `${lang}:${s.slug[lang]}`;
      if (seen.has(key)) {
        throw new Error(`Duplicate ${lang} slug "${s.slug[lang]}" (${seen.get(key)} and ${s.id})`);
      }
      seen.set(key, s.id);
    }
  }

  return states;
})();

/**
 * The triage tree, parsed and cross-checked against the states above.
 *
 * Two failures are possible and both are caught here rather than at runtime: an
 * answer resolving to a state id that does not exist, and a state that no branch
 * can reach. The first would dead-end someone mid-flow; the second means a page
 * exists that the fastest route into the app can never offer, which is a content
 * bug even though nothing errors.
 */
export const TRIAGE = (() => {
  const parsed = triageTreeSchema.safeParse(triage);
  if (!parsed.success) {
    throw new Error(`Invalid triage tree:\n${z.prettifyError(parsed.error)}`);
  }

  const ids = new Set(STATES.map((s) => s.id));
  const reached = new Set<string>();

  for (const [key, question] of Object.entries(parsed.data.questions)) {
    for (const answer of question.answers) {
      if (!answer.state) continue;
      if (!ids.has(answer.state)) {
        throw new Error(`Triage question "${key}" resolves to unknown state "${answer.state}"`);
      }
      reached.add(answer.state);
    }
  }

  const unreachable = STATES.filter((s) => !reached.has(s.id)).map((s) => s.id);
  if (unreachable.length > 0) {
    throw new Error(`States unreachable from triage: ${unreachable.join(', ')}`);
  }

  return parsed.data;
})();

/**
 * Which states involve each brain region.
 *
 * This graph already existed implicitly — every state names the parts it
 * involves — but nothing surfaced it, so a state page was a dead end and
 * noticing that focus and overwhelm share the dlPFC was impossible.
 *
 * Derived rather than authored, so it cannot fall out of step with the states
 * themselves. Validated both ways: every region used must have a description,
 * and every described region must be used by something — an atlas entry nothing
 * links to is a page with a dead end on it.
 */
export const REGION_INDEX: ReadonlyMap<Region, readonly MentalState[]> = (() => {
  const index = new Map<Region, MentalState[]>();

  for (const state of STATES) {
    for (const part of state.mechanism.parts) {
      if (!part.region) continue;
      const list = index.get(part.region) ?? [];
      if (!list.includes(state)) list.push(state);
      index.set(part.region, list);
    }
  }

  for (const region of index.keys()) {
    if (!REGION_INFO[region]) {
      throw new Error(`Region "${region}" is used by a state but has no entry in regions.ts`);
    }
  }
  for (const region of Object.keys(REGION_INFO)) {
    if (!index.has(region as Region)) {
      throw new Error(`Region "${region}" is described in regions.ts but no state uses it`);
    }
  }

  return index;
})();

/**
 * Other states that share a brain region with this one.
 *
 * Ordered by how much they share, then capped — three links is a doorway, ten is
 * a sitemap. States built entirely from processes rather than places (worry has
 * no anatomical parts at all) correctly return nothing, and the caller must
 * render no block rather than an empty heading.
 */
export function relatedStates(state: MentalState, limit = 3): { state: MentalState; via: Region }[] {
  const shared = new Map<string, { state: MentalState; via: Region; count: number }>();

  for (const part of state.mechanism.parts) {
    if (!part.region) continue;
    for (const other of REGION_INDEX.get(part.region) ?? []) {
      if (other.id === state.id) continue;
      const existing = shared.get(other.id);
      if (existing) existing.count += 1;
      else shared.set(other.id, { state: other, via: part.region, count: 1 });
    }
  }

  return [...shared.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ state: s, via }) => ({ state: s, via }));
}

/** Resolve a localised URL segment back to its state. */
export function getStateBySlug(lang: Lang, slug: string): MentalState | undefined {
  return STATES.find((s) => s.slug[lang] === slug);
}

export function getStateById(id: string): MentalState | undefined {
  return STATES.find((s) => s.id === id);
}

/** Every (lang, slug) pair — drives `generateStaticParams`. */
export function allStateParams(): { lang: Lang; slug: string }[] {
  return STATES.flatMap((s) => [
    { lang: 'es' as const, slug: s.slug.es },
    { lang: 'en' as const, slug: s.slug.en },
  ]);
}

export * from './schema';
