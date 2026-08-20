import type { MentalState } from '../schema';

export const ansiedad: MentalState = {
  id: 'ansiedad',
  slug: { es: 'ansiedad', en: 'anxiety' },
  icon: 'activity-heartbeat',
  accent: 'sky',
  signature: 'erratic',
  tile: 'feature',
  band: 'difficult',

  label: { es: 'Ansiedad', en: 'Anxiety' },
  blurb: {
    es: 'El cuerpo acelerado, la mente buscando el peligro.',
    en: 'Your body speeds up while your mind hunts for the danger.',
  },

  feel: {
    es: [
      'El pecho apretado o el corazón acelerado sin una razón clara.',
      'La sensación de que algo malo va a pasar, aunque no sepas qué.',
      'La mente saltando de una preocupación a otra sin quedarse en ninguna.',
      'Ganas de escapar de donde estás, aunque el lugar sea seguro.',
    ],
    en: [
      'A tight chest or a racing heart with no obvious cause.',
      'The sense that something bad is coming, without knowing what.',
      'Your mind jumping between worries without settling on any of them.',
      'An urge to leave the room, even though the room is safe.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Tu cuerpo dio la alarma antes de que tú pensaras nada',
      en: 'Your body sounded the alarm before you thought anything',
    },
    body: {
      es: [
        'Tu cerebro no espera a estar seguro del peligro para prepararte.',
        'Una estructura pequeña, la amígdala, vigila todo el tiempo. Ante cualquier señal ambigua prende la alarma primero y pregunta después.',
        'Piénsalo como el detector de humo de tu cocina. Se activa con el pan tostado mil veces porque perderse un incendio una sola vez sale carísimo. Tu amígdala hace exactamente ese cálculo.',
        'Por eso la ansiedad casi siempre empieza en el cuerpo: corazón acelerado, respiración corta, músculos tensos. Todo eso pasa antes de que tu parte pensante se entere.',
        'Y aquí está la trampa. Tu mente detecta esas señales y sale a buscarles una explicación: el pendiente, el mensaje sin responder, lo que dijiste ayer.',
        'Ese pensamiento no te puso ansioso. Tu cuerpo ya estaba activado y tu mente le puso un nombre. Por eso discutir con el pensamiento casi nunca funciona: estás peleando con la etiqueta, no con la causa.',
        'La salida va al revés de lo que uno intenta. No calmas la mente para calmar el cuerpo. Calmas el cuerpo primero, y la respiración es la única parte de esa alarma que puedes mover a voluntad.',
      ],
      en: [
        'Your brain doesn\'t wait until it\'s sure about a threat before preparing you for it.',
        'A small structure, the amygdala, scans constantly. On any ambiguous signal it sounds the alarm first and asks questions later.',
        'Think of your kitchen smoke alarm. It goes off at toast a thousand times because missing one real fire is catastrophic. Your amygdala runs exactly that maths.',
        'That is why anxiety almost always starts in the body: racing heart, short breath, tight muscles. All of it happens before the thinking part of you knows anything about it.',
        'Here\'s the trap. Your mind notices those signals and goes looking for something to blame: the deadline, the unanswered message, the thing you said yesterday.',
        'That thought didn\'t make you anxious. Your body was already activated and your mind supplied a label. Which is why arguing with the thought rarely works — you\'re fighting the label, not the cause.',
        'The way out runs backwards from what most people try. You don\'t calm the mind to calm the body. You calm the body first, and breathing is the one part of that alarm you can operate on purpose.',
      ],
    },
    analogy: 2,
    parts: [
      {
        name: { es: 'Amígdala', en: 'Amygdala' },
        role: {
          es: 'Detector de amenazas. Prende la alarma en menos de un segundo, sin consultar.',
          en: 'Threat detector. Fires the alarm in under a second, without checking in.',
        },
        region: 'amygdala',
      },
      {
        name: { es: 'Corteza prefrontal', en: 'Prefrontal cortex' },
        role: {
          es: 'La parte que razona. Llega tarde a la fiesta y suele quedarse construyendo explicaciones.',
          en: 'The part that reasons. Arrives late and usually ends up building explanations.',
        },
        region: 'prefrontal',
      },
      {
        name: { es: 'Nervio vago', en: 'Vagus nerve' },
        role: {
          es: 'El cable que conecta respiración y ritmo cardiaco. Es tu control de volumen manual.',
          en: 'The wire linking breath to heart rate. This is your manual volume knob.',
        },
        region: 'vagus',
      },
    ],
  },

  techniques: [
    {
      id: 'suspiro-fisiologico',
      name: { es: 'Suspiro fisiológico', en: 'Physiological sigh' },
      why: {
        es: 'Es la forma más rápida conocida de bajar la activación del cuerpo, y funciona en uno o dos ciclos.',
        en: 'The fastest known way to lower bodily arousal — it works within one or two cycles.',
      },
      durationHint: { es: '1 minuto', en: '1 minute' },
      tool: { kind: 'breath', pattern: 'sigh', cycles: 5 },
      steps: {
        es: [
          'Inhala por la nariz hasta llenar el pecho.',
          'Sin soltar el aire, haz una segunda inhalación corta por la nariz, encima de la primera.',
          'Exhala lento y largo por la boca, hasta vaciarte por completo.',
          'Repite entre una y cinco veces. No necesitas más.',
        ],
        en: [
          'Inhale through your nose until your chest is full.',
          "Without letting any air out, take a second short inhale through your nose, on top of the first.",
          'Exhale slowly and completely through your mouth, until you are empty.',
          'Repeat one to five times. You will not need more than that.',
        ],
      },
    },
    {
      id: 'anclaje-54321',
      name: { es: 'Anclaje 5-4-3-2-1', en: '5-4-3-2-1 grounding' },
      why: {
        es: 'La ansiedad vive en un futuro imaginado. Los sentidos solo funcionan en presente, así que ocuparlos corta el bucle.',
        en: 'Anxiety lives in an imagined future. Your senses only work in the present, so occupying them cuts the loop.',
      },
      durationHint: { es: '2 minutos', en: '2 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Nombra 5 cosas que puedas ver ahora mismo.',
          'Nombra 4 cosas que puedas tocar, y tócalas.',
          'Nombra 3 sonidos que puedas escuchar.',
          'Nombra 2 olores, o dos cosas que puedas oler si te acercas.',
          'Nombra 1 sabor, o simplemente el sabor que tienes en la boca.',
        ],
        en: [
          'Name 5 things you can see right now.',
          'Name 4 things you can touch — and touch them.',
          'Name 3 sounds you can hear.',
          'Name 2 smells, or two things you could smell if you leaned in.',
          'Name 1 taste, or just the taste already in your mouth.',
        ],
      },
    },
    {
      id: 'nombrar-lo-que-sientes',
      name: { es: 'Ponle nombre', en: 'Name it' },
      why: {
        es: 'Pasar de sentir la emoción a nombrarla con palabras precisas baja la actividad de la amígdala. No es reprimir: es que nombrar con precisión ya la baja de intensidad.',
        en: 'Moving from feeling the emotion to naming it in precise words lowers amygdala activity. This is not suppression — naming it precisely already turns the volume down.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: '¿Qué es exactamente? Ponle la palabra más precisa que encuentres, no la más grande.',
          en: 'What is it exactly? Use the most precise word you can find, not the biggest one.',
        },
      },
      steps: {
        es: [
          'Escribe qué estás sintiendo, pero busca la palabra exacta.',
          '"Ansiedad" es un cajón. ¿Es miedo, vergüenza, presión, culpa, anticipación?',
          'Ahora agrega dónde lo sientes en el cuerpo y qué tan fuerte del 0 al 10.',
          'No trates de que se vaya. Solo descríbelo bien. Eso es todo el ejercicio.',
        ],
        en: [
          'Write what you are feeling, but hunt for the exact word.',
          '"Anxiety" is a drawer. Is it fear, shame, pressure, guilt, dread?',
          'Now add where you feel it in your body and how strong it is from 0 to 10.',
          'Do not try to make it go away. Just describe it accurately. That is the whole exercise.',
        ],
      },
    },
  ],

  /*
    sources[1], read today. The number is the useful part: the fast path here
    runs five cycles, and knowing one is often enough lowers the bar to start,
    which is the whole design of that card.
  */
  oneTrueThing: {
    source: 1,
    text: {
      es: 'No hacen falta muchos. Uno a tres suspiros fisiológicos suelen bastar para bajar el pico — el ejercicio de arriba trae cinco porque son gratis, no porque los necesites todos.',
      en: 'You do not need many. One to three physiological sighs is usually enough to take the edge off — the exercise above runs five because they are free, not because you need all of them.',
    },
  },
  sources: [
    {
      label:
        'Lieberman et al. (2007), Psychological Science — Putting feelings into words: affect labelling disrupts amygdala activity',
      url: 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2007.01916.x',
    },
    {
      label:
        'Huberman Lab — Breathwork Protocols for Health, Focus & Stress (the physiological sigh)',
      url: 'https://www.hubermanlab.com/newsletter/breathwork-protocols-for-health-focus-stress',
    },
    {
      label: 'Balban et al. (2023), Cell Reports Medicine — Brief structured respiration practices',
      url: 'https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(22)00474-8',
    },
  ],

  seo: {
    title: {
      es: 'Ansiedad: qué pasa en tu cerebro y cómo bajarla en 1 minuto',
      en: 'Anxiety: what your brain is doing, and how to bring it down in 1 minute',
    },
    description: {
      es: 'La ansiedad empieza en el cuerpo, no en el pensamiento. Entiende el papel de la amígdala y aprende el suspiro fisiológico, la forma más rápida de calmarte.',
      en: 'Anxiety starts in the body, not the thought. Understand what the amygdala is doing and learn the physiological sigh — the fastest way to calm down.',
    },
  },
};
