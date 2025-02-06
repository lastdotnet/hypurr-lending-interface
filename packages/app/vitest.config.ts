import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/integration/setup.ts'],
    globals: true,
    env: {
      ...config({ path: './.env' }).parsed,
    },
    alias: {
      '@': '/src',
      '@storybook': '/.storybook',
    },
  },
})
