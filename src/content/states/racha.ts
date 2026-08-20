import type { MentalState } from '../schema';

export const racha: MentalState = {
  id: 'racha',
  slug: { es: 'voy-en-racha', en: 'im-so-back' },
  icon: 'trend-up',
  accent: 'amber',
  signature: 'rising',
  tile: 'feature',
  band: 'good',

  label: { es: 'Voy en racha', en: "I'm so back" },
  blurb: {
    es: 'Volviste a avanzar. Cómo no soltarlo.',
    en: 'You are moving again. How to not drop it.',
  },

  feel: {
    es: [
      'Llevas unos días haciendo lo que dijiste que ibas a hacer.',
      'Te dan ganas de empezar, en vez de tener que obligarte.',
      'Sientes que si te detienes ahora, se te va a acabar.',
      'Quieres aprovecharlo, pero no sabes bien en qué.',
    ],
    en: [
      'You have spent a few days actually doing what you said you would.',
      'You want to start, instead of having to force yourself.',
      'You feel that if you stop now, it will drain away.',
      'You want to use it, and you are not sure on what.',
    ],
  },

  mechanism: {
    headline: {
      es: 'No es que estés motivado: es que avanzaste',
      en: 'You are not motivated — you made progress',
    },
    body: {
      es: [
        'La sensación no vino primero. El avance vino primero.',
        'En el estudio más grande que existe sobre esto, casi doscientas personas anotaron su día durante meses: doce mil entradas. Lo que mejor predecía un buen día no era el reconocimiento, ni el sueldo, ni la presión. Era haber avanzado algo que les importaba.',
        'Y no hacía falta que fuera grande. Un paso pequeño en algo que te importa mueve más el ánimo que un paso enorme en algo que no.',
        'Es al revés de como lo contamos. No esperaste a tener ganas para avanzar. Avanzaste, y las ganas llegaron después a explicarlo.',
        'Tu cerebro tampoco premia el resultado final: premia la señal de que te estás acercando. Por eso la racha se siente tan bien mientras dura, y por eso se apaga cuando dejas de tener avances visibles que registrar.',
        'Lo que rompe una racha casi nunca es la falta de ganas. Es subirle demasiado a la apuesta el día que te sientes invencible, fallar, y leer ese fallo como que ya se acabó.',
        'Así que el trabajo de hoy no es exprimirla. Es dejar montado el siguiente avance pequeño, para que mañana no dependa de cómo amanezcas.',
      ],
      en: [
        'The feeling did not come first. The progress came first.',
        'In the largest study of this there is, nearly two hundred people wrote down their day for months — twelve thousand entries. What best predicted a good day was not recognition, or pay, or pressure. It was having moved something forward that mattered to them.',
        'And it did not have to be big. A small step on something you care about lifts you more than a large step on something you do not.',
        'It runs backwards from how we tell it. You did not wait to feel like it before moving. You moved, and the feeling arrived afterwards to explain it.',
        'Your brain does not reward the finish line either — it rewards the signal that you are closing on it. Which is why a streak feels so good while it lasts, and why it fades when you stop having visible progress to register.',
        'What breaks a streak is almost never running out of drive. It is raising the stakes too far on the day you feel invincible, missing, and reading that miss as proof it is over.',
        "So today's job is not to squeeze it. It is to leave the next small step set up, so tomorrow does not depend on how you wake up.",
      ],
    },
    analogy: 3,
    parts: [
      {
        name: { es: 'Principio del progreso', en: 'The progress principle' },
        role: {
          es: 'Avanzar en algo que te importa mueve el ánimo más que cualquier otra cosa del día.',
          en: 'Moving something you care about forward lifts you more than anything else in a day.',
        },
      },
      {
        name: { es: 'Circuito de recompensa', en: 'Reward circuitry' },
        role: {
          es: 'Responde al acercamiento, no a la meta. Por eso el avance se siente, y la espera no.',
          en: 'Responds to closing the gap, not to arriving. Progress registers; waiting does not.',
        },
        region: 'ventral-striatum',
      },
    ],
  },

  techniques: [
    {
      id: 'dejar-la-siguiente-puesta',
      name: { es: 'Deja puesto el siguiente paso', en: 'Leave the next step set up' },
      why: {
        es: 'Mañana no vas a tener la energía de hoy. Un paso ya montado sobrevive a un mal día; la intención no.',
        en: "Tomorrow will not have today's energy. A step already set up survives a bad day; an intention does not.",
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Antes de cerrar hoy, decide la primera acción concreta de mañana. Una sola.',
          'Déjala físicamente lista: el archivo abierto, la ropa fuera, la página en blanco con el título puesto.',
          'Que sea vergonzosamente pequeña. Si mañana amaneces mal, aun así la vas a poder hacer.',
          'No planees la semana. Planea el arranque de mañana y ya.',
        ],
        en: [
          'Before you finish today, decide tomorrow\'s first concrete action. One only.',
          'Leave it physically ready: the file open, the clothes out, the blank page with the title already on it.',
          'Make it embarrassingly small. If you wake up flat, you will still be able to do it.',
          'Do not plan the week. Plan tomorrow\'s start and stop there.',
        ],
      },
    },
    {
      id: 'registro-de-avance',
      name: { es: 'Registro de avance', en: 'A progress log' },
      why: {
        es: 'El ánimo sigue a lo que registras, y el avance real es invisible si nunca lo anotas.',
        en: 'Mood follows what you record, and real progress is invisible if you never write it down.',
      },
      durationHint: { es: '2 minutos al día', en: '2 minutes a day' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: '¿Qué avanzó hoy? Aunque haya sido poco, y aunque nadie lo haya visto.',
          en: 'What moved today? Even if it was small, and even if nobody saw it.',
        },
      },
      steps: {
        es: [
          'Al final del día escribe una línea: qué avanzó.',
          'Cuenta lo pequeño. "Mandé el correo que llevaba tres semanas evitando" cuenta.',
          'Si un día no avanzó nada, escríbelo también. El registro sirve porque es honesto.',
          'Cuando sientas que no vas a ningún lado, lee las últimas dos semanas. Casi siempre te va a contradecir.',
        ],
        en: [
          'At the end of the day write one line: what moved.',
          'Count the small things. "Sent the email I had avoided for three weeks" counts.',
          'If nothing moved, write that too. The log works because it is honest.',
          'When you feel like you are getting nowhere, read the last two weeks. It will usually contradict you.',
        ],
      },
    },
    {
      id: 'no-subir-la-apuesta',
      name: { es: 'No le subas a la apuesta', en: 'Do not raise the stakes' },
      why: {
        es: 'Las rachas casi nunca mueren de flojera. Mueren de un salto demasiado grande seguido de un fallo leído como final.',
        en: 'Streaks rarely die of laziness. They die of one jump too big, followed by a miss read as an ending.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Escribe qué has estado haciendo realmente estos días. El tamaño real, no el que te gustaría.',
          'Ahora escribe lo que estabas a punto de prometerte para mañana.',
          'Si lo segundo es más del doble de lo primero, bájalo. Hoy te sientes invencible; mañana no necesariamente.',
          'Decide de antemano qué haces si fallas un día: reanudar al siguiente, sin recuperar lo perdido. Un día perdido es un día, no el final.',
        ],
        en: [
          'Write down what you have actually been doing these last days. The real size, not the one you would like.',
          'Now write what you were about to promise yourself for tomorrow.',
          'If the second is more than double the first, cut it. You feel invincible today; tomorrow is not guaranteed to.',
          'Decide in advance what you do if you miss a day: resume the next one, with nothing to make up. A missed day is a day, not an ending.',
        ],
      },
    },
  ],

  /*
    Mazzucchelli, Kane & Rees (2009), sources[1] — the DARE record, which is
    readable and gives the figures. Both halves are in it, including the
    limitation, which is the half that usually gets dropped.
  */
  oneTrueThing: {
    source: 1,
    text: {
      es: 'Treinta y cuatro ensayos aleatorizados, 2.055 personas: simplemente programar y hacer cosas igualó a la terapia cognitiva completa para la depresión. El propio análisis marca el límite — el efecto era a corto plazo y dejaba de ser significativo entre los siete y los doce meses.',
      en: 'Thirty-four randomised trials, 2,055 people: simply scheduling and doing things matched full cognitive therapy for depression. The analysis marks its own limit — the effect was short-term and stopped being significant somewhere between seven and twelve months.',
    },
  },
  sources: [
    {
      label:
        'Amabile & Kramer (2011), Harvard Business Review — The Power of Small Wins (12,000 daily diary entries)',
      url: 'https://hbr.org/2011/05/the-power-of-small-wins',
    },
    {
      label:
        'Mazzucchelli, Kane & Rees (2009), Clinical Psychology: Science and Practice 16(4): 383–411 — Behavioural activation for depression: a meta-analysis of 34 randomised trials',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK76706/',
    },
    {
      label: 'Schultz (2016), Nature Reviews Neuroscience — Dopamine reward prediction error',
      url: 'https://www.nature.com/articles/nrn.2015.26',
    },
  ],

  seo: {
    title: {
      es: 'Voy en racha: por qué se siente así y cómo no soltarla',
      en: "I'm so back: why momentum feels like this, and how to keep it",
    },
    description: {
      es: 'La motivación no llegó primero: llegó el avance. Entiende por qué una racha se sostiene sola y qué es lo que realmente la rompe.',
      en: 'Motivation did not come first — progress did. Understand why a streak sustains itself and what actually breaks it.',
    },
  },
};
