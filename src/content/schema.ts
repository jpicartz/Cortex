import { z } from 'zod';

/**
 * The content IS the app. Everything below is parsed at build time (see
 * `content/index.ts`), so a missing translation, an empty step list, or an
 * unknown icon fails `next build` instead of shipping a blank <p> to someone
 * having a panic attack.
 */

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

/** A string that exists in both languages. */
const bi = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});

/**
 * A list that exists in both languages, with the same number of items.
 * The length check is the important part: it catches a translation that
 * silently dropped a bullet, which reads as "fine" in one language only.
 */
const biList = z
  .object({
    es: z.array(z.string().min(1)).min(1),
    en: z.array(z.string().min(1)).min(1),
  })
  .refine((v) => v.es.length === v.en.length, {
    message: 'es and en lists must have the same number of items',
  });

const slug = z
  .string()
  .min(2)
  .regex(/^[a-z0-9-]+$/, 'slugs are lowercase, digits and hyphens only (no accents)');

const id = z.string().regex(/^[a-z0-9-]+$/);

/**
 * The four interactive tools. A discriminated union rather than
 * `tool: string` + `config: unknown`, so each tool's own settings are typed
 * and validated with it.
 */
export const toolSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('breath'),
    /**
     * sigh   — physiological sigh: double inhale, long exhale
     * box    — 4-4-4-4
     * exhale — extended exhale, inhale 4 / exhale 8
     */
    pattern: z.enum(['sigh', 'box', 'exhale']),
    cycles: z.number().int().min(1).max(20),
  }),
  z.object({
    kind: z.literal('timer'),
    seconds: z.number().int().min(30).max(1800),
  }),
  z.object({
    kind: z.literal('braindump'),
    prompt: bi,
  }),
  z.object({
    kind: z.literal('checklist'),
  }),
]);

export type ToolConfig = z.infer<typeof toolSchema>;

/**
 * Icon keys are an enum, not a free string, so a typo is a build error rather
 * than a silently missing glyph. Keep in sync with `components/StateIcon.tsx`.
 */
export const ICONS = [
  'activity-heartbeat',
  'hourglass',
  'history',
  'stack',
  'flame',
  'battery',
  'scale',
  'eye',
  'moon',
  'timeline',
  'trend-up',
  'target',
  'radar',
] as const;
export type IconKey = (typeof ICONS)[number];

/**
 * Brain regions the diagram can point at. Keys map to geometry in
 * `components/brain/regions.ts`; a part without one is a concept, not a place.
 *
 * An enum rather than a free string, so a typo fails `next build` alongside
 * every other content mistake instead of silently drawing nothing.
 */
export const REGIONS = [
  'amygdala',
  'prefrontal',
  'vlpfc',
  'dlpfc',
  'acc',
  'hippocampus',
  'ventral-striatum',
  'limbic',
  'dmn',
  'reward-path',
  'scn',
  'vagus',
] as const;
export type Region = (typeof REGIONS)[number];

/**
 * The waveform each state carries — a visual signature, not decoration.
 *
 * The shape says something true about the state: anxiety is fast and erratic,
 * no-motivation is flat and low-amplitude, stuck-in-the-past loops back on
 * itself, anger spikes and decays. Generators live in `components/wave.ts`.
 *
 * An enum so a typo fails the build like every other content mistake.
 */
export const SIGNATURES = [
  /** Fast, sharp, irregular. */
  'erratic',
  /** Flat for a long time, then a late scramble. */
  'stall',
  /** Several waves overlapping until none is legible. */
  'layered',
  /** Amplitude that keeps climbing and never resolves. */
  'runaway',
  /** Returns to where it started, again. */
  'loop',
  /** One hard spike, then decay. */
  'spike',
  /** Long, slow, low-frequency. */
  'slow',
  /** Barely moves at all. */
  'flat',
  /** Two traces at different levels, side by side. */
  'compare',
  /** A spike followed by smaller repeats of itself. */
  'echo',
  /** Climbing, and still climbing. */
  'rising',
  /** Strong, even, unbroken. */
  'steady',
  /** Sweeping back and forth, looking. */
  'scan',
] as const;
export type Signature = (typeof SIGNATURES)[number];

/** Accent tokens; each has a light and dark value in globals.css. */
export const ACCENTS = [
  'sky',
  'amber',
  'violet',
  'teal',
  'rose',
  'orange',
  'fuchsia',
  'indigo',
  'cyan',
  'emerald',
] as const;
export type Accent = (typeof ACCENTS)[number];

export const techniqueSchema = z.object({
  id,
  name: bi,
  /** One line: which mechanism this technique actually targets. */
  why: bi,
  /** Human-readable time cost, shown before someone commits. "2 minutos" */
  durationHint: bi,
  /** The in-app exercise. `null` means the written steps stand alone. */
  tool: toolSchema.nullable(),
  /** Always rendered, tool or no tool. */
  steps: biList,
});

export type Technique = z.infer<typeof techniqueSchema>;

