import type { MentalState } from '../schema';

export const ansiedad: MentalState = {
  id: 'ansiedad',
  slug: { es: 'ansiedad', en: 'anxiety' },
  icon: 'activity-heartbeat',
  accent: 'sky',

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
        'Tu cerebro no espera a estar seguro del peligro para prepararte. Una estructura pequeña llamada amígdala vigila el ambiente todo el tiempo y, ante cualquier señal ambigua, activa la alarma primero y pregunta después. Le sale mucho más barato equivocarse mil veces prendiendo la alarma de más que equivocarse una sola vez no prendiéndola.',
        'Por eso la ansiedad casi siempre empieza en el cuerpo: se acelera el corazón, la respiración se vuelve corta y superficial, los músculos se tensan. Todo eso pasa en menos de un segundo, antes de que tu parte pensante se entere.',
        'Y aquí está la trampa: tu mente detecta esas señales físicas y sale a buscarles una explicación. Encuentra el pendiente del trabajo, el mensaje sin responder, lo que dijiste ayer. No es que ese pensamiento te haya puesto ansioso; tu cuerpo ya estaba activado y tu mente le puso un nombre. Por eso discutir con el pensamiento casi nunca funciona: estás peleando con la etiqueta, no con la causa.',
        'La salida práctica es al revés de lo que uno intenta. En vez de calmar la mente para calmar el cuerpo, calmas el cuerpo primero. La respiración es la única parte de esa alarma que puedes controlar a voluntad, y es una vía directa para bajarla.',
      ],
      en: [
        "Your brain doesn't wait until it's sure about a threat before preparing you for it. A small structure called the amygdala scans your surroundings constantly, and on any ambiguous signal it sounds the alarm first and asks questions later. Being wrong a thousand times by over-reacting costs far less than being wrong once by under-reacting.",
        'That is why anxiety almost always starts in the body: heart rate climbs, breathing goes short and shallow, muscles tighten. All of it happens in under a second, before the thinking part of you knows anything about it.',
        "Here's the trap. Your mind notices those physical signals and goes looking for something to blame. It finds the work deadline, the unanswered message, the thing you said yesterday. That thought didn't make you anxious — your body was already activated and your mind supplied a label. Which is why arguing with the thought rarely works: you're fighting the label, not the cause.",
        'The practical way out runs backwards from what most people try. Instead of calming your mind to calm your body, you calm the body first. Breathing is the one part of that alarm system you can operate on purpose, and it is a direct line to turning the volume down.',
      ],
    },
    parts: [
      {
        name: { es: 'Amígdala', en: 'Amygdala' },
        role: {
          es: 'Detector de amenazas. Prende la alarma en menos de un segundo, sin consultar.',
          en: 'Threat detector. Fires the alarm in under a second, without checking in.',
        },
      },
      {
        name: { es: 'Corteza prefrontal', en: 'Prefrontal cortex' },
        role: {
          es: 'La parte que razona. Llega tarde a la fiesta y suele quedarse construyendo explicaciones.',
          en: 'The part that reasons. Arrives late and usually ends up building explanations.',
        },
      },
      {
        name: { es: 'Nervio vago', en: 'Vagus nerve' },
        role: {
          es: 'El cable que conecta respiración y ritmo cardiaco. Es tu control de volumen manual.',
          en: 'The wire linking breath to heart rate. This is your manual volume knob.',
        },
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
  ],

  sources: [
    {
      label: 'Huberman Lab — Reduce Anxiety & Stress with the Physiological Sigh',
      url: 'https://www.hubermanlab.com/episode/reduce-anxiety-stress-with-the-physiological-sigh',
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
