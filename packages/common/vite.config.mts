/// <reference types="vitest" />
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default () =>
  defineConfig({
    // TODO solve the type issues with vite. The tests run fine though
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plugins: [tsconfigPaths()],
    test: {
      environment: 'node',
      globals: true,
    },
  });
