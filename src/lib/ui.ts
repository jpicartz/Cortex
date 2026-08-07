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
