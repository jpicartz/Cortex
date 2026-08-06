import type { MentalState } from '../schema';

export const desmotivacion: MentalState = {
  id: 'desmotivacion',
  slug: { es: 'sin-motivacion', en: 'no-motivation' },
  icon: 'battery',
  accent: 'orange',

  label: { es: 'Sin motivación', en: 'No motivation' },
  blurb: {
    es: 'Nada te llama, ni siquiera lo que antes te gustaba.',
    en: 'Nothing appeals — not even what used to.',
  },

  feel: {
    es: [
      'Ninguna opción te emociona, ni las buenas.',
      'Terminas el día habiendo consumido mucho y sin haber hecho nada.',
      'Lo que antes disfrutabas ahora se siente plano.',
      'Tienes energía física, pero cero ganas de usarla en algo.',
    ],
    en: [
      'No option excites you, not even the good ones.',
      'You end the day having consumed a lot and done nothing.',
      'What you used to enjoy now feels flat.',
      'You have physical energy but zero drive to spend it on anything.',
    ],
  },

  mechanism: {
    headline: {
      es: 'La dopamina no es placer: es la molécula de las ganas',
      en: 'Dopamine is not pleasure — it is the wanting molecule',
    },
    body: {
      es: [
        'La dopamina se explica mal casi siempre. No es lo que sientes cuando algo te gusta; es lo que te empuja a ir por algo. Es el sistema de "quiero", no el de "disfruto". Por eso puedes tener cero ganas de hacer algo que sabes perfectamente que vas a disfrutar.',
        'Lo que importa no es cuánta dopamina tienes en un pico, sino dónde está tu línea base entre picos. Y aquí está el detalle: después de cada pico grande, tu línea base cae por debajo de donde estaba. Ese bajón es la resaca del pico, y es proporcional a él.',
        'Si tu día está lleno de picos rápidos y baratos —el scroll infinito, los videos cortos, las notificaciones, el azúcar— tu línea base se va aplanando. Y con la línea base baja, todo lo que requiere esfuerzo y da recompensa lenta deja de parecer que valga la pena. No perdiste la motivación: subiste tanto el listón que lo normal ya no lo alcanza.',
        'Lo que sube la línea base es exactamente lo contrario de lo que uno busca en ese estado: esfuerzo, movimiento, luz de la mañana, aburrimiento tolerado. Y hay algo más, que es el truco central: la motivación no viene antes de la acción, viene después de empezar. Esperar a tener ganas para hacerlo es esperar el efecto para producir la causa.',
      ],
      en: [
        'Dopamine is almost always explained wrong. It is not what you feel when you like something — it is what pushes you to go get something. It is the "want" system, not the "enjoy" system. Which is why you can have zero drive to do something you know full well you will enjoy.',
        'What matters is not how much dopamine you get in a peak, but where your baseline sits between peaks. And here is the detail: after every large peak, your baseline drops below where it started. That dip is the hangover from the peak, and it scales with it.',
        'If your day is full of fast, cheap peaks — infinite scroll, short videos, notifications, sugar — your baseline keeps flattening. And with a low baseline, anything requiring effort with a slow payoff stops seeming worth it. You did not lose your motivation: you raised the bar so high that ordinary things no longer clear it.',
        'What raises the baseline is exactly the opposite of what you crave in that state: effort, movement, morning light, tolerated boredom. And there is one more thing, the central trick: motivation does not come before action, it comes after starting. Waiting to feel like it is waiting for the effect in order to produce the cause.',
      ],
    },
    parts: [
      {
        name: { es: 'Línea base de dopamina', en: 'Dopamine baseline' },
        role: {
          es: 'El nivel entre picos. Determina si algo te parece que vale la pena o no.',
          en: 'The level between peaks. Determines whether anything seems worth doing.',
        },
      },
      {
        name: { es: 'Estriado ventral', en: 'Ventral striatum' },
        role: {
          es: 'Calcula qué tanto vale la pena el esfuerzo antes de que decidas.',
          en: 'Computes whether the effort is worth it, before you decide.',
        },
        region: 'ventral-striatum',
      },
    ],
  },

  techniques: [
    {
      id: 'ayuno-de-estimulo',
      name: { es: 'Ayuno de estímulo barato', en: 'Cheap-stimulation fast' },
      why: {
        es: 'Deja de aplanar tu línea base. El aburrimiento tolerado es literalmente el mecanismo de recuperación.',
        en: 'Stops flattening your baseline. Tolerated boredom is literally the recovery mechanism.',
      },
      durationHint: { es: '60 minutos', en: '60 minutes' },
      tool: { kind: 'timer', seconds: 1800 },
      steps: {
        es: [
          'Elige una hora del día sin pantallas de consumo rápido: nada de scroll, videos cortos ni notificaciones.',
          'Puedes trabajar, leer, caminar, cocinar o no hacer nada. Lo que no puedes es picar estímulo.',
          'Vas a sentir aburrimiento y ganas de tomar el teléfono. Esa incomodidad es el ejercicio funcionando.',
          'Empieza por treinta minutos si una hora se ve imposible. La constancia importa más que la duración.',
        ],
        en: [
          'Pick one hour of the day with no fast-consumption screens: no scrolling, short video or notifications.',
          'You can work, read, walk, cook or do nothing. What you cannot do is snack on stimulation.',
          'You will feel boredom and an urge to grab your phone. That discomfort is the exercise working.',
          'Start with thirty minutes if an hour looks impossible. Consistency matters more than duration.',
        ],
      },
    },
    {
      id: 'luz-de-la-manana',
      name: { es: 'Luz de la mañana', en: 'Morning light' },
      why: {
        es: 'La luz solar temprana ajusta el reloj interno que gobierna tu energía y tu ánimo durante el resto del día.',
        en: 'Early sunlight sets the internal clock that governs your energy and mood for the rest of the day.',
      },
      durationHint: { es: '10 minutos', en: '10 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Sal a la calle dentro de la primera hora después de despertarte.',
          'Diez minutos si está despejado; hasta veinte o treinta si está nublado.',
          'Sin lentes de sol. Los anteojos normales están bien. Nunca mires directo al sol.',
          'A través de una ventana no funciona igual: el vidrio filtra buena parte de lo que importa.',
        ],
        en: [
          'Get outside within the first hour of waking up.',
          'Ten minutes on a clear day; up to twenty or thirty if it is overcast.',
          'No sunglasses. Regular glasses are fine. Never look directly at the sun.',
          'Through a window does not work the same: glass filters out much of what matters.',
        ],
      },
    },
    {
      id: 'recompensar-el-esfuerzo',
      name: { es: 'Recompensar el esfuerzo', en: 'Reward the effort' },
      why: {
        es: 'Reconocer el esfuerzo mientras lo haces asocia dopamina al proceso, no solo al resultado, que llega tarde o nunca.',
        en: 'Acknowledging effort while you do it attaches dopamine to the process, not just the outcome — which arrives late or never.',
      },
      durationHint: { es: 'Mientras trabajas', en: 'While you work' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'A la mitad de algo que cuesta, reconócelo por dentro: "esto es difícil y lo estoy haciendo".',
          'Sin ironía y sin esperar a terminar. El punto es que el esfuerzo mismo lleve la marca de recompensa.',
          'Evita el premio externo cuando acabes. Ese le enseña a tu cerebro que la tarea es el precio del premio.',
          'Repítelo durante días. Es un hábito de atención, no un truco de una vez.',
        ],
        en: [
          'Halfway through something hard, acknowledge it internally: "this is difficult and I am doing it."',
          'No irony, and do not wait until you finish. The point is for the effort itself to carry the reward signal.',
          'Avoid an external prize at the end. That teaches your brain the task is the price of the prize.',
          'Repeat it over days. This is an attention habit, not a one-off trick.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Huberman Lab — Controlling Your Dopamine for Motivation, Focus & Satisfaction',
      url: 'https://www.hubermanlab.com/episode/controlling-your-dopamine-for-motivation-focus-and-satisfaction',
    },
    {
      label: 'Berridge & Robinson (2016), American Psychologist — Liking, wanting and incentive salience',
      url: 'https://psycnet.apa.org/record/2016-30071-005',
    },
  ],

  seo: {
    title: {
      es: 'Sin motivación: por qué nada te llama y cómo recuperar las ganas',
      en: 'No motivation: why nothing appeals, and how to get your drive back',
    },
    description: {
      es: 'La dopamina no es placer, es la molécula de las ganas, y los estímulos baratos aplanan tu línea base. Entiende por qué y recupérala con tres cambios.',
      en: 'Dopamine is not pleasure — it is the wanting molecule, and cheap stimulation flattens your baseline. Understand why, and rebuild it with three changes.',
    },
  },
};
