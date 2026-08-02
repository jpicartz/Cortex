import type { Lang } from '@/content/schema';

/**
 * The entire persisted state of this app.
 *
 * There is no mood tracking, no history, no account — so nothing here is
 * personal or sensitive, and there is nothing to leak. That is a deliberate
 * product decision, not an oversight, and it is stated in the footer.
 */
export type Prefs = {
  theme?: 'light' | 'dark';
  lang?: Lang;
};

const KEY = 'cortexPrefs';

export function readPrefs(): Prefs {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};

    // Validate rather than trust: a corrupted or hand-edited value should
    // degrade to defaults, not throw on every render.
    const { theme, lang } = parsed as Record<string, unknown>;
    return {
      theme: theme === 'light' || theme === 'dark' ? theme : undefined,
      lang: lang === 'es' || lang === 'en' ? lang : undefined,
    };
  } catch {
    return {};
  }
}

export function writePrefs(prefs: Prefs): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // Private browsing or a full quota. Losing a theme preference is not
    // worth breaking the page over.
  }
}
