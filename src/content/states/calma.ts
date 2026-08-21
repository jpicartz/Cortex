import type { MentalState } from '../schema';

export const calma: MentalState = {
  id: 'calma',
  slug: { es: 'estar-presente', en: 'being-present' },
  icon: 'anchor',
  accent: 'cyan',
  signature: 'settle',
  tile: 'standard',
  band: 'good',

  label: { es: 'Estar presente', en: 'Being present' },
  blurb: {
    es: 'Tu cabeza está en otro lado y quieres volver.',
    en: 'Your head is somewhere else and you want it back.',
  },

  feel: {
    es: [
      'Llevas rato haciendo algo y no te acuerdas de haberlo hecho.',
      'Estás en una conversación y de pronto no sabes qué te acaban de decir.',
      'Tu cuerpo está aquí y tu cabeza en una discusión de ayer, o en una de mañana.',
      'Quieres estar donde estás y no encuentras cómo volver.',
    ],
    en: [
      'You have been doing something for a while and cannot remember doing it.',
      'You are in a conversation and suddenly do not know what was just said to you.',
      'Your body is here and your head is in an argument from yesterday, or one from tomorrow.',
      'You want to be where you are and cannot find the way back.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Tu mente se va sola casi la mitad del tiempo',
      en: 'Your mind leaves on its own nearly half the time',
    },
    body: {
      es: [
        'Un estudio contactó a más de dos mil personas en momentos al azar de su día y les preguntó tres cosas: qué estaban haciendo, cómo se sentían, y si estaban pensando en otra cosa.',
        'La mente andaba en otro lado el 46,9% de las veces. En todas las actividades medidas superó el 30%, con una única excepción: hacer el amor.',
        'Así que no es un defecto tuyo. Es el modo por defecto: cuando no le das una tarea concreta, tu cerebro se va a recorrer el pasado y el futuro por su cuenta.',
        'Y aquí está lo que casi nadie espera. La gente no estaba más feliz pensando en algo agradable que atendiendo a lo que tenía delante. Daba igual lo bonito del destino: irse ya costaba.',
        'De hecho, lo que pensaban predecía su ánimo mejor que lo que estaban haciendo. La actividad explicaba alrededor del 4,6% de la variación en el ánimo; irse de ella, más del doble.',
        'La parte honesta: el mal humor también manda la mente a pasear, así que esto corre en las dos direcciones. Los análisis en el tiempo sugieren que irse suele venir primero — y "sugieren" es exactamente la palabra que usaron.',
      ],
      en: [
        'One study contacted more than two thousand people at random moments of their day and asked three things: what they were doing, how they felt, and whether they were thinking about something else.',
        'Minds were elsewhere 46.9% of the time. Every activity measured came in above 30%, with a single exception: making love.',
        'So it is not a flaw in you. It is the default mode: give your brain no concrete task and it goes off to tour the past and the future on its own.',
        'And here is the part almost nobody expects. People were no happier thinking about something pleasant than attending to what was in front of them. However nice the destination, the leaving already cost something.',
        'In fact what they were thinking predicted their mood better than what they were doing. Activity explained around 4.6% of the variation in mood; leaving it explained more than twice that.',
        'The honest part: low mood also sends the mind wandering, so this runs both ways. Time-lag analyses suggest the leaving usually comes first — and "suggest" is exactly the word they used.',
      ],
    },
    focus: [0, 0, 1, 1, 0, 0],
    parts: [
      {
        name: { es: 'Red neuronal por defecto', en: 'Default mode network' },
        role: {
          es: 'Se enciende cuando no estás en una tarea concreta. Ahí es donde la mente se va sola.',
          en: 'Comes up when you are not on a concrete task. That is where the mind goes on its own.',
        },
        region: 'dmn',
      },
      {
        name: { es: 'El costo de irte', en: 'The cost of leaving' },
        role: {
          es: 'No depende de a dónde vayas: irte hacia algo agradable tampoco mejoró el ánimo.',
          en: 'It does not depend on where you go: leaving toward something pleasant did not lift mood either.',
        },
      },
    ],
  },

  oneTrueThing: {
    source: 0,
    text: {
      es: 'Pensar en algo agradable no los hacía más felices que atender a lo que estaban haciendo — ni siquiera durante las actividades menos disfrutables. Lo que costaba no era el destino. Era irse.',
      en: 'Thinking about something pleasant made people no happier than attending to what they were doing — not even during the least enjoyable activities. The cost was not the destination. It was the leaving.',
    },
  },

  techniques: [
    {
      id: 'darle-una-tarea',
      name: { es: 'Dale una tarea a la atención', en: 'Give your attention a job' },
      why: {
        es: 'La red por defecto se apaga cuando hay algo concreto que hacer. No se trata de vaciar la mente: se trata de ocuparla en algo que esté pasando de verdad.',
        en: 'The default mode quiets when there is something concrete to do. This is not about emptying your mind — it is about giving it something that is actually happening.',
      },
      durationHint: { es: '1 minuto', en: '1 minute' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Nombra cinco cosas que puedas ver ahora mismo. En voz baja o por dentro, pero nómbralas.',
          'Cuatro que puedas oír. Espera a oírlas de verdad; no las adivines.',
          'Tres que puedas sentir tocando tu cuerpo: la silla, la ropa, el suelo.',
          'Dos que puedas oler, y una que puedas saborear. Si no hay, dilo también — eso también es atender.',
        ],
        en: [
          'Name five things you can see right now. Quietly or in your head, but name them.',
          'Four you can hear. Wait until you actually hear them; do not guess.',
          'Three you can feel touching you: the chair, your clothes, the floor.',
          'Two you can smell, and one you can taste. If there are none, say that too — noticing that is still attending.',
        ],
      },
    },
    {
      id: 'diez-minutos-de-una-cosa',
      name: { es: 'Diez minutos de una sola cosa', en: 'Ten minutes of one thing' },
      why: {
        es: 'Irte cuesta aunque el destino sea agradable. Un bloque corto y sin salidas te deja comprobar eso en tu propio día en vez de creerlo.',
        en: 'Leaving costs something even when the destination is pleasant. A short block with no exits lets you test that in your own day instead of taking it on faith.',
      },
      durationHint: { es: '10 minutos', en: '10 minutes' },
      tool: { kind: 'timer', seconds: 600 },
      steps: {
        es: [
          'Elige una sola cosa. Lavar los platos sirve tanto como trabajar.',
          'Deja el teléfono en otra habitación, no boca abajo en la mesa.',
          'Cuando notes que te fuiste — y te vas a ir — vuelve al detalle físico de lo que estás haciendo. La temperatura del agua, el peso del objeto.',
          'No cuentes las veces que te fuiste. Volver es el ejercicio; irse es sólo la señal de que toca volver.',
        ],
        en: [
          'Pick one thing. Washing up counts as much as working does.',
          'Leave your phone in another room, not face down on the table.',
          'When you notice you left — and you will leave — come back to the physical detail of what you are doing. The water temperature, the weight of the thing.',
          'Do not count the times you left. Coming back is the exercise; leaving is just the cue to come back.',
        ],
      },
    },
    {
      id: 'nombrar-donde-estabas',
      name: { es: 'Nombra dónde estabas', en: 'Name where you went' },
      why: {
        es: 'La mente vuelve a los mismos dos o tres sitios. Verlos escritos los convierte en algo que reconoces al llegar, en vez de algo que te tiene sin darte cuenta.',
        en: 'The mind returns to the same two or three places. Seeing them written turns them into something you recognise on arrival, instead of something that has you before you notice.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: 'Cuando te fuiste hoy, ¿a dónde te fuiste? ¿Al pasado, al futuro, a alguien?',
          en: 'When you left today, where did you go? To the past, the future, to someone?',
        },
      },
      steps: {
        es: [
          'Al final del día escribe los dos o tres lugares a los que se fue tu cabeza.',
          'No los juzgues ni los resuelvas. Sólo anótalos.',
          'Después de unos días vas a ver que casi siempre son los mismos.',
          'A partir de ahí ya no te sorprenden: los reconoces al llegar, que es lo que permite volver antes.',
        ],
        en: [
          'At the end of the day write the two or three places your head went.',
          'Do not judge them or solve them. Just note them.',
          'After a few days you will see they are nearly always the same ones.',
          'From then on they stop ambushing you: you recognise them on arrival, which is what lets you come back sooner.',
        ],
      },
    },
  ],

  sources: [
    {
      label:
        'Killingsworth & Gilbert (2010), Science 330(6006): 932 — A wandering mind is an unhappy mind (2,250 adults, experience sampling)',
      url: 'https://dash.harvard.edu/handle/1/33431727',
    },
    {
      label:
        'Raichle, MacLeod, Snyder, Powers, Gusnard & Shulman (2001), PNAS 98(2): 676–682 — A default mode of brain function',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC14647/',
    },
  ],

  seo: {
    title: {
      es: 'Estar presente: por qué tu mente se va y cómo volver',
      en: 'Being present: why your mind leaves, and how to come back',
    },
    description: {
      es: 'La mente se va casi la mitad del tiempo, y irse cuesta aunque el destino sea agradable. Qué es el modo por defecto y tres formas de volver.',
      en: 'The mind wanders nearly half the time, and leaving costs something even when the destination is pleasant. What the default mode is, and three ways back.',
    },
  },
};
