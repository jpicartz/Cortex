import type { MentalState } from '../schema';

export const enojo: MentalState = {
  id: 'enojo',
  slug: { es: 'enojo', en: 'anger' },
  icon: 'flame',
  accent: 'rose',

  label: { es: 'Enojo', en: 'Anger' },
  blurb: {
    es: 'La reacción llegó antes que tú, y ahora la estás alimentando.',
    en: 'The reaction arrived before you did, and now you are feeding it.',
  },

  feel: {
    es: [
      'Calor en la cara, mandíbula apretada, ganas de contestar de inmediato.',
      'Estás armando en tu cabeza lo que le vas a decir, y mejorándolo cada vez.',
      'Algo pequeño te prendió más de lo que el momento justificaba.',
      'Ya pasaron horas y todavía te hierve cuando lo recuerdas.',
    ],
    en: [
      'Heat in your face, clenched jaw, an urge to fire back immediately.',
      'You are drafting what you will say to them, improving it with each pass.',
      'Something small set you off far more than the moment warranted.',
      'Hours have passed and it still boils when you remember it.',
    ],
  },

  mechanism: {
    headline: {
      es: 'La química dura noventa segundos. El resto lo pones tú',
      en: 'The chemistry lasts ninety seconds. The rest of it is you',
    },
    body: {
      es: [
        'Cuando algo te enoja, tu cuerpo suelta una descarga de adrenalina y cortisol. Esa descarga tiene una vida útil corta: alrededor de noventa segundos desde que se dispara hasta que se limpia sola de tu torrente sanguíneo, si no le agregas nada.',
        'Lo que la mantiene viva es el pensamiento. Cada vez que repites la escena, ensayas la respuesta perfecta o te acuerdas de las otras veces que hizo lo mismo, vuelves a disparar la descarga desde cero. El enojo de los primeros noventa segundos te pasó. El de la hora siguiente lo estás produciendo tú, sin querer.',
        'Eso no significa que el enojo esté mal ni que debas tragártelo. El enojo es información: casi siempre marca un límite cruzado o algo que te importa. El problema no es sentirlo, es quedarte atrapado alimentándolo, que es donde deja de informar y solo desgasta.',
        'Y hay algo que funciona sorprendentemente bien: ponerle nombre. Cuando pasas de sentir la emoción a nombrarla con palabras precisas, la actividad de la amígdala baja y se activa la parte del cerebro que regula. No es reprimir ni fingir calma. Nombrarlo con precisión, para ti mismo, ya lo baja de intensidad.',
      ],
      en: [
        'When something angers you, your body releases a surge of adrenaline and cortisol. That surge has a short shelf life: roughly ninety seconds from trigger to being flushed out of your bloodstream on its own, if you add nothing to it.',
        'What keeps it alive is thought. Every time you replay the scene, rehearse the perfect comeback, or remember the other times they did this, you fire the surge again from zero. The anger of the first ninety seconds happened to you. The anger of the next hour, you are producing — without meaning to.',
        "That doesn't mean anger is wrong or that you should swallow it. Anger is information: it almost always marks a crossed boundary or something you care about. The problem isn't feeling it, it's getting stuck feeding it — which is where it stops informing and just wears you down.",
        'And one thing works surprisingly well: naming it. When you move from feeling the emotion to labelling it in precise words, amygdala activity drops and the regulating part of your brain comes online. This is not suppression or faking calm. Naming it precisely, to yourself, already lowers the volume.',
      ],
    },
    parts: [
      {
        name: { es: 'Amígdala', en: 'Amygdala' },
        role: {
          es: 'Dispara la reacción. Se calma sola si dejas de recargarla con pensamiento.',
          en: 'Fires the reaction. Settles on its own if you stop reloading it with thought.',
        },
        region: 'amygdala',
      },
      {
        name: { es: 'Corteza prefrontal ventrolateral', en: 'Ventrolateral prefrontal cortex' },
        role: {
          es: 'Se activa al ponerle palabras a lo que sientes, y eso baja a la amígdala.',
          en: 'Comes online when you put words to what you feel, and that quiets the amygdala.',
        },
        region: 'vlpfc',
      },
    ],
  },

  techniques: [
    {
      id: 'noventa-segundos',
      name: { es: 'Los noventa segundos', en: 'The ninety seconds' },
      why: {
        es: 'Le da a la descarga química el tiempo exacto que necesita para limpiarse antes de que actúes.',
        en: 'Gives the chemical surge exactly the time it needs to clear before you act.',
      },
      durationHint: { es: '90 segundos', en: '90 seconds' },
      tool: { kind: 'timer', seconds: 90 },
      steps: {
        es: [
          'No respondas todavía. Nada de mensaje, nada de contestar.',
          'Pon noventa segundos y siente lo que pasa en el cuerpo: el calor, la mandíbula, el pecho.',
          'Cuando la mente empiece a armar el argumento, regresa la atención a la sensación física.',
          'Al terminar, decide. Vas a seguir molesto, y aun así vas a decidir mejor.',
        ],
        en: [
          'Do not respond yet. No message, no comeback.',
          'Set ninety seconds and feel what happens in your body: the heat, the jaw, the chest.',
          'When your mind starts building the argument, bring attention back to the physical sensation.',
          'When it ends, decide. You will still be angry — and you will still decide better.',
        ],
      },
    },
    {
      id: 'ponerle-nombre',
      name: { es: 'Ponerle nombre exacto', en: 'Name it precisely' },
      why: {
        es: 'Nombrar una emoción con precisión baja la actividad de la amígdala y enciende la parte que regula.',
        en: 'Labelling an emotion precisely lowers amygdala activity and switches on the part that regulates.',
      },
      durationHint: { es: '1 minuto', en: '1 minute' },
      tool: { kind: 'checklist' },
      steps: {
        es: [
          'Di para ti: "estoy sintiendo…" y busca la palabra más precisa que puedas.',
          'Casi nunca es solo enojo. Suele ser humillación, impotencia, injusticia, susto o decepción.',
          'Agrega qué límite se cruzó: "me molesta porque esperaba que me consultaran".',
          'Nota que ya no te sientes igual que hace treinta segundos.',
        ],
        en: [
          'Say to yourself: "I am feeling…" and find the most precise word you can.',
          'It is almost never just anger. Usually it is humiliation, powerlessness, unfairness, fear or disappointment.',
          'Add which boundary got crossed: "this bothers me because I expected to be consulted."',
          'Notice you no longer feel the way you did thirty seconds ago.',
        ],
      },
    },
    {
      id: 'descarga-fisica',
      name: { es: 'Descarga física', en: 'Physical discharge' },
      why: {
        es: 'La adrenalina preparó al cuerpo para moverse. Si no se mueve, se queda dando vueltas en forma de tensión.',
        en: 'Adrenaline prepared your body to move. If it does not move, it circulates as tension instead.',
      },
      durationHint: { es: '3 minutos', en: '3 minutes' },
      tool: { kind: 'timer', seconds: 180 },
      steps: {
        es: [
          'Sal del lugar donde pasó, aunque sea a otro cuarto.',
          'Mueve el cuerpo con intensidad tres minutos: escaleras, caminar rápido, sentadillas.',
          'No ensayes la conversación mientras lo haces. El punto es gastar la activación, no alimentarla.',
          'Regresa y ahora sí decide qué vas a decir, si es que vas a decir algo.',
        ],
        en: [
          'Leave the place it happened, even if only to another room.',
          'Move your body hard for three minutes: stairs, a fast walk, squats.',
          'Do not rehearse the conversation while you do it. The point is to spend the activation, not feed it.',
          'Come back and now decide what to say — if you are going to say anything.',
        ],
      },
    },
  ],

  sources: [
    {
      label: 'Lieberman et al. (2007), Psychological Science — Putting feelings into words',
      url: 'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2007.01916.x',
    },
    {
      label: 'Jill Bolte Taylor — My Stroke of Insight (the 90-second rule)',
      url: 'https://www.ted.com/talks/jill_bolte_taylor_my_stroke_of_insight',
    },
  ],

  seo: {
    title: {
      es: 'Enojo: la regla de los 90 segundos y cómo bajarlo',
      en: 'Anger: the 90-second rule and how to bring it down',
    },
    description: {
      es: 'La descarga química del enojo dura unos 90 segundos; lo demás lo alimenta tu pensamiento. Entiende el mecanismo y usa tres técnicas para no reaccionar.',
      en: 'The chemical surge of anger lasts about 90 seconds — the rest is fed by your own thinking. Understand the mechanism and use three techniques to avoid reacting.',
    },
  },
};
