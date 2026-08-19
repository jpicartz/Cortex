import type { MentalState } from '../schema';

export const radar: MentalState = {
  id: 'radar',
  slug: { es: 'entrenar-tu-radar', en: 'training-your-radar' },
  icon: 'radar',
  accent: 'emerald',
  signature: 'scan',
  tile: 'feature',
  band: 'good',

  label: { es: 'Entrenar tu radar', en: 'Training your radar' },
  blurb: {
    es: 'Por qué de pronto ves oportunidades que antes no.',
    en: 'Why you suddenly see openings that were always there.',
  },

  feel: {
    es: [
      'Decidiste algo y de pronto el mundo parece estar lleno de eso.',
      'Alguien más ve una oportunidad donde tú solo viste un día normal.',
      'Sientes que a otros les pasan más cosas buenas que a ti.',
      'Quieres estar más atento, pero no sabes atento a qué.',
    ],
    en: [
      'You decided something and suddenly the world seems full of it.',
      'Someone else sees an opening where you saw an ordinary day.',
      'It feels like better things happen to other people than to you.',
      'You want to pay more attention, and you do not know to what.',
    ],
  },

  mechanism: {
    headline: {
      es: 'No ves más oportunidades: le dijiste a tu atención qué buscar',
      en: 'You do not see more openings — you told your attention what to look for',
    },
    body: {
      es: [
        'Tu atención no es una ventana. Es un filtro, y descarta casi todo.',
        'Tiene que hacerlo. Entra muchísima más información de la que puedes procesar, así que en cada momento la mayor parte del mundo se va sin que te enteres.',
        'Lo interesante es qué decide el filtro. En 1992 se demostró algo que suena obvio y no lo es: lo que capta tu atención "sin querer" depende de lo que andas buscando. Si buscas algo rojo, lo rojo te salta solo. Si buscas movimiento, lo rojo pasa desapercibido.',
        'Tu atención no es una ventana abierta: es un portero con una lista. Y tú escribes la lista, casi siempre sin darte cuenta.',
        'Por eso decides comprar un coche y de pronto ves ese modelo en todas partes. No aparecieron más. Entraron en la lista.',
        'La contracara está medida y es incómoda: cuando estás concentrado en una tarea, puedes no ver algo enorme que ocurre frente a ti. En el experimento más famoso de esto, la mitad de la gente contando pases no vio a una persona disfrazada de gorila cruzar la pantalla.',
        'Así que "tener suerte" y "estar atento" se parecen más de lo que suenan. No se trata de atraer nada. Se trata de que lo que no está en tu lista, no lo vas a ver, aunque te pase enfrente.',
        'Y esa lista se puede escribir a propósito. Nombrar con precisión lo que buscas, y ensayarlo antes de que ocurra, cambia lo que tu filtro deja pasar.',
      ],
      en: [
        'Your attention is not a window. It is a filter, and it discards almost everything.',
        'It has to. Far more comes in than you can process, so at any moment most of the world leaves again without you knowing it was there.',
        'The interesting part is what the filter selects for. In 1992 an experiment showed something that sounds obvious and is not: what grabs your attention "involuntarily" depends on what you are already looking for. Hunting for something red, red jumps out on its own. Hunting for movement, red goes unnoticed.',
        'Your attention is not an open window. It is a doorman with a list — and you write the list, usually without noticing.',
        'It is why you decide to buy a car and suddenly see that model everywhere. No more appeared. They got onto the list.',
        'The other side of this is measured and uncomfortable: while you are focused on a task, you can fail to see something enormous happening in front of you. In the most famous demonstration, half the people counting basketball passes did not see a person in a gorilla suit walk through the shot.',
        'So "being lucky" and "paying attention" are closer than they sound. Nothing is being attracted. It is that whatever is not on your list, you will not see — even walking straight past you.',
        'And the list can be written on purpose. Naming precisely what you are looking for, and rehearsing it before it happens, changes what your filter lets through.',
      ],
    },
    analogy: 3,
    parts: [
      {
        name: { es: 'Ajuste atencional', en: 'Attentional set' },
        role: {
          es: 'La lista de lo que tu atención deja pasar. Lo que buscas define lo que te salta.',
          en: 'The list your attention screens against. What you seek defines what jumps out.',
        },
      },
      {
        name: { es: 'Corteza prefrontal dorsolateral', en: 'Dorsolateral prefrontal cortex' },
        role: {
          es: 'Donde se sostiene esa lista. Es la parte que puedes escribir a propósito.',
          en: 'Where that list is held. This is the part you can write on purpose.',
        },
        region: 'dlpfc',
      },
      {
        name: { es: 'Ceguera por desatención', en: 'Inattentional blindness' },
        role: {
          es: 'El precio del filtro: lo que no está en la lista puede pasar enfrente y no verlo.',
          en: 'The price of the filter: what is not on the list can pass in front of you unseen.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'escribir-la-lista',
      name: { es: 'Escribe la lista', en: 'Write the list' },
      why: {
        es: 'Lo que capta tu atención depende de lo que buscas. Vago no sirve: "una oportunidad" no es un criterio que un filtro pueda usar.',
        en: 'What captures your attention depends on what you seek. Vague fails: "an opportunity" is not something a filter can screen for.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: '¿Qué estás buscando, exactamente? Concreto, reconocible, en una línea cada uno.',
          en: 'What are you looking for, exactly? Concrete, recognisable, one line each.',
        },
      },
      steps: {
        es: [
          'Escribe qué estás buscando ahora mismo. Tres cosas como máximo.',
          'Haz cada una reconocible. No "contactos útiles": "alguien que ya haya lanzado algo así".',
          'Léelas una vez en la mañana. Con eso basta; no es un ritual, es cargar el filtro.',
          'Revísalas cada par de semanas. Una lista vieja te hace ver el mundo de hace dos semanas.',
        ],
        en: [
          'Write down what you are looking for right now. Three things at most.',
          'Make each one recognisable. Not "useful contacts" but "someone who has already shipped something like this".',
          'Read them once in the morning. That is enough — it is not a ritual, it is loading the filter.',
          'Revisit every couple of weeks. An old list has you seeing the world of two weeks ago.',
        ],
      },
    },
    {
      id: 'ensayo-mental',
      name: { es: 'Ensayo mental', en: 'Mental rehearsal' },
      why: {
        es: 'Ensayar una acción mejora cómo la ejecutas, y de paso le enseña a tu atención a reconocer el momento de usarla.',
        en: 'Rehearsing an action improves how you perform it, and teaches your attention to recognise the moment to use it.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: { kind: 'timer', seconds: 300 },
      steps: {
        es: [
          'Elige algo concreto que quieras hacer bien: una conversación, una entrega, una pregunta que quieres hacer.',
          'Ensáyalo en tu cabeza en primera persona: qué haces tú, no cómo se ve desde fuera.',
          'Incluye el momento exacto en que empieza. Ese es el que necesitas reconocer cuando llegue.',
          'Cinco minutos bastan. Esto es práctica, no fantasía: si termina en "y todo sale increíble", te saliste del ejercicio.',
        ],
        en: [
          'Pick something concrete you want to do well: a conversation, a delivery, a question you want to ask.',
          'Rehearse it in first person — what you do, not how it looks from outside.',
          'Include the exact moment it starts. That is the one you need to recognise when it arrives.',
          'Five minutes is enough. This is practice, not fantasy: if it ends in "and it all goes amazingly", you have left the exercise.',
        ],
      },
    },
    {
      id: 'ampliar-el-campo',
      name: { es: 'Abre el campo', en: 'Widen the field' },
      why: {
        es: 'Un filtro muy apretado te hace perder lo que no buscabas. Aflojarlo a propósito es lo que deja entrar lo inesperado.',
        en: 'A tight filter costs you everything you were not looking for. Loosening it on purpose is what lets the unexpected in.',
      },
      durationHint: { es: '10 minutos', en: '10 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Una vez a la semana, haz algo sin objetivo: camina sin destino, ve a otra parte de la ciudad, habla con alguien fuera de tu círculo.',
          'Ve sin buscar nada en particular. Ese es el punto del ejercicio, no un descanso de él.',
          'Cuando algo te llame la atención, párate diez segundos en vez de seguir.',
          'Anota después lo que notaste. Vas a ver que casi nada estaba en tu lista.',
        ],
        en: [
          'Once a week, do something with no objective: walk with no destination, go to a different part of town, talk to someone outside your circle.',
          'Go without looking for anything in particular. That is the exercise, not a break from it.',
          'When something catches you, stop on it for ten seconds instead of moving on.',
          'Write down afterwards what you noticed. Almost none of it will have been on your list.',
        ],
      },
    },
  ],

  sources: [
    {
      label:
        'Folk, Remington & Johnston (1992), J. Experimental Psychology: Human Perception and Performance 18(4): 1030–1044 — Involuntary attention is contingent on attentional control settings',
      url: 'https://pubmed.ncbi.nlm.nih.gov/1431742/',
    },
    {
      label:
        'Simons & Chabris (1999), Perception 28(9): 1059–1074 — Gorillas in our midst: sustained inattentional blindness',
      url: 'https://pubmed.ncbi.nlm.nih.gov/10694957/',
    },
    {
      label:
        'Driskell, Copper & Moran (1994), Journal of Applied Psychology 79(4): 481–492 — Does mental practice enhance performance? (meta-analysis)',
      url: 'https://doi.org/10.1037/0021-9010.79.4.481',
    },
  ],

  seo: {
    title: {
      es: 'Entrenar tu radar: por qué ves oportunidades que antes no veías',
      en: 'Training your radar: why you start seeing openings that were always there',
    },
    description: {
      es: 'Tu atención es un filtro que descarta casi todo, y tú escribes la lista de lo que deja pasar. Qué dice la evidencia, y cómo cargar el filtro a propósito.',
      en: 'Your attention is a filter that discards almost everything, and you write the list of what it lets through. What the evidence says, and how to load it deliberately.',
    },
  },
};
