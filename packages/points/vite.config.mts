/// <reference types="vitest" />
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

export default () => {
  process.env = {
    NEXT_PUBLIC_ALCHEMY_ID: '',
    NEXT_PUBLIC_CENTER_API_KEY: '',
    NEXT_PUBLIC_INFURA_ID: '',
    NEXT_PUBLIC_SIMPLEHASH_API_KEY: '',
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: '',
    ...process.env,
  };
  return defineConfig({
    // TODO solve the type issues with vite. The tests run fine though
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    plugins: [tsconfigPaths()],
    resolve: {
      alias: [
        { find: 'sdk', replacement: resolve(__dirname, '../../packages/sdk') },
      ],
    },
    test: {
      environment: 'node',
      exclude: [...configDefaults.exclude, 'e2e'],
      globals: true,
    },
  });
};
