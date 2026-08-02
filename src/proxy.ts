import { NextResponse, type NextRequest } from 'next/server';
import { LANGS } from '@/content/schema';

/**
 * Next 16 renamed the `middleware` file convention to `proxy`; `middleware.ts`
 * still works but logs a deprecation warning at build.
 *
 * This runs on `/` only (see `config.matcher`) and sends people to a language.
 * Every real page lives under /es or /en so that each one has a stable,
 * indexable URL — there is no language-less version of the content.
 */
export function proxy(request: NextRequest) {
  const header = request.headers.get('accept-language') ?? '';

  // Parse "es-MX,es;q=0.9,en;q=0.8" into base tags ordered by q-value.
  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return {
        base: tag.trim().split('-')[0].toLowerCase(),
        q: q ? Number.parseFloat(q.split('=')[1]) || 0 : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  // Spanish is the default: this app is written for a Spanish-speaking
  // audience first, and English is the translation.
  const match = preferred.find((p) => (LANGS as readonly string[]).includes(p.base));
  const lang = match?.base ?? 'es';

  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = {
  matcher: ['/'],
};
