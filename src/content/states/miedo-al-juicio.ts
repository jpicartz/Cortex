import type { MentalState } from '../schema';

export const miedoAlJuicio: MentalState = {
  id: 'miedo-al-juicio',
  slug: { es: 'miedo-al-juicio', en: 'fear-of-judgement' },
  icon: 'eye',
  accent: 'cyan',
  signature: 'echo',
  tile: 'standard',
  band: 'difficult',

  label: { es: 'Miedo al juicio', en: 'Fear of judgement' },
  blurb: {
    es: 'Sientes que todos te están viendo y evaluando.',
    en: 'It feels like everyone is watching and grading you.',
  },

  feel: {
    es: [
      'Preparas mentalmente una frase simple antes de decirla en voz alta.',
      'Sales de una reunión repasando si dijiste algo raro.',
      'Evitas preguntar en público para no parecer que no entendiste.',
      'Te da pena entrar solo a un lugar donde ya hay gente.',
    ],
    en: [
      'You rehearse a simple sentence in your head before saying it out loud.',
      'You leave a meeting replaying whether you said something strange.',
      "You avoid asking questions in public so you don't look like you didn't understand.",
      'You feel self-conscious walking alone into a room where people already are.',
    ],
  },

  mechanism: {
    headline: {
      es: 'El rechazo social duele en el mismo circuito que un golpe',
      en: 'Social rejection hurts on the same circuit as a physical blow',
    },
    body: {
      es: [
        'Cuando te sientes excluido o juzgado, se activan zonas del cerebro que se solapan con las del dolor físico.',
        'No es una metáfora. Para tu sistema nervioso, quedar mal frente a un grupo se procesa con parte de la misma maquinaria que un daño corporal.',
        'Tiene sentido si piensas de dónde venimos. Durante casi toda la historia humana, ser expulsado del grupo era una sentencia de muerte. Un cerebro que trataba el rechazo social como una emergencia sobrevivía más.',
        'Ese sistema sigue instalado, aunque hoy el peor escenario real sea una reunión incómoda.',
        'Encima corre otro error, y este sí es medible: sobreestimas enormemente cuánto te notan los demás.',
        'En los experimentos, la gente calcula que casi la mitad de la sala se dio cuenta de su error. El número real ronda la cuarta parte. Tú eres el protagonista de tu experiencia y das por hecho que también lo eres de la de todos.',
        'La razón es simple: cada persona en esa sala está ocupada preocupándose por cómo se ve ella. El público severo que imaginas está, en su mayor parte, pensando en sí mismo.',
      ],
      en: [
        'When you feel excluded or judged, brain regions overlapping with those for physical pain light up.',
        'This isn\'t a metaphor. To your nervous system, looking bad in front of a group is processed with some of the same machinery as bodily harm.',
        'It makes sense given where we come from. For most of human history, being cast out of the group was a death sentence. A brain that treated social rejection as an emergency survived more often.',
        'That system is still installed, even though today the realistic worst case is an awkward meeting.',
        'Layered on top is another error, and this one is measurable: you drastically overestimate how much others notice you.',
        'In experiments, people guess that almost half the room clocked their mistake. The real figure is nearer a quarter. You\'re the protagonist of your experience and you assume you\'re the protagonist of everyone else\'s.',
        'The reason is simple: every person in that room is busy worrying about how they come across. The harsh audience you\'re imagining is, for the most part, thinking about itself.',
      ],
    },
    parts: [
      {
        name: { es: 'Corteza cingulada anterior', en: 'Anterior cingulate cortex' },
        role: {
          es: 'Registra el dolor social usando parte del circuito del dolor físico.',
          en: 'Registers social pain using part of the physical-pain circuit.',
        },
        region: 'acc',
      },
      {
        name: { es: 'Efecto reflector', en: 'Spotlight effect' },
        role: {
          es: 'El sesgo que te hace creer que te observan mucho más de lo que ocurre.',
          en: 'The bias that makes you believe you are watched far more than you are.',
        },
      },
    ],
  },

  techniques: [
    {
      id: 'prueba-del-reflector',
      name: { es: 'La prueba del reflector', en: 'The spotlight test' },
      why: {
        es: 'Confronta el sesgo con datos tuyos, en vez de pedirte que te convenzas de algo que no crees.',
        en: 'Confronts the bias with your own data instead of asking you to believe something you do not.',
      },
      durationHint: { es: '2 minutos', en: '2 minutes' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Piensa en lo que temes que noten de ti.',
          'Ahora nombra qué traía puesto la persona que se sentó junto a ti la semana pasada.',
          'Nombra un error que alguien más cometió en la última reunión a la que fuiste.',
          'Si no puedes con ninguna de las dos, tienes tu respuesta sobre cuánto recuerdan de ti.',
        ],
        en: [
          'Think of the thing you are afraid people will notice about you.',
          'Now name what the person sitting next to you last week was wearing.',
          'Name a mistake someone else made in the last meeting you attended.',
          'If you cannot do either, you have your answer about how much they remember of you.',
        ],
      },
    },
    {
      id: 'exhalar-antes-de-hablar',
      name: { es: 'Exhalar antes de hablar', en: 'Exhale before you speak' },
      why: {
        es: 'Baja la activación física en segundos, que es lo que estaba haciendo temblar tu voz.',
        en: 'Drops physical arousal within seconds — which is what was making your voice shake.',
      },
      durationHint: { es: '30 segundos', en: '30 seconds' },
      tool: { kind: 'breath', pattern: 'exhale', cycles: 3 },
      steps: {
        es: [
          'Antes de hablar, inhala normal por la nariz contando hasta cuatro.',
          'Exhala por la boca contando hasta ocho, lento y sin forzar.',
          'Tres ciclos alcanzan. La exhalación larga es la parte que baja el ritmo cardiaco.',
          'Luego habla. No vas a estar tranquilo, vas a estar suficientemente tranquilo.',
        ],
        en: [
          'Before speaking, inhale normally through your nose for a count of four.',
          'Exhale through your mouth for a count of eight, slow and unforced.',
          'Three cycles is enough. The long exhale is the part that lowers your heart rate.',
          'Then speak. You will not be calm — you will be calm enough.',
        ],
      },
    },
    {
      id: 'escalera-de-exposicion',
      name: { es: 'Escalera de exposición', en: 'Exposure ladder' },
      why: {
        es: 'La evitación es lo que mantiene vivo el miedo: cada vez que evitas, tu cerebro confirma que había peligro real.',
        en: 'Avoidance is what keeps the fear alive: each time you avoid, your brain confirms the danger was real.',
      },
      durationHint: { es: 'Una vez por semana', en: 'Once a week' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Escribe cinco situaciones que evitas, de la que menos te asusta a la que más.',
          'Empieza por la primera, no por la última. Debe darte nervio, no pánico.',
          'Hazla y quédate hasta que el nervio baje solo. Salir antes le enseña a tu cerebro lo contrario.',
          'Repite la misma hasta que sea aburrida. Solo entonces sube un escalón.',
        ],
        en: [
          'Write five situations you avoid, from least to most frightening.',
          'Start with the first, not the last. It should make you nervous, not panicked.',
          'Do it and stay until the nerves come down on their own. Leaving early teaches your brain the opposite.',
          'Repeat the same one until it is boring. Only then move up a rung.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Eisenberger, Lieberman & Williams (2003), Science — Does rejection hurt?',
      url: 'https://www.science.org/doi/10.1126/science.1089134',
    },
    {
      label: 'Gilovich, Medvec & Savitsky (2000), JPSP — The spotlight effect',
      url: 'https://psycnet.apa.org/record/2000-13947-002',
    },
  ],

  seo: {
    title: {
      es: 'Miedo al juicio de los demás: por qué duele tanto y qué hacer',
      en: 'Fear of being judged: why it hurts so much and what to do',
    },
    description: {
      es: 'El rechazo social usa parte del circuito del dolor físico, y sobreestimas cuánto te notan. Entiende el efecto reflector y practica tres técnicas.',
      en: 'Social rejection uses part of the physical-pain circuit, and you overestimate how much people notice. Understand the spotlight effect and practise three techniques.',
    },
  },
};
