import type { MentalState } from '../schema';

export const futuro: MentalState = {
  id: 'futuro',
  slug: { es: 'preocupacion-por-el-futuro', en: 'worrying-about-the-future' },
  icon: 'timeline',
  accent: 'emerald',

  label: { es: 'Preocupación por el futuro', en: 'Worrying about the future' },
  blurb: {
    es: 'Ensayando desastres que todavía no existen.',
    en: 'Rehearsing disasters that do not exist yet.',
  },

  feel: {
    es: [
      'Empiezas con "¿y si…?" y quince minutos después ya perdiste el trabajo y la casa.',
      'No puedes disfrutar algo bueno porque estás vigilando cuándo se va a arruinar.',
      'Sientes que preocuparte es una forma de estar preparado.',
      'Buscas que alguien te asegure que todo va a salir bien, y el alivio dura diez minutos.',
    ],
    en: [
      'You start with "what if…" and fifteen minutes later you have lost the job and the house.',
      'You cannot enjoy something good because you are watching for when it will fall apart.',
      'Worrying feels like a way of being prepared.',
      'You look for reassurance that it will be fine, and the relief lasts ten minutes.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Preocuparte se siente productivo, y por eso no lo sueltas',
      en: 'Worrying feels productive, which is exactly why you cannot drop it',
    },
    body: {
      es: [
        'Tu cerebro es, sobre todo, una máquina de predecir. Simula escenarios para prepararte, y eso es enormemente útil cuando la simulación termina en una decisión o en una acción. El problema aparece cuando la simulación no termina en nada y simplemente vuelve a empezar.',
        'Hay una razón por la que ese bucle se sostiene: para tu sistema nervioso, "no sé" se parece más a "peligro" que a "neutro". La incertidumbre en sí misma es aversiva. Por eso a veces prefieres una mala noticia confirmada antes que seguir sin saber, aunque objetivamente la duda deje abierta la posibilidad de que todo esté bien.',
        'Y aquí está el mecanismo que lo mantiene vivo. Preocuparte se siente como estar haciendo algo: da la sensación de que te estás preparando, de que estás cubriendo escenarios. Encima, lo que temías casi nunca ocurre, así que tu cerebro le da el crédito a la preocupación. Aprendes, sin darte cuenta, que preocuparte funciona.',
        'Lo que rompe el bucle no es tranquilizarte, porque la tranquilidad prestada se gasta en minutos y te deja necesitando más. Lo que lo rompe es llevar la pregunta hasta el final. El bucle sobrevive porque nunca llega a una respuesta: da vueltas justo antes del punto donde tendrías que ver qué harías realmente si eso pasara.',
      ],
      en: [
        'Your brain is, above all, a prediction machine. It simulates scenarios to prepare you, and that is enormously useful when the simulation ends in a decision or an action. The problem appears when the simulation ends in nothing and simply restarts.',
        'There is a reason the loop sustains itself: to your nervous system, "I don\'t know" resembles "danger" more than it resembles "neutral." Uncertainty is aversive in itself. It is why you sometimes prefer confirmed bad news to continuing not to know, even though not knowing objectively leaves open the possibility that everything is fine.',
        'And here is the mechanism keeping it alive. Worrying feels like doing something: it gives the sense that you are preparing, covering scenarios. On top of that, the thing you feared almost never happens — so your brain gives the worry the credit. You learn, without noticing, that worrying works.',
        'What breaks the loop is not reassurance, because borrowed calm is spent within minutes and leaves you needing more. What breaks it is taking the question all the way to the end. The loop survives because it never reaches an answer: it circles just short of the point where you would have to see what you would actually do if it happened.',
      ],
    },
    parts: [
      {
        name: { es: 'Cerebro predictivo', en: 'Predictive brain' },
        role: {
          es: 'Simula futuros para prepararte. Es útil hasta que la simulación no termina.',
          en: 'Simulates futures to prepare you. Useful right up until the simulation never ends.',
        },
      },
      {
        name: { es: 'Intolerancia a la incertidumbre', en: 'Intolerance of uncertainty' },
        role: {
          es: 'Hace que "no saber" se procese como amenaza en vez de como neutro.',
          en: 'Makes "not knowing" get processed as a threat rather than as neutral.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'escalera-y-luego-que',
      name: { es: 'La escalera del "¿y luego qué?"', en: 'The "then what?" ladder' },
      why: {
        es: 'Lleva el bucle hasta el final. Sobrevive precisamente porque nunca llega a una respuesta.',
        en: 'Takes the loop all the way to the end. It survives precisely because it never reaches an answer.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: {
        kind: 'braindump',
        prompt: {
          es: 'Escribe el miedo, luego "¿y luego qué?", y responde. Otra vez. Hasta el final.',
          en: 'Write the fear, then "then what?", and answer. Again. All the way down.',
        },
      },
      steps: {
        es: [
          'Escribe el miedo tal como suena en tu cabeza: "y si me corren del trabajo".',
          'Pregúntate "¿y luego qué?" y responde concretamente qué harías.',
          'Vuelve a preguntar "¿y luego qué?" a esa respuesta. Sigue hasta que ya no haya escalón.',
          'Casi siempre llegas a algo duro pero manejable. Esa es la respuesta que el bucle te estaba escondiendo.',
        ],
        en: [
          'Write the fear exactly as it sounds in your head: "what if I lose my job."',
          'Ask "then what?" and answer concretely what you would do.',
          'Ask "then what?" of that answer. Keep going until there is no next rung.',
          'You almost always arrive somewhere hard but survivable. That is the answer the loop was hiding from you.',
        ],
      },
    },
    {
      id: 'cita-con-la-preocupacion',
      name: { es: 'Cita con la preocupación', en: 'A worry appointment' },
      why: {
        es: 'No pelea con el pensamiento, lo agenda. Posponer funciona mucho mejor que prohibir, porque prohibir lo amplifica.',
        en: 'Does not fight the thought — it schedules it. Postponing works far better than banning, because banning amplifies it.',
      },
      durationHint: { es: '15 minutos al día', en: '15 minutes a day' },
      tool: { kind: 'timer', seconds: 900 },
      steps: {
        es: [
          'Aparta quince minutos fijos al día, siempre a la misma hora y nunca cerca de dormir.',
          'Cuando llegue una preocupación fuera de ese rato, anótala en una línea y déjala para la cita.',
          'No estás prohibiéndote pensarlo. Le estás poniendo hora, que es distinto y sí funciona.',
          'En la cita, preocúpate a propósito los quince minutos completos. Muchas ya no te van a importar.',
        ],
        en: [
          'Set aside fifteen fixed minutes a day, always at the same time and never near bedtime.',
          'When a worry arrives outside that slot, write it down in one line and save it for the appointment.',
          'You are not forbidding yourself from thinking it. You are giving it a time, which is different and does work.',
          'At the appointment, worry on purpose for the full fifteen minutes. Many will no longer interest you.',
        ],
      },
    },
    {
      id: 'aterrizar-probabilidad',
      name: { es: 'Aterrizar la probabilidad', en: 'Ground the probability' },
      why: {
        es: 'La preocupación trata cualquier posibilidad como si fuera probable. Ponerle un número y evidencia real la devuelve a su tamaño.',
        en: 'Worry treats any possibility as if it were probable. Putting a number and real evidence on it returns it to its actual size.',
      },
      durationHint: { es: '5 minutos', en: '5 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Escribe qué temes exactamente, en una frase concreta y verificable.',
          'Ponle un número del 0 al 100: qué tan probable crees que es.',
          'Anota la evidencia real a favor y en contra. Evidencia, no sensaciones.',
          'Vuelve a ponerle número. Luego pregúntate qué harías si pasara, y anota ese plan en una línea.',
        ],
        en: [
          'Write exactly what you fear, in one concrete, checkable sentence.',
          'Put a number on it from 0 to 100: how likely you believe it is.',
          'List the real evidence for and against. Evidence, not feelings.',
          'Give it a number again. Then ask what you would do if it happened, and write that plan in one line.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Borkovec et al. — Worry as avoidance and the stimulus-control treatment',
      url: 'https://pubmed.ncbi.nlm.nih.gov/6830727/',
    },
    {
      label: 'Carleton (2016) — Fear of the unknown: intolerance of uncertainty',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27067453/',
    },
  ],

  seo: {
    title: {
      es: 'Preocupación por el futuro: por qué no puedes parar y cómo cortarla',
      en: 'Worrying about the future: why you cannot stop, and how to cut it',
    },
    description: {
      es: 'El bucle de "¿y si…?" sobrevive porque preocuparte se siente productivo y nunca llega a una respuesta. Entiende el mecanismo y córtalo con tres técnicas.',
      en: 'The "what if…" loop survives because worrying feels productive and never reaches an answer. Understand the mechanism and cut it with three techniques.',
    },
  },
};
