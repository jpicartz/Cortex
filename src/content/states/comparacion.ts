import type { MentalState } from '../schema';

export const comparacion: MentalState = {
  id: 'comparacion',
  slug: { es: 'comparacion', en: 'comparison' },
  icon: 'scale',
  accent: 'fuchsia',
  signature: 'compare',
  tile: 'standard',
  band: 'difficult',

  label: { es: 'Comparación', en: 'Comparison' },
  blurb: {
    es: 'Te iba bien hasta que viste lo que están haciendo los demás.',
    en: 'You were fine until you saw what everyone else is doing.',
  },

  feel: {
    es: [
      'Cierras la aplicación sintiéndote peor que cuando la abriste.',
      'Un logro tuyo se desinfla en cuanto ves el de alguien más.',
      'Sientes que vas tarde en la vida, sin un horario real contra el cual ir tarde.',
      'Te da envidia alguien que te cae bien, y luego te sientes mal por eso también.',
    ],
    en: [
      'You close the app feeling worse than when you opened it.',
      "Something you achieved deflates the moment you see someone else's.",
      'You feel behind in life, with no actual schedule to be behind on.',
      'You envy someone you genuinely like, and then feel bad about that too.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Tu cerebro no mide lo que tienes: mide la diferencia',
      en: 'Your brain does not measure what you have — it measures the gap',
    },
    body: {
      es: [
        'Tu sistema de recompensa no evalúa en absoluto. Evalúa en relativo.',
        'No calcula "esto es bueno". Calcula "esto es mejor o peor de lo que esperaba". Todo lo que sientes como logro o como fracaso es en realidad una comparación contra un punto de referencia.',
        'Ese punto no es fijo. Lo pones tú, sin darte cuenta, con lo que ves alrededor.',
        'Y ahí está el problema con las redes. No te comparas con la gente que conoces. Te comparas con una selección de los mejores momentos de miles de personas, ordenada por un algoritmo que premia justo lo que más llama la atención.',
        'Además la comparación siempre es asimétrica. De ellos ves el resultado. De ti vives el proceso completo, con las dudas y los intentos fallidos.',
        'Estás comparando la portada de alguien más contra tus páginas sueltas. No es que seas peor: la información que tienes de cada lado no es del mismo tipo.',
        'Por eso no funciona convencerte de que no deberías compararte. Comparar es automático. Lo que sí puedes cambiar es contra qué comparas, y eso cambia el resultado del cálculo sin tener que ganarte una pelea a ti mismo.',
      ],
      en: [
        'Your reward system doesn\'t evaluate in absolute terms. It evaluates relatively.',
        'It doesn\'t compute "this is good". It computes "this is better or worse than I expected". Everything you feel as achievement or failure is really a comparison against a reference point.',
        'That point isn\'t fixed. You set it, without noticing, from whatever surrounds you.',
        'And there\'s the problem with feeds. You aren\'t comparing yourself to people you know. You\'re comparing yourself to a curated selection of thousands of people\'s best moments, ranked by an algorithm that rewards whatever grabs attention.',
        'The comparison is also always asymmetric. From them you see the outcome. From yourself you live the entire process, with the doubt and the failed attempts.',
        'You\'re comparing someone\'s cover against your loose pages. It isn\'t that you\'re worse — the information you hold on each side isn\'t the same kind.',
        'Which is why convincing yourself not to compare doesn\'t work. Comparing is automatic. What you can change is what you compare against, and that changes the result without having to win a fight with yourself.',
      ],
    },
    analogy: 5,
    parts: [
      {
        name: { es: 'Sistema de recompensa', en: 'Reward system' },
        role: {
          es: 'Calcula valor en relativo, contra una expectativa, nunca en absoluto.',
          en: 'Computes value relatively, against an expectation — never in absolute terms.',
        },
        region: 'reward-path',
      },
      {
        name: { es: 'Punto de referencia', en: 'Reference point' },
        role: {
          es: 'Lo fija lo que ves todos los días. Es la única parte que puedes editar.',
          en: 'Set by what you see every day. It is the one part you can edit.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'auditoria-de-entradas',
      name: { es: 'Auditoría de entradas', en: 'Input audit' },
      why: {
        es: 'Cambia el punto de referencia en la fuente, que es mucho más fácil que ganarle a la comparación cada vez.',
        en: 'Changes the reference point at the source — far easier than beating the comparison every single time.',
      },
      durationHint: { es: '10 minutos', en: '10 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Abre la aplicación donde más te comparas y revisa a quién sigues.',
          'Por cada cuenta pregúntate una sola cosa: ¿cómo me siento después de ver esto?',
          'Silencia, no dejes de seguir. Silenciar no tiene costo social y hace exactamente lo mismo.',
          'Haz esto cada pocos meses. El feed vuelve a llenarse solo.',
        ],
        en: [
          'Open the app where you compare most and look at who you follow.',
          'For each account ask one question: how do I feel after seeing this?',
          'Mute, do not unfollow. Muting has no social cost and does exactly the same job.',
          'Redo this every few months. The feed refills on its own.',
        ],
      },
    },
    {
      id: 'tu-version-anterior',
      name: { es: 'Contra tu versión anterior', en: 'Against your earlier self' },
      why: {
        es: 'Sustituye un punto de referencia imposible por uno real, del que sí conoces el proceso completo.',
        en: 'Swaps an impossible reference point for a real one, where you actually know the whole process.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: '¿Qué sabes, tienes o resuelves hoy que hace un año no?',
          en: 'What do you know, have or handle today that you did not a year ago?',
        },
      },
      steps: {
        es: [
          'Piensa en ti hace exactamente un año.',
          'Escribe cinco cosas que hoy sabes hacer, tienes o resuelves sin pensar, y que entonces no.',
          'Incluye lo invisible: una conversación difícil que hoy sí das, algo que ya no te afecta igual.',
          'Esta es la única comparación de la que tienes los dos lados de la información.',
        ],
        en: [
          'Think of yourself exactly one year ago.',
          'Write five things you now know how to do, have, or handle without thinking, that you did not then.',
          'Include the invisible ones: a hard conversation you can now have, something that no longer lands the same way.',
          'This is the only comparison where you hold both sides of the information.',
        ],
      },
    },
    {
      id: 'gratitud-especifica',
      name: { es: 'Gratitud específica', en: 'Specific gratitude' },
      why: {
        es: 'Reajusta el punto de referencia hacia abajo de forma honesta. La gratitud genérica no lo mueve; la específica sí.',
        en: 'Honestly resets the reference point downward. Generic gratitude does not move it; specific gratitude does.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Elige una sola cosa buena de tu vida, no una lista.',
          'Descríbela con detalle concreto: qué es, quién está, cómo se siente.',
          'Ahora imagina con el mismo detalle cómo sería tu vida si esa cosa no existiera.',
          'Ese contraste es lo que mueve la referencia. "Estoy agradecido por mi salud" no hace nada; esto sí.',
        ],
        en: [
          'Pick one good thing in your life, not a list.',
          'Describe it in concrete detail: what it is, who is in it, how it feels.',
          'Now imagine, in the same detail, what your life would be like if it did not exist.',
          'That contrast is what moves the reference point. "I am grateful for my health" does nothing; this does.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Schultz (2016), Nature Reviews Neuroscience — Dopamine reward prediction error',
      url: 'https://www.nature.com/articles/nrn.2015.26',
    },
    {
      label: 'Festinger (1954) — A theory of social comparison processes',
      url: 'https://journals.sagepub.com/doi/10.1177/001872675400700202',
    },
  ],

  seo: {
    title: {
      es: 'Compararme con los demás: por qué duele y cómo dejar de hacerlo',
      en: 'Comparing yourself to others: why it hurts and how to stop',
    },
    description: {
      es: 'Tu cerebro mide en relativo, contra un punto de referencia que fija lo que ves. Entiende el mecanismo y cambia la referencia en vez de pelear contigo.',
      en: 'Your brain measures relatively, against a reference point set by what you see. Understand the mechanism and change the reference instead of fighting yourself.',
    },
  },
};
