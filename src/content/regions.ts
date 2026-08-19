import type { RegionInfo } from './schema';

/**
 * One canonical description per brain region, independent of any state.
 *
 * The names and roles inside each state's `parts` are written for *that* state's
 * argument — the amygdala reads as "detector de amenazas" under ansiedad and as
 * something else under enojo. That is right for a page you arrived at with a
 * problem, and wrong for an atlas you arrived at curious. These are the
 * neutral versions.
 *
 * No citations here on purpose: these are descriptive, and every scientific
 * claim built on them is cited by the state that makes it.
 */
export const REGION_INFO: Record<string, RegionInfo> = {
  amygdala: {
    name: { es: 'Amígdala', en: 'Amygdala' },
    role: {
      es: 'Detector de amenazas. Dispara antes de que la parte que razona se entere, porque perderse un peligro real costaba más que una falsa alarma.',
      en: 'Threat detector. It fires before the reasoning part knows anything, because missing a real danger cost more than a false alarm.',
    },
  },
  prefrontal: {
    name: { es: 'Corteza prefrontal', en: 'Prefrontal cortex' },
    role: {
      es: 'La parte que planea, decide y se aguanta. Llega tarde a casi todo y se agota rápido si la usas como pura fuerza de voluntad.',
      en: 'The part that plans, decides and holds back. It arrives late to almost everything and runs out fast if used as raw willpower.',
    },
  },
  dlpfc: {
    name: { es: 'Corteza prefrontal dorsolateral', en: 'Dorsolateral prefrontal cortex' },
    role: {
      es: 'Sostiene la meta activa y filtra todo lo demás. El filtro tarda minutos en montarse y se cae completo en cuanto lo sueltas.',
      en: 'Holds the goal active and filters out everything else. The filter takes minutes to build and collapses the moment you let go.',
    },
  },
  vlpfc: {
    name: { es: 'Corteza prefrontal ventrolateral', en: 'Ventrolateral prefrontal cortex' },
    role: {
      es: 'Por aquí pasa ponerle nombre a lo que sientes, y nombrarlo con precisión baja la intensidad sin reprimir nada.',
      en: 'Naming what you feel runs through here, and naming it precisely lowers the intensity without suppressing anything.',
    },
  },
  acc: {
    name: { es: 'Corteza cingulada anterior', en: 'Anterior cingulate cortex' },
    role: {
      es: 'Registra el conflicto y el dolor social. El rechazo se procesa con parte de la maquinaria del dolor físico, y eso no es una metáfora.',
      en: 'Registers conflict and social pain. Rejection is processed with some of the same machinery as physical pain, and that is not a metaphor.',
    },
  },
  amcc: {
    name: { es: 'Cingulado medio anterior', en: 'Anterior mid-cingulate' },
    role: {
      es: 'Calcula si seguir vale lo que cuesta, y rehace la cuenta cada pocos segundos.',
      en: 'Works out whether carrying on is worth what it costs, and redoes the sum every few seconds.',
    },
  },
  hippocampus: {
    name: { es: 'Hipocampo', en: 'Hippocampus' },
    role: {
      es: 'Guarda y reconstruye recuerdos. Cada vez que traes uno al presente se vuelve editable un rato y se guarda otra vez, un poco cambiado.',
      en: 'Stores and rebuilds memories. Each time you bring one into the present it becomes editable for a while, then is saved again slightly changed.',
    },
  },
  'ventral-striatum': {
    name: { es: 'Estriado ventral', en: 'Ventral striatum' },
    role: {
      es: 'Responde al acercamiento, no a la llegada. Por eso el avance se siente y la espera no.',
      en: 'Responds to closing the gap, not to arriving. Which is why progress registers and waiting does not.',
    },
  },
  'reward-path': {
    name: { es: 'Vía de recompensa', en: 'Reward pathway' },
    role: {
      es: 'No evalúa en absoluto: evalúa contra lo que esperabas. Todo lo que sientes como logro es una comparación.',
      en: 'It does not evaluate in absolute terms — it evaluates against what you expected. Everything felt as achievement is a comparison.',
    },
  },
  limbic: {
    name: { es: 'Sistema límbico', en: 'Limbic system' },
    role: {
      es: 'Vota por el alivio de ahora. Cuando la recompensa está lejos, casi siempre gana.',
      en: 'Votes for relief right now. When the reward is far away, it usually wins.',
    },
  },
  dmn: {
    name: { es: 'Red neuronal por defecto', en: 'Default mode network' },
    role: {
      es: 'Se enciende cuando no estás concentrado en nada. Produce pensamiento sobre ti mismo y viajes mentales en el tiempo: útil, hasta que se atora.',
      en: 'Switches on when you are not focused on anything. It produces self-referential thought and mental time travel — useful, until it sticks.',
    },
  },
  scn: {
    name: { es: 'Núcleo supraquiasmático', en: 'Suprachiasmatic nucleus' },
    role: {
      es: 'El reloj que decide a qué hora tu cuerpo espera dormir. No responde al esfuerzo; responde a la luz.',
      en: 'The clock that decides when your body expects to sleep. It does not respond to effort — it responds to light.',
    },
  },
  vagus: {
    name: { es: 'Nervio vago', en: 'Vagus nerve' },
    role: {
      es: 'El cable entre la respiración y el ritmo cardiaco. Es la única parte de la alarma que puedes operar a voluntad.',
      en: 'The wire between breath and heart rate. It is the one part of the alarm you can operate on purpose.',
    },
  },
};
