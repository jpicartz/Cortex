import type { MentalState } from '../schema';

export const aguante: MentalState = {
  id: 'aguante',
  slug: { es: 'aguante', en: 'doing-hard-things' },
  icon: 'mountain',
  accent: 'indigo',
  signature: 'grind',
  tile: 'feature',
  band: 'good',

  label: { es: 'Aguante', en: 'Doing hard things' },
  blurb: {
    es: 'Estás en la mitad difícil y todo te pide parar.',
    en: 'You are in the hard middle and everything says stop.',
  },

  feel: {
    es: [
      'Empezaste bien y ahora cada paso cuesta el doble.',
      'Tu cabeza está negociando: mañana, más tarde, otro día.',
      'Aparecen tareas urgentísimas que hace diez minutos no lo eran.',
      'Sabes que si paras ahora, hoy ya no vuelves.',
    ],
    en: [
      'You started well and now every step costs double.',
      'Your head is negotiating: tomorrow, later, another day.',
      'Urgent tasks appear that were not urgent ten minutes ago.',
      'You know that if you stop now, you are not coming back today.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Tu cerebro no mide qué tan difícil es. Mide si conviene',
      en: 'Your brain is not measuring how hard it is. It is measuring whether it is worth it',
    },
    body: {
      es: [
        'Cuando algo se pone difícil, una zona del cingulado hace una cuenta: cuánto cuesta seguir contra cuánto vale llegar.',
        'No decide si puedes. Decide si conviene. Y la rehace cada pocos segundos, como una tienda que te vuelve a poner precio mientras lo estás pensando.',
        'Por eso querer parar no es debilidad ni falta de carácter. Es el resultado de una cuenta que en ese momento salió negativa. El costo se siente ahora, entero y concreto; el beneficio está lejos y es abstracto. La cuenta viene sesgada de fábrica.',
        'Esta zona es más gruesa y está mejor conectada en las personas más persistentes. También en adultos mayores que conservan la memoria de alguien de veinte años. Y cuando se la estimula directamente, los pacientes describen algo parecido a ganas de seguir.',
        'Ahora la parte honesta, que es la que casi nunca se cuenta: eso son correlaciones. Que hacer cosas difíciles haga crecer esa zona es la versión popular, y la evidencia todavía no llega ahí.',
        'Lo cual no cambia nada de lo práctico. No necesitas creer que te estás construyendo un músculo cerebral. Necesitas saber que la cuenta se puede mover — y que se mueve por el lado del costo, no por el de la fuerza de voluntad.',
      ],
      en: [
        'When something gets hard, a region of the cingulate runs a sum: what it costs to keep going against what it is worth to arrive.',
        'It is not deciding whether you can. It is deciding whether you should. And it redoes the sum every few seconds, like a shop that reprices the item while you are still thinking about it.',
        'Which is why wanting to stop is not weakness or a character flaw. It is the output of a sum that came back negative just then. The cost is felt now, whole and concrete; the payoff is far away and abstract. The sum is biased out of the box.',
        'This region is thicker and better connected in more persistent people. Also in older adults who keep the memory of someone in their twenties. And when it is stimulated directly, patients describe something close to a will to keep going.',
        'Now the honest part, which is the part that almost never gets told: those are correlations. That doing hard things grows this region is the popular version, and the evidence does not reach that far yet.',
        'None of which changes anything practical. You do not need to believe you are building a brain muscle. You need to know the sum can be moved — and that it moves on the cost side, not the willpower side.',
      ],
    },
    analogy: 1,
    focus: [0, 0, 1, 0, 0, 1],
    parts: [
      {
        name: { es: 'Cingulado medio anterior', en: 'Anterior mid-cingulate' },
        role: {
          es: 'Pesa el costo de seguir contra el valor de llegar, y rehace la cuenta constantemente.',
          en: 'Weighs the cost of continuing against the value of arriving, and redoes the sum constantly.',
        },
        region: 'amcc',
      },
      {
        name: { es: 'Costo del esfuerzo', en: 'Effort cost' },
        role: {
          es: 'Se cobra ahora y completo, mientras el beneficio queda lejos. Por eso rendirse se siente razonable.',
          en: 'Charged now and in full, while the payoff stays far off. Which is why quitting feels reasonable.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'cinco-minutos-mas',
      name: { es: 'Cinco minutos más', en: 'Five more minutes' },
      why: {
        es: 'No sube tu voluntad: baja el costo que tu cerebro está evaluando. Deja de pesar todo lo que falta y pesa cinco minutos.',
        en: 'It does not raise your willpower — it lowers the cost your brain is pricing. It stops weighing everything left and weighs five minutes.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: { kind: 'timer', seconds: 300 },
      steps: {
        es: [
          'Elige la parte más pequeña que puedas seguir haciendo ahora mismo.',
          'Pon cinco minutos y trabaja solo en eso. No en el proyecto: en eso.',
          'Cuando suene, decides otra vez. Parar aquí no te debe nada.',
          'Si sigues, es porque la cuenta cambió — no porque te obligaste.',
        ],
        en: [
          'Pick the smallest piece you could keep doing right now.',
          'Set five minutes and work only on that. Not the project — that.',
          'When it goes off, you decide again. Stopping here owes nothing.',
          'If you keep going, it is because the sum changed — not because you forced it.',
        ],
      },
    },
    {
      id: 'bajar-el-costo',
      name: { es: 'Baja el costo antes de bajar la meta', en: 'Cut the cost before cutting the goal' },
      why: {
        es: 'Buena parte de lo que estás pagando no es la tarea: es la fricción alrededor. Quitarla sube el resultado de la cuenta sin bajar la exigencia.',
        en: 'Much of what you are paying is not the task — it is the friction around it. Removing that raises the sum without lowering the bar.',
      },
      durationHint: { es: '4 minutos', en: '4 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Escribe qué es exactamente lo difícil ahora. No "el proyecto": el siguiente movimiento.',
          'Marca cuánto de eso es la tarea y cuánto es lo de alrededor — no saber por dónde, el archivo cerrado, la decisión sin tomar.',
          'Quita una sola cosa de las de alrededor. La más tonta sirve.',
          'Vuelve a intentar el mismo paso. Si sigue igual de caro, entonces sí es la tarea, y ahí la que se baja es la meta de hoy.',
        ],
        en: [
          'Write what is actually hard right now. Not "the project" — the next move.',
          'Mark how much of that is the task and how much is the surroundings: not knowing where to start, the file closed, the decision unmade.',
          'Remove exactly one thing from the surroundings. The stupidest one counts.',
          'Try the same step again. If it still costs the same, then it really is the task — and what gets lowered is today’s goal, not you.',
        ],
      },
    },
    {
      id: 'nombrar-el-punto',
      name: { es: 'Nombra dónde se pone difícil', en: 'Name where it gets hard' },
      why: {
        es: 'Casi siempre es el mismo punto, y verlo escrito lo convierte en algo que puedes preparar en vez de algo que te sorprende.',
        en: 'It is nearly always the same point, and seeing it written turns it into something you can prepare for instead of something that ambushes you.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: '¿En qué momento exacto te dan ganas de parar? ¿Qué estabas haciendo justo antes?',
          en: 'At what exact moment do you want to stop? What were you doing right before?',
        },
      },
      steps: {
        es: [
          'Escribe en qué punto apareció el "mejor mañana". Sé específico con el momento.',
          'Anota qué estabas haciendo justo antes. Ahí suele estar la causa, no en el punto mismo.',
          'La próxima vez que llegues ahí, ya sabías que venía. Eso solo ya cambia cómo se siente.',
          'Después de unas veces vas a ver el patrón: casi nadie se cansa en un punto al azar.',
        ],
        en: [
          'Write down where the "better tomorrow" showed up. Be specific about the moment.',
          'Note what you were doing right before. The cause usually lives there, not at the point itself.',
          'Next time you reach it, you already knew it was coming. That alone changes how it feels.',
          'After a few rounds you will see the pattern: almost nobody tires at a random point.',
        ],
      },
    },
  ],

  sources: [
    {
      label:
        'Touroutoglou, Andreano, Dickerson & Barrett (2020), Cortex 123: 12–29 — The tenacious brain: how the anterior mid-cingulate contributes to achieving goals',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7381101/',
    },
    {
      label:
        'Shenhav, Botvinick & Cohen (2013), Neuron 79(2): 217–240 — The expected value of control: an integrative theory of anterior cingulate cortex function',
      url: 'https://www.shenhavlab.org/s/Neuron-2013-Shenhav.pdf',
    },
  ],

  seo: {
    title: {
      es: 'Aguante: qué pasa en tu cerebro cuando quieres rendirte',
      en: 'Doing hard things: what happens in your brain when you want to quit',
    },
    description: {
      es: 'Querer parar no es falta de carácter: es una cuenta de costo y beneficio que salió negativa. Qué la sesga y cómo moverla.',
      en: 'Wanting to stop is not a character flaw — it is a cost-benefit sum that came back negative. What biases it, and how to move it.',
    },
  },
};
