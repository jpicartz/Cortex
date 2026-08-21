import type { MentalState } from '../schema';

export const procrastinacion: MentalState = {
  id: 'procrastinacion',
  slug: { es: 'procrastinacion', en: 'procrastination' },
  icon: 'hourglass',
  accent: 'amber',
  signature: 'stall',
  tile: 'standard',
  band: 'difficult',

  label: { es: 'Procrastinación', en: 'Procrastination' },
  blurb: {
    es: 'Sabes exactamente qué hacer y aun así no empiezas.',
    en: "You know exactly what to do and still don't start.",
  },

  feel: {
    es: [
      'Abres la tarea, la miras diez segundos y abres otra pestaña.',
      'Te sientes culpable por no avanzar, y esa culpa te da menos ganas todavía.',
      'Haces todas las tareas pequeñas menos la que importa.',
      'Te dices que vas a empezar a las 3, luego a las 4, luego mañana.',
    ],
    en: [
      'You open the task, look at it for ten seconds, and open another tab.',
      'You feel guilty for not moving, and the guilt makes you want it even less.',
      'You do every small task except the one that matters.',
      "You tell yourself you'll start at 3, then at 4, then tomorrow.",
    ],
  },

  mechanism: {
    headline: {
      es: 'No es flojera ni falta de disciplina: es evitar una emoción',
      en: "It isn't laziness or weak discipline — it's avoiding a feeling",
    },
    body: {
      es: [
        'Procrastinar no es un problema de tiempo. Es un problema de emociones.',
        'La tarea te produce algo incómodo: aburrimiento, ansiedad, miedo a hacerlo mal, no saber por dónde empezar. Posponerla te quita esa incomodidad al instante.',
        'Y ahí está la trampa. Tu cerebro registra que evitar funcionó. No estás siendo flojo: estás siendo eficientísimo para quitarte una molestia.',
        'Piénsalo como dos votantes con un solo voto entre los dos. Uno quiere que te sientas bien ahora mismo. El otro sostiene la meta de mañana. Cuando la recompensa está lejos, el primero gana casi siempre.',
        'Por eso el momento más caro de cualquier tarea es el arranque. Antes de empezar solo existe el costo. Pasados unos minutos, el avance mismo genera dopamina y la tarea empieza a sostenerse sola.',
        'Casi nunca es la tarea lo que cuesta. Es cruzar la puerta.',
      ],
      en: [
        "Procrastination isn't a time problem. It's an emotion problem.",
        'The task produces something uncomfortable: boredom, anxiety, fear of doing it badly, not knowing where to start. Putting it off removes that discomfort instantly.',
        "And there's the trap. Your brain registers that avoidance worked. You aren't lazy — you're extremely efficient at removing a discomfort.",
        'Think of it as two voters sharing a single vote. One wants you to feel good right now. The other is holding tomorrow\'s goal. When the reward is far away, the first one wins almost every time.',
        'Which is why the most expensive moment of any task is starting it. Before you begin there is only cost. A few minutes in, progress itself produces dopamine and the task starts to carry itself.',
        "It is almost never the task that's hard. It's walking through the door.",
      ],
    },
    analogy: 3,
    parts: [
      {
        name: { es: 'Sistema límbico', en: 'Limbic system' },
        role: {
          es: 'Vota por el alivio de ahora. Siempre gana si la recompensa está lejos.',
          en: 'Votes for relief right now. Wins by default when the reward is far away.',
        },
        region: 'limbic',
      },
      {
        name: { es: 'Corteza prefrontal', en: 'Prefrontal cortex' },
        role: {
          es: 'Sostiene la meta a futuro. Se agota rápido si la usas solo como fuerza de voluntad.',
          en: 'Holds the future goal. Runs out fast if you use it as raw willpower.',
        },
        region: 'prefrontal',
      },
      {
        name: { es: 'Dopamina', en: 'Dopamine' },
        role: {
          es: 'No es la molécula del placer, es la de las ganas. Sube con el avance, no con el descanso.',
          en: "Not the pleasure molecule — the wanting one. It rises with progress, not with rest.",
        },
      },
    ],
  },

  techniques: [
    {
      id: 'regla-5-minutos',
      name: { es: 'La regla de los 5 minutos', en: 'The 5-minute rule' },
      why: {
        es: 'Ataca directamente el costo de arranque: el único compromiso son cinco minutos, así que evitar deja de tener sentido.',
        en: 'Attacks the start-up cost directly: the only commitment is five minutes, so avoidance stops being worth it.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: { kind: 'timer', seconds: 300 },
      steps: {
        es: [
          'Elige una sola tarea. Si es grande, elige solo la primera parte visible de ella.',
          'Prometete cinco minutos exactos. Tienes permiso real de parar al terminar.',
          'Pon el temporizador y empieza, aunque lo hagas mal.',
          'Cuando suene, decide otra vez. La mayoría de las veces vas a seguir, y si no, cumpliste.',
        ],
        en: [
          'Pick one task. If it is large, pick only the first visible piece of it.',
          'Commit to exactly five minutes. You have genuine permission to stop when it ends.',
          'Start the timer and begin, even if you do it badly.',
          "When it rings, decide again. Most of the time you'll keep going — and if you don't, you kept your word.",
        ],
      },
    },
    {
      id: 'arranque-por-esfuerzo',
      name: { es: 'Arranque por esfuerzo', en: 'Effort-forward start' },
      why: {
        es: 'Sube tu línea base de dopamina con esfuerzo en vez de con placer, que es lo único que no te deja peor después.',
        en: 'Raises your dopamine baseline through effort rather than pleasure — the only version that leaves you better off afterwards.',
      },
      durationHint: { es: '2 minutos', en: '2 minutes' },
      tool: { kind: 'timer', seconds: 120 },
      steps: {
        es: [
          'Antes de tocar la tarea, haz dos minutos de algo físicamente incómodo pero seguro.',
          'Sirve: 20 sentadillas, subir escaleras, agua fría en la cara y las muñecas, una caminata rápida.',
          'No revises el teléfono en esos dos minutos. Ese es el punto completo del ejercicio.',
          'Siéntate y empieza de inmediato, sin pausa entre una cosa y la otra.',
        ],
        en: [
          'Before touching the task, spend two minutes doing something physically uncomfortable but safe.',
          'Works well: 20 squats, a flight of stairs, cold water on your face and wrists, a fast walk.',
          "Don't check your phone during those two minutes. That is the entire point of the exercise.",
          'Sit down and start immediately, with no gap between the two.',
        ],
      },
    },
    {
      id: 'formula-de-motivacion',
      name: { es: 'La fórmula de la motivación', en: 'The motivation equation' },
      why: {
        es: 'La motivación no es un rasgo que tengas o no tengas. Es el resultado de cuatro variables, y las cuatro se pueden mover a mano.',
        en: 'Motivation is not a trait you either have or lack. It is the output of four variables, and all four can be moved by hand.',
      },
      durationHint: { es: '10 minutos', en: '10 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'La fórmula es: Motivación = (Expectativa × Valor) ÷ (1 + Impulsividad × Demora). Son cuatro perillas, no una.',
          'Escribe la tarea que estás evitando. Vas a mover variables, no tu fuerza de voluntad.',
          'Expectativa: ¿de verdad crees que puedes? Si no, parte la tarea hasta que el primer paso sea obviamente posible.',
          'Valor: ¿te importa o te aburre? Súbele valor emparejándola con algo que sí disfrutes hacer al mismo tiempo.',
          'Impulsividad: quita de la mesa lo que va a jalarte. El teléfono en otro cuarto, no boca abajo junto a ti.',
          'Demora: acerca la recompensa. Ponte tu propia fecha límite para hoy, mucho antes de la real.',
        ],
        en: [
          'The equation is: Motivation = (Expectancy × Value) ÷ (1 + Impulsiveness × Delay). Four dials, not one.',
          'Write down the task you are avoiding. You are going to move variables, not willpower.',
          'Expectancy: do you actually believe you can? If not, split the task until the first step is obviously doable.',
          'Value: does it matter to you, or does it bore you? Raise the value by pairing it with something you enjoy doing at the same time.',
          'Impulsiveness: take off the table whatever will pull you away. Phone in another room, not face-down beside you.',
          'Delay: bring the reward closer. Set your own deadline for today, well before the real one.',
        ],
      },
    },
    {
      id: 'emparejar-tentaciones',
      name: { es: 'Emparejar tentaciones', en: 'Temptation bundling' },
      why: {
        es: 'Le presta la recompensa inmediata de algo que sí quieres a la tarea que no, para que el arranque deje de ser puro costo.',
        en: 'Lends the immediate reward of something you want to the task you don\'t, so starting stops being pure cost.',
      },
      durationHint: { es: 'Una vez, y ya queda', en: 'Set it up once' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Escoge algo que disfrutes mucho y que puedas hacer al mismo tiempo: una playlist, un podcast, cierto café.',
          'Ponte una regla: eso solo existe mientras haces esta tarea.',
          'La primera semana va a costar. Después, esa señal sola te va a dar ganas de empezar.',
        ],
        en: [
          'Pick something you genuinely enjoy and can do simultaneously: a playlist, a podcast, a specific coffee.',
          'Make a rule: it only exists while you do this task.',
          'The first week is hard. After that, the cue alone starts pulling you into the task.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Sirois & Pychyl (2013) — Procrastination and the priority of short-term mood repair',
      url: 'https://onlinelibrary.wiley.com/doi/10.1111/spc3.12011',
    },

    {
      label: 'Milkman, Minson & Volpp (2014), Management Science — Temptation bundling',
      url: 'https://pubsonline.informs.org/doi/10.1287/mnsc.2013.1784',
    },
    {
      label:
        'Steel & König (2006), Academy of Management Review 31(4): 889–913 — Integrating Theories of Motivation (Temporal Motivation Theory)',
      url: 'https://doi.org/10.5465/amr.2006.22527462',
    },
  ],

  seo: {
    title: {
      es: 'Procrastinación: por qué no empiezas y cómo arrancar hoy',
      en: 'Procrastination: why you never start, and how to start today',
    },
    description: {
      es: 'Procrastinar no es flojera, es evitar una emoción incómoda. Entiende qué hace tu cerebro y usa tres técnicas que atacan el costo de arranque.',
      en: "Procrastination isn't laziness — it's avoiding an uncomfortable feeling. Understand what your brain is doing and use three techniques that attack the start-up cost.",
    },
  },
};
