import type { Lang } from '@/content/schema';

/**
 * Every piece of chrome text, in both languages.
 *
 * Deliberately a plain typed object rather than an i18n library: there are two
 * languages, no pluralisation rules to speak of, and no runtime locale
 * negotiation — the language is in the URL. A library would add a dependency
 * and a build step to solve problems this app does not have.
 *
 * Spanish is written natively, not translated from the English.
 *
 * A few strings carry counts — how many regions the atlas holds, how many
 * states triage is choosing between. Those are written as `{n}` placeholders
 * and filled from the parsed content at render, because adding one state used
 * to leave five sentences quietly claiming the old number.
 */
export const UI = {
  siteName: { es: 'Cortex', en: 'Cortex' },
  tagline: {
    es: 'Entiende tu cerebro. Cambia cómo te sientes.',
    en: 'Understand your brain. Change how you feel.',
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  heroLine: {
    es: 'Lo que sientes tiene un mecanismo.',
    en: 'What you feel has a mechanism.',
  },
  heroSupport: {
    es: 'No estás roto y no es falta de voluntad. Entiende qué está haciendo tu cerebro ahora mismo, y qué hacer para cambiarlo en los próximos cinco minutos.',
    en: 'You are not broken and it is not a lack of willpower. Understand what your brain is doing right now, and what to do about it in the next five minutes.',
  },

  // ── Menu ────────────────────────────────────────────────────────────────
  menuHeading: { es: '¿Cómo te sientes?', en: 'How are you feeling?' },
  menuHelp: {
    es: 'Elige lo que más se parezca a lo que traes ahora. Puedes cambiar después.',
    en: 'Pick whatever is closest to what you have right now. You can change later.',
  },

  // ── Detail sections ─────────────────────────────────────────────────────
  sectionFeel: { es: 'Lo que estás sintiendo', en: 'What you are feeling' },
  sectionUnderstand: {
    es: 'Lo que está pasando en tu cerebro',
    en: 'What is happening in your brain',
  },
  sectionFix: { es: 'Qué puedes hacer ahora', en: 'What you can do now' },
  sectionSources: { es: 'De dónde sale esto', en: 'Where this comes from' },
  backToMenu: { es: 'Todas las emociones', en: 'All feelings' },

  // ── Brain diagram ───────────────────────────────────────────────────────
  diagramLabel: { es: 'Quién participa', en: 'Who is involved' },
  diagramPlay: { es: 'Ver una por una', en: 'Step through' },
  diagramReplay: { es: 'Repetir', en: 'Replay' },
  /** Marks the parts that are processes, not places. */
  diagramConcept: { es: '· proceso', en: '· process' },
  diagramCaption: {
    es: 'Esquema, no una ilustración médica. Las estructuras aparecen donde están; los procesos no tienen lugar y por eso solo se nombran.',
    en: 'A schematic, not a medical illustration. Structures appear where they are; processes have no location, so they are only named.',
  },
  /**
   * Shown instead of the diagram when nothing here is a place. Drawing a brain
   * with no region lit would imply we had somewhere to point and chose not to.
   */
  diagramNoAnatomy: {
    es: 'Aquí no hay una zona que señalar: lo que participa son procesos, no lugares del cerebro.',
    en: 'There is no region to point at here — what is involved are processes, not places in the brain.',
  },

  /**
   * The divider above the positive states.
   *
   * Phrased as a condition rather than an invitation ("or things are actually
   * good" rather than "feeling great?") so that someone scrolling past it in a
   * bad moment is not being cheerfully addressed by a page they came to for
   * help.
   */
  /*
    Reframed when grit joined this band. "Or things are actually good" could not
    cover a state whose own blurb is "everything says stop" — but these four do
    share something real: they are capacities you are trying to hold, not
    distress you are trying to remove. That is the band, and it always was.
  */
  menuGoodBand: {
    es: 'O estás intentando que algo salga bien',
    en: 'Or you are trying to make something work',
  },
  menuGoodBandHelp: {
    es: 'Estos no son problemas que quitar: son cosas que quieres sostener. Es más fácil volver a algo cuando sabes cómo llegaste.',
    en: 'These are not problems to remove — they are things you want to hold onto. It is easier to get back to something when you know how you got there.',
  },

  // ── The graph ───────────────────────────────────────────────────────────
  relatedHeading: { es: 'Corre en las mismas partes', en: 'Runs on the same parts' },
  /** Naming the shared region is the point; "related" alone is a content farm. */
  relatedVia: { es: 'Comparten', en: 'Shares' },
  /*
    A separate heading for the islands. "Corre en las mismas partes" over "this
    one shares no parts" is a section arguing with itself.
  */
  relatedHeadingAlone: { es: 'El resto del cerebro', en: 'The rest of the brain' },
  relatedNoneShared: {
    es: 'Ningún otro estado corre en estas mismas partes.',
    en: 'No other state runs on these same parts.',
  },
  relatedNoPlace: {
    es: 'Este estado se explica por procesos, no por una zona concreta del cerebro.',
    en: 'This one is explained by processes, not by a particular place in the brain.',
  },
  relatedAtlas: {
    es: 'Ver todas las partes en el atlas',
    en: 'See every part in the atlas',
  },
  oneTrueThingLabel: { es: 'Un dato', en: 'One more thing' },
  oneTrueThingVia: { es: 'De', en: 'From' },
  atlasTitle: { es: 'El atlas', en: 'The atlas' },
  atlasHeadline: {
    es: 'Las mismas partes, en distintos estados',
    en: 'The same parts, in different states',
  },
  atlasIntro: {
    es: '{regions} partes, {states} estados. Toca una zona para ver qué hace y en qué estados aparece.',
    en: '{regions} parts, {states} states. Tap a region to see what it does and where it shows up.',
  },
  atlasPick: { es: 'Todas las partes', en: 'Every part' },
  atlasAppearsIn: { es: 'Aparece en', en: 'Shows up in' },
  atlasLink: { es: 'Ver el atlas', en: 'Explore the atlas' },

  skipToContent: { es: 'Saltar al contenido', en: 'Skip to content' },

  // ── Triage ──────────────────────────────────────────────────────────────
  triageEyebrow: { es: 'Ahora mismo', en: 'Right now' },
  /**
   * Explicit permission to answer loosely. The questions ask where a feeling
   * sits, not what it is called, and someone who is not sure needs telling that
   * an imprecise answer is fine — otherwise the flow becomes one more thing to
   * get right.
   */
  triageHelp: {
    es: 'No hay respuesta incorrecta. Puedes cambiarla después.',
    en: 'There is no wrong answer. You can change it after.',
  },
  triageBack: { es: '← Antes', en: '← Back' },
  triageResult: { es: 'Lo más parecido', en: 'Closest match' },
  /**
   * The honesty line, and the most carefully weighed sentence in the app.
   *
   * Cortex's own disclaimer says it does not diagnose. Naming someone's state in
   * two taps is precisely where that promise gets tested, so this says plainly
   * that it is a nearest match out of thirteen and that being wrong is expected
   * and cheap to correct.
   */
  triageDisclaimer: {
    es: 'Esto no es un diagnóstico: es lo más cercano de {states}. Si no le atina, elige otra y ya.',
    en: 'This is not a diagnosis — it is the nearest of {states}. If it is not right, just pick another.',
  },
  triageGo: { es: 'Llévame ahí', en: 'Take me there' },
  triageNotIt: { es: 'No es eso', en: 'That is not it' },

  // ── The fast path ───────────────────────────────────────────────────────
  /**
   * Shown above everything else on a state page.
   *
   * The first technique used to sit 4,010px down — past the whole mechanism —
   * which meant someone mid-panic had to read four screens of neuroscience
   * before reaching anything that would help. The wording has to give explicit
   * permission to skip the rest, or the page still reads as homework.
   */
  startHere: { es: 'Empieza aquí', en: 'Start here' },
  startHereHelp: {
    es: 'Si lo que quieres es bajarle ahora mismo, haz esto y ya. Lo de abajo puede esperar a que estés mejor.',
    en: 'If you just need this to come down right now, do this and nothing else. The rest can wait until you are steadier.',
  },
  /*
    The `good` band needs its own line. "Until you are steadier" assumes the
    reader is trying to bring something down, which is wrong for all four of
    these — nobody reading about flow or grit is waiting to feel better first.
  */
  startHereHelpGood: {
    es: 'Si solo quieres hacer algo ya, empieza por aquí. Lo de abajo explica por qué funciona.',
    en: 'If you just want to do something now, start here. What follows explains why it works.',
  },

  // ── Techniques ──────────────────────────────────────────────────────────
  whyItWorks: { es: 'Por qué funciona', en: 'Why it works' },
  theSteps: { es: 'Los pasos', en: 'The steps' },
  practiceHere: { es: 'Hazlo aquí', en: 'Do it here' },

  // ── Tools ───────────────────────────────────────────────────────────────
  start: { es: 'Empezar', en: 'Start' },
  pause: { es: 'Pausar', en: 'Pause' },
  resume: { es: 'Seguir', en: 'Resume' },
  reset: { es: 'Reiniciar', en: 'Reset' },
  done: { es: 'Listo', en: 'Done' },
  inhale: { es: 'Inhala', en: 'Breathe in' },
  inhaleAgain: { es: 'Otra vez, corto', en: 'Again, short' },
  exhale: { es: 'Exhala', en: 'Breathe out' },
  hold: { es: 'Sostén', en: 'Hold' },
  cyclesLeft: { es: 'ciclos', en: 'cycles' },
  timerFinished: { es: 'Terminaste', en: 'You finished' },
  breathFinished: {
    es: 'Listo. Nota cómo está tu cuerpo ahora.',
    en: 'Done. Notice how your body is now.',
  },

  // BrainDump is deliberately ephemeral — this is stated in the UI, not just
  // implemented quietly, because the promise is the point.
  brainDumpPrivacy: {
    es: 'Esto no se guarda ni se envía a ningún lado. Al cerrar, desaparece.',
    en: 'This is not saved or sent anywhere. When you close it, it is gone.',
  },
  brainDumpCount: { es: 'cosas fuera de tu cabeza', en: 'things out of your head' },
  clear: { es: 'Borrar', en: 'Clear' },

  // ── Toggles ─────────────────────────────────────────────────────────────
  switchToDark: { es: 'Modo oscuro', en: 'Dark mode' },
  switchToLight: { es: 'Modo claro', en: 'Light mode' },
  switchLanguage: { es: 'English', en: 'Español' },
  switchLanguageLabel: { es: 'Cambiar a inglés', en: 'Switch to Spanish' },

  // ── AI coach ────────────────────────────────────────────────────────────
  coachHeading: { es: 'Cuéntame qué está pasando', en: "Tell me what's going on" },
  coachHelp: {
    es: 'Opcional. Describe tu situación y te explico cómo aplicar esto a tu caso concreto.',
    en: 'Optional. Describe your situation and I will show you how to apply this to your specific case.',
  },
  coachPlaceholder: {
    es: 'Por ejemplo: tengo que entregar algo mañana y llevo tres horas sin poder empezar…',
    en: 'For example: I have a deadline tomorrow and I have spent three hours unable to start…',
  },
  coachSubmit: { es: 'Aplicar a mi caso', en: 'Apply to my case' },
  coachThinking: { es: 'Pensando…', en: 'Thinking…' },
  coachAgain: { es: 'Probar otra vez', en: 'Try again' },
  coachDisclaimer: {
    es: 'Respuesta generada por IA. Puede equivocarse y no sustituye a un profesional.',
    en: 'AI-generated response. It can be wrong and does not replace a professional.',
  },
  coachTooShort: {
    es: 'Escribe un poco más para que pueda ayudarte.',
    en: 'Write a bit more so I can actually help.',
  },
  coachError: {
    es: 'No pude responder ahora mismo. Tu texto sigue aquí; intenta de nuevo.',
    en: 'I could not answer just now. Your text is still here — try again.',
  },
  coachBusy: {
    es: 'Hay mucha demanda en este momento. Espera un poco e intenta otra vez.',
    en: 'There is a lot of demand right now. Wait a moment and try again.',
  },

  // ── Safety ──────────────────────────────────────────────────────────────
  disclaimerShort: {
    es: 'Contenido educativo. No es terapia ni consejo médico.',
    en: 'Educational content. Not therapy, not medical advice.',
  },
  disclaimerLong: {
    es: 'Cortex explica mecanismos de neurociencia en lenguaje simple y propone técnicas de autorregulación. No es un tratamiento, no hace diagnósticos y no sustituye la atención de un profesional de salud mental. Si lo que sientes te está afectando la vida diaria, busca ayuda profesional.',
    en: 'Cortex explains neuroscience mechanisms in plain language and offers self-regulation techniques. It is not treatment, it does not diagnose, and it does not replace care from a mental health professional. If what you are feeling is affecting your daily life, seek professional help.',
  },
  privacyNote: {
    es: 'No hay cuentas ni seguimiento. Lo único que se guarda en tu dispositivo es tu idioma y tu tema.',
    en: 'No accounts, no tracking. The only things stored on your device are your language and theme.',
  },

  crisisHeading: {
    es: 'Esto es más de lo que esta app puede acompañar',
    en: 'This is more than this app can hold',
  },
  crisisBody: {
    es: 'Lo que escribiste suena a que la estás pasando muy mal. No enviamos tu mensaje a ningún lado. Habla con una persona ahora mismo: hay líneas gratuitas, confidenciales y disponibles a toda hora.',
    en: 'What you wrote sounds like you are going through something very hard. We did not send your message anywhere. Please talk to a person right now — these lines are free, confidential and open at any hour.',
  },
  crisisEmergency: {
    es: 'Si estás en peligro inmediato, llama a los servicios de emergencia de tu país.',
    en: 'If you are in immediate danger, call your local emergency services.',
  },
  crisisBack: { es: 'Volver', en: 'Go back' },

  // ── Footer ──────────────────────────────────────────────────────────────
  footerSources: { es: 'Fuentes', en: 'Sources' },
} as const satisfies Record<string, Record<Lang, string>>;

export type UIKey = keyof typeof UI;

/** `t(lang)` gives you a resolver bound to one language. */
export function t(lang: Lang) {
  return (key: UIKey): string => UI[key][lang];
}

/**
 * Fill `{name}` placeholders in a UI string.
 *
 * Deliberately not a formatting library: two languages, no plural rules, and
 * the only variables are integer counts derived from the parsed content.
 */
export function fill(template: string, values: Record<string, number | string>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in values ? String(values[key]) : whole,
  );
}
