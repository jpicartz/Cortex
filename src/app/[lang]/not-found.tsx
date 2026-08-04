import Link from 'next/link';

/**
 * Shown when a language is valid but the slug isn't — the realistic case is a
 * shared link with a typo, or an old URL after a slug change.
 *
 * This renders inside the [lang] layout, but Next does not give a not-found
 * boundary the route params, so there is no reliable `lang` here. Rather than
 * guess and get it wrong half the time, both languages are shown: whichever
 * one the visitor reads, one line speaks to them.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl flex-col justify-center px-5 py-20">
      <p className="font-display text-6xl leading-none tracking-tight text-fg-mute">404</p>

      <h1 className="mt-6 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-2 max-w-prose text-lg leading-relaxed text-fg-soft">
        Puede que el enlace esté mal escrito o que la página haya cambiado de nombre.
      </p>

      <p className="mt-6 text-base leading-relaxed text-fg-mute">
        <span className="font-medium text-fg-soft">This page doesn&rsquo;t exist.</span>{' '}
        The link may be mistyped, or the page may have been renamed.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/es" className="btn-accent">
          Ver todas las emociones
        </Link>
        <Link href="/en" className="btn-quiet">
          See all feelings
        </Link>
      </div>
    </div>
  );
}
