'use client';

import { useEffect, useState } from 'react';
import type { Lang } from '@/content/schema';
import { UI } from '@/lib/ui';
import { readPrefs, writePrefs } from '@/lib/prefs';

export function ThemeToggle({ lang }: { lang: Lang }) {
  // Starts undefined so the first render matches the server markup; the real
  // value is read after mount. The inline script in the layout has already
  // applied the correct class, so there is nothing to flash.
  const [dark, setDark] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    writePrefs({ ...readPrefs(), theme: next ? 'dark' : 'light' });
    setDark(next);
  }

  const label = dark ? UI.switchToLight[lang] : UI.switchToDark[lang];

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full text-fg-soft transition-colors hover:bg-raised hover:text-fg"
    >
      {/* Both glyphs render; CSS picks one, so this is correct before hydration. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-5 dark:hidden"
        aria-hidden="true"
      >
        <path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a6.8 6.8 0 0 0 9.5 9.5Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="hidden size-5 dark:block"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    </button>
  );
}
