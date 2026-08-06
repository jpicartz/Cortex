/**
 * The canonical absolute origin, for anything that must emit full URLs:
 * sitemap entries, robots, and OG/canonical metadata.
 *
 * Resolution order matters. `VERCEL_PROJECT_PRODUCTION_URL` is always the
 * production domain even when the current build is a preview deployment —
 * which is what we want, because a preview must never publish a sitemap or a
 * canonical pointing at itself and compete with production in search results.
 */
export function siteUrl(): string {
  const explicit = process.env.SITE_ORIGIN?.trim().replace(/\/+$/, '');
  if (explicit) return explicit;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;

  return 'http://localhost:3100';
}

/** True only for the real production deployment. */
export function isProductionDeploy(): boolean {
  return process.env.VERCEL_ENV === 'production' || Boolean(process.env.SITE_ORIGIN);
}
