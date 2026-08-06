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

  /** FEEL — "you might be experiencing…". Recognition before explanation. */
  feel: biList,

  /** UNDERSTAND — the mechanism, in plain language. */
  mechanism: z.object({
    headline: bi,
    body: biList,
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
  }),

  /** FIX */
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
