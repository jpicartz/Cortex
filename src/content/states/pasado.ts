import type { MentalState } from '../schema';

export const pasado: MentalState = {
  id: 'pasado',
  slug: { es: 'atrapado-en-el-pasado', en: 'stuck-in-the-past' },
  icon: 'history',
  accent: 'violet',

  label: { es: 'Atrapado en el pasado', en: 'Stuck in the past' },
  blurb: {
    es: 'La misma escena, otra vez, con un final que ya no puedes cambiar.',
    en: 'The same scene, again, with an ending you can no longer change.',
  },

  feel: {
    es: [
      'Repites una conversación en tu cabeza inventando lo que deberías haber dicho.',
      'Un recuerdo incómodo aparece solo, sin que nadie lo invoque, casi siempre al acostarte.',
      'Sientes vergüenza por algo que pasó hace años y que nadie más recuerda.',
      'Sabes que darle vueltas no sirve de nada y aun así no puedes soltarlo.',
    ],
    en: [
      'You replay a conversation, inventing what you should have said.',
      'An uncomfortable memory shows up on its own, unsummoned, usually as you lie down.',
      'You feel embarrassed about something that happened years ago and nobody else remembers.',
      'You know that chewing on it changes nothing, and you still cannot put it down.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Cada vez que lo recuerdas, lo vuelves a grabar',
      en: 'Every time you recall it, you record it again',
    },
    body: {
      es: [
        'Cuando no estás concentrado en nada en particular, tu cerebro no se apaga: enciende una red llamada red neuronal por defecto. Es la que produce los pensamientos sobre ti mismo y los viajes mentales en el tiempo. Es útil —te deja aprender de lo que viviste— pero cuando se atora en un solo recuerdo deja de aprender y solo repite.',
        'Además tu memoria tiene un sesgo hacia lo negativo. Lo que salió mal se guarda con más detalle y más carga que lo que salió bien, porque evolutivamente costaba mucho más caro olvidar un error que olvidar un acierto. No estás siendo injusto contigo por gusto: tu archivo está inclinado de fábrica.',
        'Y aquí está lo importante, lo que casi nadie sabe: un recuerdo no es un archivo que abres y cierras intacto. Cada vez que lo traes al presente se vuelve maleable un rato y se vuelve a guardar. Si lo recuperas con vergüenza, lo guardas con más vergüenza. Repasarlo cien veces no lo desgasta: lo profundiza.',
        'Eso también explica por qué escribirlo funciona tan bien. Mientras el episodio siga siendo una sensación difusa que da vueltas, no tiene principio ni final. Al ponerlo en palabras con orden lo conviertes en una historia, con causas y con cierre. Un evento con estructura pesa mucho menos que un bucle sin forma.',
      ],
      en: [
        "When you aren't focused on anything in particular, your brain doesn't switch off — it switches on the default mode network. This is the system that generates self-referential thought and mental time travel. It's useful, because it lets you learn from what you've lived. But when it gets stuck on one memory it stops learning and just repeats.",
        'Your memory also runs a negativity bias. What went wrong is stored with more detail and more charge than what went right, because forgetting a mistake was evolutionarily far more expensive than forgetting a success. You are not being unfair to yourself on purpose — your archive is tilted from the factory.',
        "And here's the part almost nobody knows: a memory is not a file you open and close intact. Every time you bring it into the present it becomes editable for a while, then gets saved again. Retrieve it with shame and you re-save it with more shame. Replaying it a hundred times doesn't wear it down — it deepens it.",
        'That also explains why writing it out works so well. As long as the episode stays a diffuse feeling going in circles, it has no beginning and no ending. Putting it into ordered words turns it into a story, with causes and a close. An event with structure weighs far less than a loop without shape.',
      ],
    },
    parts: [
      {
        name: { es: 'Red neuronal por defecto', en: 'Default mode network' },
        role: {
          es: 'Se enciende cuando no estás enfocado. Produce el rumiar en automático.',
          en: 'Switches on when you are unfocused. Produces the automatic rumination.',
        },
        region: 'dmn',
      },
      {
        name: { es: 'Hipocampo', en: 'Hippocampus' },
        role: {
          es: 'Guarda y reconstruye recuerdos. Los reescribe cada vez que los usas.',
          en: 'Stores and reconstructs memories. Rewrites them each time you use them.',
        },
        region: 'hippocampus',
      },
    ],
  },

  techniques: [
    {
      id: 'escritura-expresiva',
      name: { es: 'Escritura expresiva', en: 'Expressive writing' },
      why: {
        es: 'Convierte un bucle emocional sin forma en una narración con principio y final, que es lo que permite cerrarlo.',
        en: 'Turns a shapeless emotional loop into a narrative with a beginning and an end — which is what lets it close.',
      },
      durationHint: { es: '15 minutos', en: '15 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: 'Escribe sobre el episodio y sobre lo que te hizo sentir. No te edites.',
          en: 'Write about the episode and how it made you feel. Do not edit yourself.',
        },
      },
      steps: {
        es: [
          'Elige un solo episodio, no toda tu vida.',
          'Escribe quince minutos seguidos sin parar y sin corregir. La ortografía no importa.',
          'No narres solo los hechos: escribe qué sentiste y qué significó para ti.',
          'Al terminar, no lo releas hoy. Repite mañana si el episodio sigue pesando.',
        ],
        en: [
          'Pick a single episode, not your whole life.',
          "Write for fifteen unbroken minutes without stopping or correcting. Spelling doesn't matter.",
          'Do not only narrate the facts — write what you felt and what it meant to you.',
          "When you finish, don't reread it today. Repeat tomorrow if the episode still weighs.",
        ],
      },
    },
    {
      id: 'defusion',
      name: { es: 'Poner distancia al pensamiento', en: 'Putting distance on the thought' },
      why: {
        es: 'Separa el pensamiento de la verdad. No discutes con él, cambias tu posición respecto a él.',
        en: "Separates the thought from the truth. You don't argue with it — you change where you stand relative to it.",
      },
      durationHint: { es: '1 minuto', en: '1 minute' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Escucha la frase exacta que te estás diciendo. Por ejemplo: "quedé como un idiota".',
          'Vuelve a decirla anteponiendo: "estoy teniendo el pensamiento de que quedé como un idiota".',
          'Ahora otra vez: "me doy cuenta de que estoy teniendo el pensamiento de que...".',
          'Nota que el contenido no cambió y aun así pesa menos. Ese es todo el ejercicio.',
        ],
        en: [
          'Listen for the exact sentence you are telling yourself. For example: "I looked like an idiot."',
          'Say it again with a prefix: "I am having the thought that I looked like an idiot."',
          'Now once more: "I notice I am having the thought that…"',
          'Notice the content did not change and it still weighs less. That is the whole exercise.',
        ],
      },
    },
    {
      id: 'interrumpir-bucle',
      name: { es: 'Interrumpir el bucle', en: 'Interrupt the loop' },
      why: {
        es: 'La red por defecto y la atención enfocada no pueden estar encendidas al mismo tiempo. Encender una apaga la otra.',
        en: 'The default mode network and focused attention cannot both run at once. Switching one on switches the other off.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: { kind: 'timer', seconds: 180 },
      steps: {
        es: [
          'Elige una tarea que exija atención real pero no sea difícil: lavar los trastes, ordenar un cajón, caminar contando pasos.',
          'Tiene que ocupar las manos y los ojos. Leer o ver algo no sirve igual.',
          'Hazlo tres minutos con toda la atención puesta ahí.',
          'Cuando el pensamiento regrese, y va a regresar, devuelve la atención a la tarea sin pelearte.',
        ],
        en: [
          'Pick a task that demands real attention but is not hard: washing dishes, tidying a drawer, walking while counting steps.',
          'It has to occupy your hands and eyes. Reading or watching does not work the same way.',
          'Do it for three minutes with your attention fully on it.',
          'When the thought comes back — and it will — return your attention to the task without fighting it.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Pennebaker & Beall (1986) — Confronting a traumatic event: expressive writing',
      url: 'https://psycnet.apa.org/record/1987-01100-001',
    },
    {
      label: 'Nader, Schafe & LeDoux (2000), Nature — Memory reconsolidation',
      url: 'https://www.nature.com/articles/35021052',
    },
    {
      label: 'Andrews-Hanna (2012) — The brain’s default network and self-generated thought',
      url: 'https://journals.sagepub.com/doi/10.1177/1073858411403316',
    },
  ],

  seo: {
    title: {
      es: 'No dejo de pensar en el pasado: por qué pasa y cómo parar',
      en: "Can't stop thinking about the past: why it happens and how to stop",
    },
    description: {
      es: 'Rumiar no es debilidad: es una red cerebral atorada, y cada repaso graba el recuerdo más hondo. Entiende el mecanismo y usa tres técnicas para cerrarlo.',
      en: 'Rumination is not weakness — it is a brain network stuck in a loop, and each replay records the memory deeper. Understand the mechanism and use three techniques to close it.',
    },
  },
};
