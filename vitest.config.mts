import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  /*
    The `@/` alias mirrors tsconfig's paths. The existing tests all used relative
    imports and never needed it; the coach route test imports the route, and the
    route imports `@/content`, so vitest has to resolve it the same way Next does.
  */
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
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
