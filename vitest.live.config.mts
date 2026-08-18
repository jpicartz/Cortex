import { defineConfig } from 'vitest/config';

/**
 * Config for the network-backed checks only.
 *
 * The default config excludes `*.live.test.ts` so `npm test` never reaches the
 * network. This one includes exactly those files, which is cleaner than trying
 * to out-argue the default config from the command line.
 */
export default defineConfig({
  test: {
    include: ['src/**/*.live.test.ts'],
    testTimeout: 30_000,
  },
});
