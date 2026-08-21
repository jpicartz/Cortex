import type { TriageTree } from './schema';

/**
 * Two taps from "I feel bad" to the right page.
 *
 * Using Cortex previously required diagnosing yourself first: arrive distressed,
 * then pick correctly from thirteen tiles. Anxiety, overwhelm and worrying about
 * the future are genuinely hard to tell apart from the inside, and choosing is a
 * cognitive task at exactly the wrong moment.
 *
 * Deliberately a fixed tree and not a model call. No latency when someone is
 * least able to wait, no misrouting, no per-visit cost, and it works with no
 * signal. The questions discriminate on where a state is *felt*, which is
 * answerable without knowing what the state is called — the whole point.
 *
 * The ids below are checked against the parsed states at build time, so a typo
 * fails `next build` rather than dead-ending someone having a bad night.
 */
export const triage: TriageTree = {
  root: 'where',

  questions: {
    where: {
      prompt: {
        es: '¿Dónde lo sientes ahora?',
        en: 'Where is it right now?',
      },
      answers: [
        {
          label: { es: 'En el cuerpo', en: 'In my body' },
          hint: {
            es: 'Acelerado, tenso, sin poder quedarme quieto',
            en: 'Racing, tense, cannot sit still',
          },
          next: 'body',
        },
        {
          label: { es: 'En la cabeza', en: 'In my head' },
          hint: {
            es: 'Pensamientos que no paran',
            en: 'Thoughts that will not stop',
          },
          next: 'head',
        },
        {
          label: { es: 'En ningún lado — ando plano', en: 'Nowhere — I am just flat' },
          hint: {
            es: 'Nada se siente que valga la pena',
            en: 'Nothing feels worth it',
          },
          next: 'flat',
        },
        {
          /*
            The quiet fourth door. Someone who is fine should not have to claim a
            problem to use the app — and neither should someone who is simply
            mid-effort. Worded as "none of those" rather than "things are good"
            since grit joined this branch: being in the hard middle of something
            is not distress located anywhere, but it is not feeling great either.
          */
          label: { es: 'Nada de eso — vengo por otra cosa', en: 'None of those' },
          hint: {
            es: 'Quiero rendir o sostener algo',
            en: 'I am here to do something, not to fix something',
          },
          next: 'good',
        },
      ],
    },

    body: {
      prompt: { es: '¿A cuál se parece más?', en: 'Closer to which?' },
      answers: [
        {
          label: { es: 'Acelerado, buscando el peligro', en: 'Fast, scanning for danger' },
          state: 'ansiedad',
        },
        {
          label: { es: 'Caliente y filoso', en: 'Hot and sharp' },
          state: 'enojo',
        },
        {
          label: { es: 'Cansado pero encendido', en: 'Tired but wired' },
          state: 'insomnio',
        },
      ],
    },

    head: {
      prompt: { es: '¿Apuntando a qué?', en: 'Pointed at what?' },
      answers: [
        {
          label: { es: 'Algo que ya pasó', en: 'Something that already happened' },
          state: 'pasado',
        },
        {
          label: { es: 'Algo que podría pasar', en: 'Something that might happen' },
          state: 'futuro',
        },
        {
          label: { es: 'Demasiadas cosas a la vez', en: 'Too many things at once' },
          state: 'saturacion',
        },
        {
          label: { es: 'Otras personas', en: 'Other people' },
          next: 'people',
        },
      ],
    },

    people: {
      prompt: { es: '¿Más bien…?', en: 'More that…' },
      answers: [
        {
          label: {
            es: 'Parece que a todos les va mejor',
            en: 'Everyone else seems to be doing better',
          },
          state: 'comparacion',
        },
        {
          label: {
            es: 'Siento que me están juzgando',
            en: 'I feel like I am being judged',
          },
          state: 'miedo-al-juicio',
        },
      ],
    },

    flat: {
      prompt: {
        es: '¿Hay algo que estés evitando?',
        en: 'Is there something you are avoiding?',
      },
      answers: [
        {
          label: {
            es: 'Sí, sé exactamente qué debería estar haciendo',
            en: 'Yes — I know what I should be doing',
          },
          state: 'procrastinacion',
        },
        {
          label: {
            es: 'No, es que nada me llama',
            en: 'No, nothing appeals at all',
          },
          state: 'desmotivacion',
        },
      ],
    },

    good: {
      prompt: { es: '¿Qué traes?', en: 'What have you got?' },
      answers: [
        {
          label: { es: 'Vengo con impulso', en: 'I have momentum' },
          state: 'racha',
        },
        {
          label: { es: 'Quiero concentrarme', en: 'I want to focus' },
          state: 'enfoque',
        },
        {
          label: {
            es: 'Estoy en la parte difícil de algo',
            en: 'I am in the hard part of something',
          },
          state: 'aguante',
        },
        /*
          A sub-branch, not a fifth answer: `triageAnswerSchema` caps a question
          at four, and adding "being present" straight to this list would fail
          the build. Grouping is better than a raised cap anyway — "turn the
          noise down" is a real thing someone arrives wanting, and it splits
          cleanly into being here versus seeing more.
        */
        {
          label: { es: 'Quiero bajarle al ruido', en: 'I want the noise down' },
          next: 'quiet',
        },
      ],
    },

    quiet: {
      prompt: { es: '¿Más bien…?', en: 'More that…' },
      answers: [
        {
          label: {
            es: 'Quiero estar donde estoy',
            en: 'I want to be where I am',
          },
          state: 'calma',
        },
        {
          label: {
            es: 'Quiero ver lo que se me está escapando',
            en: 'I want to see what I am missing',
          },
          state: 'radar',
        },
      ],
    },
  },
};
