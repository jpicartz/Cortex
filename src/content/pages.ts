import type { StaticPage } from './schema';

/**
 * The thesis page.
 *
 * Every technique on this site rests on one assumption — that the brain is
 * changed by what you repeatedly do — and until now nothing said it out loud.
 * Worse, "rewire your brain" is the single most abused phrase in wellness
 * writing, so a site that leans on the idea and never states its limits is
 * borrowing credibility it has not earned.
 *
 * The two studies here were chosen because together they make the honest case:
 * the structural change is real and fast, AND it recedes when you stop, AND
 * what predicted it was learning something new rather than hours logged. All
 * three of those are in the sources; the third and the second are the ones
 * usually left out.
 */
export const porQueFunciona: StaticPage = {
  id: 'por-que-funciona',
  slug: { es: 'por-que-funciona', en: 'why-this-works' },

  label: { es: '¿Por qué funciona esto?', en: 'Why any of this works' },
  lede: {
    es: 'Todas las técnicas de este sitio asumen lo mismo: que el cerebro cambia con lo que haces repetidamente. Vale la pena decir qué tan cierto es eso — y hasta dónde llega.',
    en: 'Every technique on this site assumes the same thing: that the brain is changed by what you repeatedly do. It is worth saying how true that is — and how far it goes.',
  },

  sections: [
    {
      heading: { es: 'El cerebro adulto sí cambia de forma', en: 'The adult brain does change shape' },
      body: {
        es: [
          'En 2004, un grupo de adultos pasó tres meses aprendiendo a hacer malabares. Cuando los escanearon, había más materia gris en las zonas que procesan movimiento visual. No es que se sintieran distintos: la estructura era medible.',
          'Un estudio posterior apretó el plazo. Los cambios ya se detectan a los siete días de empezar. No hacen falta meses para que algo se mueva.',
        ],
        en: [
          'In 2004 a group of adults spent three months learning to juggle. When they were scanned, there was more grey matter in the areas that process visual motion. Not that they felt different — the structure itself was measurable.',
          'A later study tightened the timeline. The changes show up after seven days of practice. It does not take months for something to move.',
        ],
      },
    },
    {
      heading: { es: 'Y se va si dejas de usarlo', en: 'And it fades if you stop' },
      body: {
        es: [
          'La parte que casi nunca se cuenta: cuando dejaron de practicar, el cambio retrocedió. Sólo se detecta mientras el entrenamiento sigue.',
          'Eso no es mala noticia. Es cómo tiene que funcionar un sistema que todavía necesita aprender cosas nuevas. Si todo lo aprendido se quedara grabado para siempre, no quedaría lugar para lo siguiente.',
          'También cambia qué significa "funcionó". Ninguna de estas técnicas es algo que se instala una vez. Son cosas que se usan.',
        ],
        en: [
          'The part that rarely gets told: when they stopped practising, the change receded. It is only detectable while the training continues.',
          'That is not bad news. It is how a system that still needs to learn new things has to work. If everything learned stayed etched in permanently, there would be no room for what comes next.',
          'It also changes what "it worked" means. None of these techniques is something you install once. They are things you use.',
        ],
      },
    },
    {
      heading: { es: 'Lo nuevo mueve más que lo repetido', en: 'New moves more than repeated' },
      body: {
        es: [
          'En ese mismo estudio, ni las horas de práctica ni qué tan bien les salía predecían el cambio estructural. Lo que lo predecía era estar aprendiendo algo que todavía no dominaban.',
          'Repetir algo que ya te sale lo mantiene. Pelearte con algo que aún no te sale es lo que mueve la estructura. Vale para los malabares y probablemente valga para notar que estás rumiando: la primera vez cuesta, y esa es la parte que cuenta.',
        ],
        en: [
          'In that same study, neither hours of practice nor how well they performed predicted the structural change. What predicted it was being in the middle of learning something they had not yet mastered.',
          'Repeating something you can already do maintains it. Wrestling with something you cannot yet do is what moves the structure. That holds for juggling, and it probably holds for catching yourself ruminating: the first time is hard, and that is the part that counts.',
        ],
      },
    },
    {
      heading: { es: 'Dónde está el límite de lo que se puede decir', en: 'Where the limit is' },
      body: {
        es: [
          'Aquí está el salto que este sitio no va a dar. Que hacer malabares engrose un área de movimiento visual no demuestra que un ejercicio de respiración "te reconfigure el cerebro". Son escalas distintas, métodos distintos y evidencias distintas.',
          'Lo que sí está medido, técnica por técnica, es que funcionan. Esa evidencia está citada al pie de cada página, no aquí. Esta página sólo explica por qué es razonable que la repetición importe.',
          'Y sirve como filtro. Si alguien te promete que su método reconfigura tu cerebro, pídele exactamente lo mismo que puedes pedirnos: el estudio, con nombre y año.',
        ],
        en: [
          'Here is the jump this site will not make. That juggling thickens a visual-motion area does not show that a breathing exercise "rewires your anxiety". Different scales, different methods, different evidence.',
          'What is measured, technique by technique, is that they work. That evidence is cited at the foot of each page, not here. This page only explains why it is reasonable that repetition matters at all.',
          'It also works as a filter. If someone promises you their method rewires your brain, ask them for exactly what you can ask us for: the study, with a name and a year.',
        ],
      },
    },
  ],

  sources: [
    {
      label:
        'Draganski, Gaser, Busch, Schuierer, Bogdahn & May (2004), Nature 427: 311–312 — Neuroplasticity: changes in grey matter induced by training',
      url: 'https://www.nature.com/articles/427311a',
    },
    {
      label:
        'Driemeyer, Boyke, Gaser, Büchel & May (2008), PLOS ONE 3(7): e2669 — Changes in gray matter induced by learning, revisited',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0002669',
    },
  ],

  seo: {
    title: {
      es: '¿Por qué funciona esto? La evidencia detrás de Cortex',
      en: 'Why any of this works: the evidence behind Cortex',
    },
    description: {
      es: 'El cerebro adulto cambia de forma con lo que practicas, y el cambio se va si paras. Qué está medido, qué no, y dónde está el límite.',
      en: 'The adult brain changes shape with what you practise, and the change fades if you stop. What is measured, what is not, and where the limit is.',
    },
  },
};

export const PAGES_RAW: readonly StaticPage[] = [porQueFunciona];
