/**
 * Crisis detection.
 *
 * Runs on the client BEFORE any network request, and again on the server
 * (client checks are trivially bypassable). If this returns true, the text is
 * never sent anywhere — the user gets verified helpline resources instead.
 *
 * Deliberately biased toward sensitivity. A false positive costs someone an AI
 * response they wanted, which is annoying. A false negative sends someone in
 * crisis to a chatbot. Those are not symmetric.
 *
 * This is a safety net, not a classifier. It catches explicit phrasing; it will
 * miss obliqueness, and the system prompt carries its own guardrails for that.
 */

/**
 * Common idioms that contain crisis-adjacent words but mean nothing of the
 * sort. Stripped before matching, so "me muero de risa" is ignored while
 * "me quiero morir" still fires.
 */
const IDIOMS: RegExp[] = [
  // Spanish
  /\bmuert[oa]s?\s+de\s+(risa|hambre|sue[ñn]o|miedo|frío|frio|calor|cansancio|amor)\b/gi,
  /\bme\s+muero\s+de\s+(risa|hambre|sue[ñn]o|miedo|frío|frio|calor|ganas|amor)\b/gi,
  /\bme\s+muero\s+por\b/gi,
  /\bmatar\s+el\s+tiempo\b/gi,
  /\bde\s+muerte\b/gi,

  // English
  /\bdying\s+to\b/gi,
  /\bdie\s+laughing\b/gi,
  /\bdead\s+tired\b/gi,
  /\bkill\s+time\b/gi,
  /\b(is|are|was|were|it'?s)\s+killing\s+me\b/gi,
  /\bto\s+die\s+for\b/gi,
];

const PATTERNS: RegExp[] = [
  // ── Spanish ───────────────────────────────────────────────────────────
  /\bsuicid/i, // suicidio, suicidarme, suicida
  /\bquitar(me|se|te)\s+la\s+vida\b/i,
  /\b(me\s+quiero|quiero|voy\s+a|pienso\s+en)\s+matar(me)?\b/i,
  /\bmatar(me)\b/i,
  /\bme\s+quiero\s+morir\b/i,
  /\b(quiero|ganas\s+de)\s+morir(me)?\b/i,
  /\bno\s+quiero\s+(seguir\s+)?(vivir|viviendo)\b/i,
  /\bno\s+quiero\s+seguir\s+(aqu[íi]|viv)/i,
  /\bmejor\s+(estar[íi]a|ser[íi]a)\s+muert[oa]\b/i,
  /\b(acabar|terminar)\s+con\s+(todo|mi\s+vida)\b/i,
  /\b(hacerme|lastimarme|herirme)\s+da[ñn]o\b/i,
  /\bhacerme\s+da[ñn]o\b/i,
  /\bautolesi/i,
  /\bcortarme\b/i,
  /\bdesaparecer\s+para\s+siempre\b/i,
  /\bya\s+no\s+quiero\s+estar\s+(aqu[íi]|vivo|viva)\b/i,

  // ── English ───────────────────────────────────────────────────────────
  /\bsuicid/i, // suicide, suicidal
  /\bkill(ing)?\s+my\s?self\b/i,
  /\bend\s+(my\s+life|it\s+all)\b/i,
  /\btake\s+my\s+own\s+life\b/i,
  /\b(don'?t|do\s+not)\s+want\s+to\s+(live|be\s+here|exist)\b/i,
  /\bwant\s+to\s+die\b/i,
  /\bbetter\s+off\s+dead\b/i,
  /\bno\s+reason\s+to\s+live\b/i,
  // t?ing covers hurting / harming AND cutting (doubled consonant).
  /\b(hurt|harm|cut)(t?ing)?\s+my\s?self\b/i,
  /\bself[-\s]?harm/i,
  /\bwish\s+I\s+(was|were)\s+dead\b/i,
];

export function detectCrisis(input: string): boolean {
  if (!input) return false;

  // Normalise so accent-stripped or oddly-spaced input still matches.
  const cleaned = input
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .toLowerCase();

  const withoutIdioms = IDIOMS.reduce((acc, idiom) => acc.replace(idiom, ' '), cleaned);

  return PATTERNS.some((pattern) => pattern.test(withoutIdioms));
}
