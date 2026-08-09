import type { MentalState } from '../schema';

export const saturacion: MentalState = {
  id: 'saturacion',
  slug: { es: 'saturacion', en: 'overwhelm' },
  icon: 'stack',
  accent: 'teal',
  signature: 'layered',
  tile: 'feature',
  band: 'difficult',

  label: { es: 'Saturación', en: 'Overwhelm' },
  blurb: {
    es: 'Demasiadas cosas abiertas y ninguna avanzando.',
    en: 'Too many things open and none of them moving.',
  },

  feel: {
    es: [
      'Tienes tanto que hacer que terminas sin hacer nada.',
      'Cambias de tarea cada dos minutos y no cierras ninguna.',
      'Sientes que se te está olvidando algo importante, todo el tiempo.',
      'Estás cansado a media tarde sin haber terminado nada concreto.',
    ],
    en: [
      'You have so much to do that you end up doing nothing.',
      'You switch tasks every two minutes and close none of them.',
      "You constantly feel like you're forgetting something important.",
      'You are exhausted by mid-afternoon without having finished anything concrete.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Tienes cuatro espacios y estás intentando meter veinte cosas',
      en: 'You have four slots and you are trying to fit twenty things',
    },
    body: {
      es: [
        'Tu memoria de trabajo sostiene alrededor de cuatro cosas a la vez.',
        'No cuatro fáciles y luego más. Cuatro. Es un límite físico, no una cuestión de esfuerzo ni de ser más organizado.',
        'Y un pendiente no espera en silencio. Todo lo que dejaste abierto sigue pidiendo atención hasta que lo cierras o hasta que decides exactamente qué vas a hacer con él.',
        'Es como tener quince pestañas abiertas en un navegador con memoria para cuatro. No estás lento: estás lleno.',
        'Por eso quince pendientes pesan muchísimo más que quince cosas resueltas, aunque el trabajo sea el mismo. No te agota la cantidad de trabajo. Te agota la cantidad de cosas sin decidir dando vueltas al mismo tiempo.',
        'De ahí sale la solución, y es casi decepcionante de simple: sácalas de tu cabeza y ponlas en un papel. Un pendiente escrito deja de ocupar un lugar porque tu cerebro ya no tiene que recordarlo.',
        'El alivio no viene de haber avanzado. Viene de haber liberado la memoria.',
      ],
      en: [
        'Your working memory holds about four things at once.',
        'Not four easy ones and then more. Four. It is a physical limit, not a question of effort or being better organised.',
        'And a pending task does not wait quietly. Anything you left open keeps demanding attention until you finish it, or until you decide exactly what you will do with it.',
        'It is like running fifteen browser tabs on a machine with memory for four. You are not slow. You are full.',
        'That is why fifteen open items weigh far more than fifteen resolved ones, even though the work is identical. It is not the amount of work that drains you. It is the number of undecided things circling at once.',
        'Which gives you the fix, and it is almost disappointingly simple: get them out of your head and onto paper. A written item stops taking up a slot because your brain no longer has to remember it.',
        'The relief doesn\'t come from progress. It comes from freeing the memory.',
      ],
    },
    analogy: 3,
    parts: [
      {
        name: { es: 'Memoria de trabajo', en: 'Working memory' },
        role: {
          es: 'Sostiene unos cuatro elementos a la vez. Es el cuello de botella real.',
          en: 'Holds about four items at once. This is the actual bottleneck.',
        },
        region: 'dlpfc',
      },
      {
        name: { es: 'Bucles abiertos', en: 'Open loops' },
        role: {
          es: 'Lo no terminado sigue pidiendo atención hasta que lo cierras o lo decides.',
          en: 'Unfinished things keep claiming attention until you finish or decide them.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'vaciado-mental',
      name: { es: 'Vaciado mental', en: 'Brain dump' },
      why: {
        es: 'Libera literalmente los espacios de tu memoria de trabajo. Es la razón por la que el alivio llega antes de haber hecho nada.',
        en: 'Literally frees up your working-memory slots. It is why the relief arrives before you have done anything.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: 'Todo lo que traes en la cabeza. Sin orden, sin filtro, sin prioridad.',
          en: 'Everything in your head. No order, no filter, no priorities.',
        },
      },
      steps: {
        es: [
          'Escribe todo lo que traes pendiente, grande o mínimo, personal o de trabajo.',
          'No ordenes ni priorices mientras escribes. Ordenar y vaciar al mismo tiempo no funciona.',
          'Incluye lo que no es una tarea: la conversación pendiente, la duda, la preocupación.',
          'Sigue hasta que se te acaben. Casi siempre son menos de las que sentías.',
        ],
        en: [
          'Write down everything you are carrying, large or tiny, personal or work.',
          'Do not sort or prioritise while writing. Sorting and emptying at the same time does not work.',
          'Include the things that are not tasks: the conversation you owe, the doubt, the worry.',
          'Keep going until you run out. There are almost always fewer than it felt like.',
        ],
      },
    },
    {
      id: 'siguiente-accion-fisica',
      name: { es: 'La siguiente acción física', en: 'The next physical action' },
      why: {
        es: 'Un pendiente vago se queda abierto; uno decidido se cierra. La ambigüedad es lo que lo mantiene pesando.',
        en: 'A vague item stays open; a decided one closes. Ambiguity is what keeps it weighing on you.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Toma los tres pendientes que más pesan de tu lista.',
          'Para cada uno escribe la siguiente acción física concreta, no el proyecto entero.',
          'Tiene que ser algo que puedas ver hacer: "abrir el correo de Ana y responder tres líneas", no "resolver lo de Ana".',
          'Si no cabe en una acción visible, todavía es un proyecto. Pártelo otra vez.',
        ],
        en: [
          'Take the three heaviest items on your list.',
          'For each one, write the next concrete physical action — not the whole project.',
          'It must be something you can picture yourself doing: "open Ana\'s email and reply in three lines," not "sort out the Ana thing."',
          'If it does not fit into one visible action, it is still a project. Break it down again.',
        ],
      },
    },
    {
      id: 'reset-nsdr',
      name: { es: 'Reset de diez minutos', en: 'Ten-minute reset' },
      why: {
        es: 'Descansar sin estímulo baja el ruido de fondo y devuelve capacidad de atención, cosa que el teléfono no hace.',
        en: 'Rest without stimulation lowers background noise and restores attention capacity — which the phone does not do.',
      },
      durationHint: { es: '10 minutos', en: '10 minutes' },
      tool: { kind: 'timer', seconds: 600 },
      steps: {
        es: [
          'Acuéstate o siéntate cómodo. Cierra los ojos.',
          'Respira lento, dejando la exhalación más larga que la inhalación.',
          'No intentes dormir ni resolver nada. Solo estar sin entrada de información.',
          'Diez minutos. Si te quedas dormido, también está bien.',
        ],
        en: [
          'Lie down or sit comfortably. Close your eyes.',
          'Breathe slowly, letting the exhale run longer than the inhale.',
          'Do not try to sleep or to solve anything. Just exist with no incoming information.',
          'Ten minutes. If you fall asleep, that is fine too.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Cowan (2001) — The magical number 4 in short-term memory',
      url: 'https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/abs/magical-number-4-in-shortterm-memory-a-reconsideration-of-mental-storage-capacity/44023F1147D4A1D44BDC0AD226004C24',
    },
    {
      label: 'Masicampo & Baumeister (2011) — Unfulfilled goals interfere with tasks',
      url: 'https://psycnet.apa.org/record/2011-11922-001',
    },
  ],

  seo: {
    title: {
      es: 'Saturación mental: por qué no avanzas y cómo desatorarte',
      en: 'Mentally overwhelmed: why nothing moves, and how to get unstuck',
    },
    description: {
      es: 'Tu memoria de trabajo sostiene unas cuatro cosas a la vez, y cada pendiente ocupa un lugar. Entiende por qué te satura y vacía la cabeza en cinco minutos.',
      en: 'Your working memory holds about four things at once, and every open loop takes a slot. Understand why you are overwhelmed and empty your head in five minutes.',
    },
  },
};
