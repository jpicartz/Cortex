import type { MetadataRoute } from 'next';

import { siteUrl, isProductionDeploy } from '@/lib/siteUrl';

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();

  /**
   * Preview deployments must not be indexed. Vercel gives every branch and
   * every commit its own public URL, and without this each one becomes a
   * duplicate of the real site competing with it in search results.
   */
  if (!isProductionDeploy()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The coach endpoint handles what someone typed about their mental
      // state. It should never be crawled, cached or surfaced.
      disallow: '/api/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
