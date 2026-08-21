import { describe, expect, it } from 'vitest';

import { PAGES, STATES } from './index';

/**
 * Fetches every citation and fails on anything that does not resolve.
 *
 * This exists because of a specific, repeated failure: citations written from
 * memory that were perfectly well-formed and pointed at the wrong thing. One
 * PubMed id resolved to a paper on macular degeneration in place of a
 * behavioural activation meta-analysis; one Harvard University Press URL was
 * invented for a book HarperCollins publishes. The schema check in
 * `sources.test.ts` passes both. Only a request catches them.
 *
 * Excluded from `npm test` by the `*.live.test.ts` rule in `vitest.config.ts`,
 * because it needs the network. Run it before a release:
 *
 *   npm run check:sources
 */

/**
 * Hosts that answer real browsers and refuse automated requests.
 *
 * Deliberately short. Every entry is a URL this can no longer verify, so a long
 * list turns the check into theatre — the point is knowing which citations are
 * actually confirmed, not reaching a green tick.
 */
const BOT_BLOCKED = new Set([
  /*
    Added 2026-08-20. This host was verifiable the day before — the citation did
    not change, the host did. It now answers automated requests with a "Human
    Verification" interstitial (HTTP 405). Worth knowing that this list grows by
    the world moving, not only by citations being chosen badly.
  */
  'dash.harvard.edu',
  'doi.org', // 403s non-browser requests; resolves fine for readers
  'academic.oup.com', // Cloudflare bot gate
  'onlinelibrary.wiley.com',
  'psycnet.apa.org',
  'www.science.org',
  'www.cambridge.org',
  'journals.sagepub.com',
  'www.cell.com',
  'pubsonline.informs.org',
]);

/*
  States AND prose pages. The page type was added with two citations and the
  count here did not move, which is exactly the silent gap this file exists to
  close — anything carrying a `sources` array has to be walked, not just the
  content type that happened to exist when the check was written.
*/
const sources = [...STATES, ...PAGES].flatMap((item) =>
  item.sources.map((source) => ({ owner: item.id, ...source })),
);

describe('citations resolve', () => {
  const checked = sources.filter((s) => !BOT_BLOCKED.has(new URL(s.url).hostname));
  const skipped = sources.length - checked.length;

  it(`reports how many are actually verifiable (${checked.length} of ${sources.length})`, () => {
    // Not an assertion so much as a visible number: if the allowlist ever grows
    // to swallow most of the list, this line is where that becomes obvious.
    expect(skipped).toBeLessThan(sources.length / 2);
  });

  it.each(checked.map((s) => [`${s.owner} · ${s.url}`, s.url] as const))(
    'resolves %s',
    async (_label, url) => {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': 'Mozilla/5.0 (cortex citation check)' },
      });
      expect(response.status, `${url} returned ${response.status}`).toBeLessThan(400);
    },
  );
});
