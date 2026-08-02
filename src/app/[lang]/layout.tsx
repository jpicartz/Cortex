import type { Metadata } from 'next';
import { Newsreader, Hanken_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';

import '../globals.css';
import { LANGS, isLang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

/**
 * This is the ROOT layout. There is deliberately no `app/layout.tsx`: every
 * route lives under a language segment, so the topmost layout is this one —
 * which is what lets `<html lang>` be correct per language instead of
 * hardcoded. `/` is redirected to a language by `src/proxy.ts`.
 */

/* Serif for reading, grotesque for UI. Neither is a default-feeling face. */
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  return {
    title: {
      default: `${UI.siteName[lang]} — ${UI.tagline[lang]}`,
      template: `%s · ${UI.siteName[lang]}`,
    },
    description: UI.tagline[lang],
    applicationName: UI.siteName[lang],
    alternates: {
      languages: { es: '/es', en: '/en' },
    },
    openGraph: {
      type: 'website',
      siteName: UI.siteName[lang],
      locale: lang === 'es' ? 'es_MX' : 'en_US',
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Applies the stored theme before first paint. Without this the page renders
 * light and then snaps to dark, which is a genuinely unpleasant thing to do to
 * someone opening this app at 2am.
 */
const THEME_SCRIPT = `
(function(){
  try {
    var stored = localStorage.getItem('cortexPrefs');
    var theme = stored ? JSON.parse(stored).theme : null;
    if (theme !== 'light' && theme !== 'dark') {
      theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang} className={`${newsreader.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <meta name="theme-color" content="#f7f6f3" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0d1120" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="font-sans min-h-dvh flex flex-col bg-page text-fg">
        <SiteHeader lang={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
