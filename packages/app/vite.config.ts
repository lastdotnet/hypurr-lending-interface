import { execSync } from 'node:child_process'
import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

const buildSha = execSync('git rev-parse --short HEAD').toString().trimEnd()
const buildTime = new Date().toLocaleString('en-gb')

export default defineConfig({
  define: {
    __BUILD_SHA__: JSON.stringify(buildSha),
    __BUILD_TIME__: JSON.stringify(buildTime),
  },

  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {}]],
    }),
    tsconfigPaths(),
    lingui(),
    svgr(),
  ],

  server: {
    proxy: {
      '/api': {
        target: '/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/ba-api': {
        target: '/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ba-api/, ''),
      },
      '/info-sky-api': {
        target: '/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/info-sky-api/, ''),
      },
      '/claim-with-gas': {
        target: 'https://faucet-ashy.vercel.app/claim-with-gas/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/claim-with-gas/, ''),
      },
      '/verify-follow': {
        target: 'https://faucet-ashy.vercel.app/verify-follow/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/verify-follow/, ''),
      },
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/integration/setup.ts'],
    globals: true,
  },

  build: {
    sourcemap: true,
  },
})