export const mentalStateSchema = z.object({
  id,
  /**
   * Localised URLs — /es/ansiedad and /en/anxiety. Someone searching in
   * Spanish should land on a Spanish URL.
   */
  slug: z.object({ es: slug, en: slug }),

  label: bi,
  blurb: bi,
  icon: z.enum(ICONS),
  accent: z.enum(ACCENTS),
  signature: z.enum(SIGNATURES),

  /**
   * Size on the menu grid. Editorial weight — how much this state has to say —
   * NOT a claim about how common it is. We have no analytics, and sizing tiles
   * by guessed frequency would be asserting something we cannot support.
   */
  tile: z.enum(['feature', 'standard']),

  /**
   * Which half of the menu this belongs to.
   *
   * `good` states render below a divider, never interleaved with `difficult`
   * ones. Someone opening this app at 2am must not have to scroll past "I feel
   * great" to reach the thing that helps, and a grid that mixes them would put
   * a cheerful tile directly beside a panic one.
   */
  band: z.enum(['difficult', 'good']),

  /** FEEL — "you might be experiencing…". Recognition before explanation. */
  feel: biList,

  /** UNDERSTAND — the mechanism, in plain language. */
  mechanism: z
    .object({
    headline: bi,
    body: biList,

    /**
     * Which part each body paragraph is talking about, by index.
     *
     * The mechanism is told as a pinned sequence: the amygdala paragraph should
     * be on screen while the amygdala is lit. Omit this and paragraphs are split
     * evenly across the parts, which is already close — ansiedad's prose runs
     * alarm → labelling → breath, matching its three parts in order. Supply it
     * only where the even split lands wrong.
     *
     * One array covers both languages: `biList` already guarantees `es` and
     * `en` have the same number of paragraphs.
     */
    focus: z.array(z.number().int().min(0)).optional(),

    /**
     * Which body paragraph is the analogy, by index.
     *
     * Every state's mechanism turns on one concrete image — the smoke alarm,
     * fifteen browser tabs, a photo redrawn by hand each time you look at it,
     * the man clapping to keep elephants away. Those are the lines people
     * actually carry out of the page, and burying them as paragraph three of
     * five is what made a page of decent writing read as generated filler.
     *
     * Optional because not every state has one: `miedo-al-juicio` argues from
     * evidence rather than image, and inventing an analogy to fill the slot
     * would be worse than leaving it out.
     */
    analogy: z.number().int().min(0).optional(),

    /** Labelled parts for the diagram. Two or three, never more. */
    parts: z
      .array(
        z.object({
          name: bi,
          role: bi,
          /**
           * Where this part actually is, when it is a place at all.
           *
           * Roughly half the parts across the ten states are processes,
           * chemicals or cognitive biases — "memoria de trabajo", "bucles
           * abiertos", "efecto reflector". Those carry no region and render
           * as concept nodes beside the diagram. Giving them a position on a
           * brain would be inventing anatomy, which is exactly what would
           * undercut the citations this app rests on.
           */
          region: z.enum(REGIONS).optional(),
        }),
      )
      .min(1)
      .max(3),
    })
    .refine((m) => !m.focus || m.focus.length === m.body.es.length, {
      message: 'mechanism.focus must have one entry per body paragraph',
      path: ['focus'],
    })
    .refine((m) => !m.focus || m.focus.every((i) => i < m.parts.length), {
      message: 'mechanism.focus points at a part index that does not exist',
      path: ['focus'],
    })
    .refine((m) => m.analogy === undefined || m.analogy < m.body.es.length, {
      message: 'mechanism.analogy points at a body paragraph that does not exist',
      path: ['analogy'],
    }),

  /**
   * FIX.
   *
   * ORDER IS LOAD-BEARING: `techniques[0]` is surfaced on its own at the top of
   * the page as the fast path, above the mechanism, for someone who needs to
   * stabilise before they can read anything. Author the most immediate
   * intervention first — the physiological sigh for ansiedad, the ninety
   * seconds for enojo — and do not reorder without checking what lands there.
   */
  techniques: z.array(techniqueSchema).min(2),

  /** Citations are what separate this from a wellness blog. */
  sources: z
    // z.url() rather than z.string().url() — the latter is deprecated in Zod 4.
    .array(z.object({ label: z.string().min(1), url: z.url() }))
    .min(1),

  /** Hand-written for the actual search query, not derived from the label. */
  seo: z.object({ title: bi, description: bi }),
});

export type MentalState = z.infer<typeof mentalStateSchema>;

/**
 * The triage tree: two taps from "I feel bad" to a state page.
 *
 * An answer either descends (`next`) or resolves (`state`) — never both and
 * never neither, which the refine below enforces. The referenced ids are checked
 * against the parsed states in `content/index.ts`, because a typo here would
 * dead-end someone who is already having a bad night, and it should fail the
 * build instead.
 */
const triageAnswerSchema = z
  .object({
    label: bi,
    /** Optional second line; useful where the label alone is ambiguous. */
    hint: bi.optional(),
    /** Descend to another question. */
    next: z.string().min(1).optional(),
    /** Or resolve to a state id. */
    state: id.optional(),
  })
  .refine((a) => Boolean(a.next) !== Boolean(a.state), {
    message: 'a triage answer must either descend (next) or resolve (state), not both or neither',
  });

export const triageTreeSchema = z
  .object({
    root: z.string().min(1),
    questions: z.record(
      z.string().min(1),
      z.object({
        prompt: bi,
        answers: z.array(triageAnswerSchema).min(2).max(4),
      }),
    ),
  })
  .refine((t) => Boolean(t.questions[t.root]), {
    message: 'triage.root does not name a question',
    path: ['root'],
  })
  .refine(
    (t) =>
      Object.values(t.questions).every((q) =>
        q.answers.every((a) => !a.next || Boolean(t.questions[a.next])),
      ),
    { message: 'a triage answer descends to a question that does not exist' },
  );

export type TriageTree = z.infer<typeof triageTreeSchema>;
