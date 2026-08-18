import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    /*
      `*.live.test.ts` is excluded from the default run on purpose.

      Those tests reach the network — currently the citation checker, which
      fetches every source URL. A citation check that fails a build because a
      publisher had a bad minute gets switched off within a week, so it stays out
      of `npm test` and runs as `npm run check:sources` before a release instead.
    */
    exclude: ['**/node_modules/**', '**/.claude/**', '**/*.live.test.ts'],
  },
});
