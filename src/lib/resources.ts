/**
 * Crisis resources.
 *
 * Every entry here was verified against its official source while building
 * this, not written from memory — wrong numbers are the worst possible bug in
 * this app. Re-verify before each release.
 *
 * Verified 2026-08-02:
 *  - Línea de la Vida — gob.mx / CONASAMA (Secretaría de Salud), 24/7
 *  - SAPTEL — saptel.org.mx, 24/7, free
 *  - 988 Suicide & Crisis Lifeline — SAMHSA / FCC, call or text, 24/7
 *  - Find A Helpline — ThroughLine, 130+ countries, IASP partner
 */
export type CrisisResource = {
  region: { es: string; en: string };
  name: string;
  /** Display form. */
  contact: string;
  /** tel: / https: target. */
  href: string;
  note: { es: string; en: string };
};

export const CRISIS_RESOURCES: CrisisResource[] = [
  {
    region: { es: 'México', en: 'Mexico' },
    name: 'Línea de la Vida',
    contact: '800 911 2000',
    href: 'tel:8009112000',
    note: {
      es: 'Gratuita, confidencial, 24 horas todos los días.',
      en: 'Free, confidential, 24 hours every day.',
    },
  },
  {
    region: { es: 'México', en: 'Mexico' },
    name: 'SAPTEL',
    contact: '55 5259 8121',
    href: 'tel:5552598121',
    note: {
      es: 'Intervención en crisis por teléfono, gratuita, 24 horas.',
      en: 'Telephone crisis intervention, free, 24 hours.',
    },
  },
  {
    region: { es: 'Estados Unidos', en: 'United States' },
    name: '988 Suicide & Crisis Lifeline',
    contact: '988',
    href: 'tel:988',
    note: {
      es: 'Llamada o mensaje de texto al 988. Gratuita, 24 horas.',
      en: 'Call or text 988. Free, 24 hours.',
    },
  },
  {
    region: { es: 'Resto del mundo', en: 'Rest of the world' },
    name: 'Find A Helpline',
    contact: 'findahelpline.com',
    href: 'https://findahelpline.com',
    note: {
      es: 'Directorio de líneas de ayuda verificadas en más de 130 países.',
      en: 'Directory of verified helplines in over 130 countries.',
    },
  },
];
