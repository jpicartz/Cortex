import { describe, expect, it } from 'vitest';

import { PAGES, STATES } from './index';

/**
 * The fast, offline half of source integrity.
 *
 * This catches shape problems — a malformed URL, http instead of https, the same
 * citation quietly pasted into two states. It deliberately does NOT catch the
 * failure that actually happened twice on this project: a perfectly well-formed
 * PubMed id that resolved to an unrelated paper on macular degeneration, and a
 * Harvard University Press URL for a book HarperCollins publishes.
 *
 * Only fetching catches those, which is what `npm run check:sources` is for.
 * That one is kept out of the test run so network flake cannot fail a build that
 * has nothing to do with citations.
 */
describe('citation sources', () => {
  // Prose pages carry citations too, and were invisible here until they did.
  const all = [...STATES, ...PAGES].flatMap((item) =>
    item.sources.map((source) => ({ state: item.id, ...source })),
  );

  it('every state and page cites at least two sources', () => {
    for (const item of [...STATES, ...PAGES]) {
      expect(item.sources.length, `${item.id} has too few sources`).toBeGreaterThanOrEqual(2);
    }
  });

  it('every url parses and is https', () => {
    for (const source of all) {
      const url = (() => {
        try {
          return new URL(source.url);
        } catch {
          return null;
        }
      })();

      expect(url, `${source.state}: unparseable url ${source.url}`).not.toBeNull();
      expect(url?.protocol, `${source.state}: ${source.url} is not https`).toBe('https:');
    }
  });

  it('every label names something checkable', () => {
    // A bare "Study" or "Research" tells a reader nothing and cannot be verified.
    for (const source of all) {
      expect(source.label.length, `${source.state}: label too vague`).toBeGreaterThan(20);
    }
  });

  it('no url is reused across different states', () => {
    /*
      Reuse within one state would be a duplicate; reuse across states is usually
      a copy-paste that carried the wrong citation with it. Lieberman's affect
      labelling paper is the deliberate exception, cited by both enojo and
      ansiedad because both techniques rest on it.

      A Huberman Lab episode used to sit in this list too, shared by
      desmotivacion and procrastinacion. That exemption was the smell: one
      podcast standing in for the primary literature on two different pages.
      Both now cite papers, and leaving the entry here would quietly permit the
      duplicate coming back.
      */
    const ALLOWED_SHARED = new Set([
      'https://journals.sagepub.com/doi/10.1111/j.1467-9280.2007.01916.x',
      'https://www.nature.com/articles/nrn.2015.26',
    ]);

    const seen = new Map<string, string>();
    for (const source of all) {
      if (ALLOWED_SHARED.has(source.url)) continue;
      const previous = seen.get(source.url);
      expect(previous, `${source.url} cited by both ${previous} and ${source.state}`).toBeUndefined();
      seen.set(source.url, source.state);
    }
  });
});
