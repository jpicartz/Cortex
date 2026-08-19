import type { MentalState } from '../schema';

export const enfoque: MentalState = {
  id: 'enfoque',
  slug: { es: 'en-la-zona', en: 'locked-in' },
  icon: 'target',
  accent: 'teal',
  signature: 'steady',
  tile: 'feature',
  band: 'good',

  label: { es: 'En la zona', en: 'Locked in' },
  blurb: {
    es: 'Cómo se ve por dentro y cómo volver a ella.',
    en: 'What it is from the inside, and how to get back.',
  },

  feel: {
    es: [
      'Levantas la vista y pasaron dos horas.',
      'La tarea dejó de costarte trabajo y empezó a jalarte.',
      'No estabas pensando en ti mientras lo hacías.',
      'Quieres volver a eso y no sabes cómo se entró.',
    ],
    en: [
      'You look up and two hours are gone.',
      'The task stopped costing you effort and started pulling you.',
      'You were not thinking about yourself while you did it.',
      'You want to get back there and you do not know how you got in.',
    ],
  },

  mechanism: {
    headline: {
      es: 'No entraste concentrándote más: entraste dejando de cambiar',
      en: 'You did not get in by focusing harder — you got in by stopping switching',
    },
    body: {
      es: [
        'Concentrarte no es apretar más fuerte. Es sostener una sola cosa el tiempo suficiente para que se vuelva interesante.',
        'Tu corteza prefrontal mantiene la meta activa y filtra todo lo demás. Ese filtro tarda en montarse, y se cae completo en cuanto lo sueltas.',
        'Ahí está el costo real de cambiar de tarea. Cuando pasas de A a B, una parte de tu atención se queda en A, sobre todo si A quedó a medias.',
        'Es una llave de agua caliente: cierras y abres, y no vuelve caliente de inmediato. Tienes que dejarla correr otra vez.',
        'Por eso quince minutos partidos en tres no equivalen a quince minutos seguidos. Pagaste el arranque tres veces y no llegaste a la parte donde la tarea empieza a sostenerse sola.',
        'Y por eso una tarea a medias es peor que ninguna: sigue consumiendo atención mientras haces otra cosa. Cerrar un pendiente, o decidir exactamente cuándo lo retomas, es lo que libera esa parte.',
        'La zona no es un estado místico. Es lo que pasa cuando la dificultad y tu capacidad quedan parejas y nada te interrumpe el tiempo suficiente.',
      ],
      en: [
        'Concentrating is not squeezing harder. It is holding one thing long enough for it to become interesting.',
        'Your prefrontal cortex keeps the goal active and filters out everything else. That filter takes time to build, and it collapses completely the moment you let go of it.',
        'That is the real cost of switching. When you move from A to B, part of your attention stays on A — especially if A was left unfinished.',
        'It is a hot tap: close it, open it, and it does not come back hot. You have to let it run again.',
        'Which is why fifteen minutes split into three is not fifteen minutes. You paid the start-up three times and never reached the part where the task starts carrying itself.',
        'And why a half-finished task is worse than none: it keeps consuming attention while you do something else. Closing it, or deciding exactly when you return to it, is what releases that part.',
        'The zone is not a mystical state. It is what happens when the difficulty and your ability are level and nothing interrupts you for long enough.',
      ],
    },
    analogy: 3,
    parts: [
      {
        name: { es: 'Corteza prefrontal dorsolateral', en: 'Dorsolateral prefrontal cortex' },
        role: {
          es: 'Sostiene la meta activa y filtra lo demás. El filtro tarda en montarse y se cae de golpe.',
          en: 'Holds the goal active and filters the rest. Slow to build, instant to collapse.',
        },
        region: 'dlpfc',
      },
      {
        name: { es: 'Residuo de atención', en: 'Attention residue' },
        role: {
          es: 'Lo que se queda pegado en la tarea anterior, sobre todo si la dejaste a medias.',
          en: 'What stays stuck on the previous task, especially one you left unfinished.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'bloque-sin-cortes',
      name: { es: 'Un bloque sin cortes', en: 'One uninterrupted block' },
      why: {
        es: 'El filtro atencional necesita minutos para montarse. Un bloque protegido es lo único que le da esos minutos.',
        en: 'The attentional filter needs minutes to build. A protected block is the only thing that gives it those minutes.',
      },
      durationHint: { es: '25 minutos', en: '25 minutes' },
      tool: { kind: 'timer', seconds: 1500 },
      steps: {
        es: [
          'Elige una sola tarea y déjala escrita antes de empezar. Sin lista, sin alternativas.',
          'Teléfono en otro cuarto. Boca abajo junto a ti no es lo mismo: sigue costando atención.',
          'Pon veinticinco minutos y trabaja aunque los primeros cinco se sientan torpes. Esa torpeza es el filtro montándose.',
          'Si llega una idea de otra cosa, anótala en una línea y sigue. Anotarla es lo que la deja de cobrar.',
        ],
        en: [
          'Pick one task and write it down before you start. No list, no alternatives.',
          'Phone in another room. Face-down beside you is not the same — it still costs attention.',
          'Set twenty-five minutes and work even though the first five feel clumsy. That clumsiness is the filter building.',
          'If an idea about something else arrives, write it in one line and carry on. Writing it down is what stops it charging you.',
        ],
      },
    },
    {
      id: 'cerrar-antes-de-cambiar',
      name: { es: 'Cierra antes de cambiar', en: 'Close before you switch' },
      why: {
        es: 'Una tarea a medias te sigue cobrando atención en la siguiente. Decidir cuándo la retomas la cierra casi tan bien como terminarla.',
        en: 'An unfinished task keeps charging you attention during the next one. Deciding when you return closes it almost as well as finishing it.',
      },
      durationHint: { es: '2 minutos', en: '2 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Antes de saltar a otra cosa, para dos minutos.',
          'Escribe dónde te quedaste y cuál es el siguiente paso exacto.',
          'Escribe cuándo vas a volver. Una hora concreta, no "al rato".',
          'Ahora cambia. La parte de tu atención que se quedaba ahí ya tiene a dónde volver.',
        ],
        en: [
          'Before jumping to something else, stop for two minutes.',
          'Write where you stopped and what the exact next step is.',
          'Write when you are coming back. A specific time, not "later".',
          'Now switch. The part of your attention that used to stay behind now knows where to return.',
        ],
      },
    },
    {
      id: 'ajustar-la-dificultad',
      name: { es: 'Ajusta la dificultad', en: 'Tune the difficulty' },
      why: {
        es: 'La zona aparece cuando la tarea y tu capacidad quedan parejas. Muy fácil aburre; muy difícil da ansiedad. Las dos te sacan.',
        en: 'The zone appears when task and ability are level. Too easy bores; too hard makes you anxious. Both push you out.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Pregúntate qué sentiste la última vez que lo intentaste: aburrimiento o agobio.',
          'Si fue aburrimiento, súbele: hazlo contra reloj, más limpio, más difícil a propósito.',
          'Si fue agobio, pártelo hasta que el siguiente paso sea claramente posible.',
          'Vuelve a intentarlo con ese ajuste. Estás buscando "difícil pero alcanzable", no "cómodo".',
        ],
        en: [
          'Ask what you felt last time you tried: boredom or overwhelm.',
          'If it was boredom, raise it — against the clock, to a higher standard, deliberately harder.',
          'If it was overwhelm, break it down until the next step is clearly doable.',
          'Try again with that adjustment. You are aiming for "hard but reachable", not "comfortable".',
        ],
      },
    },
  ],

  sources: [
    {
      label:
        'Leroy (2009), Organizational Behavior and Human Decision Processes 109(2): 168–181 — Attention residue when switching between tasks',
      url: 'https://ideas.repec.org/a/eee/jobhdp/v109y2009i2p168-181.html',
    },
    {
      label:
        'Nakamura & Csikszentmihalyi (2009), Oxford Handbook of Positive Psychology — Flow Theory and Research (the challenge–skill balance)',
      url: 'https://academic.oup.com/edited-volume/28153/chapter/212941827',
    },
  ],

  seo: {
    title: {
      es: 'En la zona: qué es concentrarse y cómo volver a entrar',
      en: 'Locked in: what focus actually is, and how to get back into it',
    },
    description: {
      es: 'La concentración no es apretar más fuerte. Entiende el costo real de cambiar de tarea y cómo montar el filtro que te deja entrar.',
      en: 'Focus is not squeezing harder. Understand the real cost of task switching and how to build the filter that lets you in.',
    },
  },
};
