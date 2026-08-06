import type { MetadataRoute } from 'next';

import { STATES, LANGS } from '@/content';
import { siteUrl } from '@/lib/siteUrl';

/**
 * Every localised URL, with its counterpart declared as an alternate.
 *
 * This is the payoff for choosing Next over Vite: 20 statically generated
 * pages that answer real search queries are worthless if nothing tells a
 * crawler they exist. Each entry carries es/en/x-default alternates so Google
 * treats the two language versions as one page in two languages rather than
 * as duplicates competing with each other.
 *
 * x-default points at Spanish deliberately — it is the primary voice here, and
 * it is what someone arriving from an unmatched locale should land on.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  const languagesFor = (path: (lang: (typeof LANGS)[number]) => string) => ({
    es: `${base}${path('es')}`,
    en: `${base}${path('en')}`,
    'x-default': `${base}${path('es')}`,
  });

  const menus: MetadataRoute.Sitemap = LANGS.map((lang) => ({
    url: `${base}/${lang}`,
    changeFrequency: 'monthly',
    // The menu is the entry point and the most link-worthy page.
    priority: 1,
    alternates: { languages: languagesFor((l) => `/${l}`) },
  }));

  const states: MetadataRoute.Sitemap = STATES.flatMap((state) =>
    LANGS.map((lang) => ({
      url: `${base}/${lang}/${state.slug[lang]}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: languagesFor((l) => `/${l}/${state.slug[l]}`) },
    })),
  );

  return [...menus, ...states];
}
