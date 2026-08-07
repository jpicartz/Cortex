import type { MentalState } from '../schema';

export const insomnio: MentalState = {
  id: 'insomnio',
  slug: { es: 'no-puedo-dormir', en: 'cant-sleep' },
  icon: 'moon',
  accent: 'indigo',

  label: { es: 'No puedo dormir', en: "Can't sleep" },
  blurb: {
    es: 'El cuerpo cansado y la cabeza a toda velocidad.',
    en: 'Body exhausted, head running at full speed.',
  },

  feel: {
    es: [
      'Te acuestas agotado y la mente se enciende justo al apagar la luz.',
      'Empiezas a calcular cuántas horas te quedan si te duermes ya.',
      'Recuerdas pendientes y conversaciones que no pensaste en todo el día.',
      'Entre más te esfuerzas por dormir, más despierto estás.',
    ],
    en: [
      'You lie down exhausted and your mind switches on the moment the light goes off.',
      'You start calculating how many hours are left if you fall asleep right now.',
      'You remember tasks and conversations you did not think about all day.',
      'The harder you try to sleep, the more awake you are.',
    ],
  },

  mechanism: {
    headline: {
      es: 'Intentar dormir es lo único que garantiza no lograrlo',
      en: 'Trying to sleep is the one thing that guarantees you will not',
    },
    body: {
      es: [
        'Dormir no es algo que hagas. Es algo que ocurre cuando se juntan dos condiciones.',
        'Una es la presión de sueño, que se acumula sola mientras estás despierto. La otra es tu reloj interno, que decide a qué hora tu cuerpo espera dormir. Si las dos están alineadas, te duermes sin hacer nada.',
        'Ninguna responde al esfuerzo. Al contrario: esforzarte por dormir es una tarea con meta y fecha límite, y tu cuerpo la trata como cualquier otra, subiendo la activación.',
        'Es como intentar quedarte quieto tensando todos los músculos. Cuanto más lo intentas, más lejos queda.',
        'Por eso mirar el reloj y calcular las horas que te quedan es justo lo que más te aleja. La preocupación por no dormir es lo que sostiene el no dormir.',
        'Lo de la mente acelerada es más simple de lo que parece. Esos pensamientos estaban ahí todo el día; estabas ocupado y no los escuchabas. Al detenerte, la red que produce pensamiento espontáneo por fin tiene el escenario para ella sola.',
        'Y hay una pieza que casi nadie considera. Si te quedas acostado despierto y frustrado noche tras noche, tu cerebro aprende la asociación: la cama se vuelve el lugar donde uno está despierto pensando. Cuidar esa asociación es la razón del consejo contraintuitivo de levantarse.',
      ],
      en: [
        'Sleep is not something you do. It\'s something that happens when two conditions line up.',
        'One is sleep pressure, which builds on its own while you\'re awake. The other is your internal clock, which decides when your body expects to sleep. When both align, you fall asleep without doing anything.',
        'Neither responds to effort. Quite the opposite: trying to sleep is a task with a goal and a deadline, and your body treats it like any other — by raising arousal.',
        'It\'s like trying to hold still by tensing every muscle. The harder you try, the further away it gets.',
        'Which is why checking the clock and counting the hours left is precisely what pushes it away. Worrying about not sleeping is what sustains the not sleeping.',
        'The racing mind is simpler than it seems. Those thoughts were there all day; you were busy and not listening. Once you stop, the network that generates spontaneous thought finally has the stage to itself.',
        'And there\'s a piece almost nobody accounts for. Lie awake and frustrated night after night and your brain learns the association: bed becomes the place where one lies awake thinking. Protecting that association is the reason behind the counterintuitive advice to get up.',
      ],
    },
    parts: [
      {
        name: { es: 'Presión de sueño', en: 'Sleep pressure' },
        role: {
          es: 'Se acumula sola mientras estás despierto. Las siestas largas la descargan.',
          en: 'Builds on its own while you are awake. Long naps discharge it.',
        },
      },
      {
        name: { es: 'Reloj circadiano', en: 'Circadian clock' },
        role: {
          es: 'Fija a qué hora tu cuerpo espera dormir. Lo ajusta la luz, sobre todo la de la mañana.',
          en: 'Sets when your body expects to sleep. Tuned by light, especially morning light.',
        },
        region: 'scn',
      },
      {
        name: { es: 'Cortisol', en: 'Cortisol' },
        role: {
          es: 'Debería estar en su punto más bajo de noche. La preocupación lo vuelve a subir.',
          en: 'Should be at its lowest at night. Worry pushes it back up.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'barajado-cognitivo',
      name: { es: 'Barajado cognitivo', en: 'Cognitive shuffle' },
      why: {
        es: 'Imita lo que hace tu mente justo antes de dormirse e impide que armes narraciones coherentes, que es lo que te mantiene despierto.',
        en: 'Mimics what your mind does right before sleep and blocks coherent storytelling — which is what keeps you awake.',
      },
      durationHint: { es: 'Hasta dormirte', en: 'Until you drift off' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Elige una palabra cualquiera, sin significado emocional. Por ejemplo: "mesa".',
          'Toma su primera letra, la M, y ve imaginando objetos que empiecen con ella: montaña, mango, moneda.',
          'Visualiza cada objeto unos segundos. No los conectes entre sí ni les inventes historia.',
          'Cuando se te acaben, pasa a la siguiente letra. Casi nunca vas a llegar al final de la palabra.',
        ],
        en: [
          'Pick any word with no emotional charge. For example: "table".',
          'Take its first letter, T, and imagine objects starting with it: tower, tomato, train.',
          'Picture each object for a few seconds. Do not connect them or build a story.',
          'When you run out, move to the next letter. You will rarely reach the end of the word.',
        ],
      },
    },
    {
      id: 'regla-de-levantarse',
      name: { es: 'La regla de los veinte minutos', en: 'The twenty-minute rule' },
      why: {
        es: 'Protege la asociación entre tu cama y el sueño, en lugar de enseñarle a tu cerebro que ahí se está despierto.',
        en: 'Protects the association between your bed and sleep, instead of teaching your brain that bed means lying awake.',
      },
      durationHint: { es: 'Cuando ya llevas rato', en: 'When you have been up a while' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Si llevas más o menos veinte minutos despierto, levántate. No mires el reloj para saberlo, cálculalo a ojo.',
          'Ve a otro cuarto con luz tenue y haz algo aburrido: leer algo ligero en papel, doblar ropa.',
          'Nada de pantallas brillantes, trabajo ni nada que te interese demasiado.',
          'Regresa a la cama solo cuando tengas sueño de verdad, no cuando te sientas listo para intentarlo otra vez.',
        ],
        en: [
          'If you have been awake around twenty minutes, get up. Do not check the clock — estimate it.',
          'Go to another room with dim light and do something boring: read something light on paper, fold laundry.',
          'No bright screens, no work, nothing that interests you too much.',
          'Return to bed only when you are genuinely sleepy, not when you feel ready to try again.',
        ],
      },
    },
    {
      id: 'exhalacion-larga-noche',
      name: { es: 'Exhalación larga', en: 'Long exhale' },
      why: {
        es: 'Alargar la exhalación baja el ritmo cardiaco y es una de las pocas cosas que sí puedes hacer a voluntad para bajar la activación.',
        en: 'Lengthening the exhale lowers your heart rate — one of the few things you can do deliberately to reduce arousal.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: { kind: 'breath', pattern: 'exhale', cycles: 12 },
      steps: {
        es: [
          'Acostado, respira por la nariz contando hasta cuatro.',
          'Exhala contando hasta ocho, sin forzar. Si ocho es mucho, usa seis.',
          'La proporción importa más que los números: la salida siempre más larga que la entrada.',
          'Sigue sin contar cuántos ciclos llevas. Contar ciclos es otra forma de intentar dormir.',
        ],
        en: [
          'Lying down, breathe in through your nose for a count of four.',
          'Exhale for a count of eight, unforced. If eight is too long, use six.',
          'The ratio matters more than the numbers: the out-breath always longer than the in-breath.',
          'Keep going without counting cycles. Counting cycles is just another way of trying to sleep.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Bootzin & Perlis — Stimulus control therapy for insomnia',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21867974/',
    },
    {
      label: 'Huberman Lab — Master Your Sleep & Be More Alert When Awake',
      url: 'https://www.hubermanlab.com/episode/master-your-sleep-and-be-more-alert-when-awake',
    },
    {
      label: 'Beaudoin et al. — Serial diverse imagining (the cognitive shuffle)',
      url: 'https://pubmed.ncbi.nlm.nih.gov/27725946/',
    },
  ],

  seo: {
    title: {
      es: 'No puedo dormir: por qué se acelera la mente de noche y qué hacer',
      en: "Can't sleep: why your mind races at night and what to do",
    },
    description: {
      es: 'Dormir no se logra con esfuerzo: se logra cuando se alinean la presión de sueño y tu reloj interno. Entiende por qué preocuparte te desvela y usa tres técnicas.',
      en: 'Sleep is not achieved by effort — it happens when sleep pressure and your internal clock align. Understand why worrying keeps you up, and use three techniques.',
    },
  },
};
