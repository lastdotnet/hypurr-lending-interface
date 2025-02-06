import path, { join } from 'node:path'
import type { StorybookConfig } from '@storybook/nextjs'
import dotenv from 'dotenv'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes',
    '@chromatic-com/storybook',
    '@storybook/addon-webpack5-compiler-swc',
  ],

  swc: (config) => {
    return {
      ...config,
      jsc: {
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
        experimental: {
          plugins: [['@lingui/swc-plugin', {}]],
        },
      },
    }
  },

  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.mjs'),
      builder: {
        useSWC: true,
      },
    },
  },

  docs: {},

  env: () => {
    const env = dotenv.config({ path: join(__dirname, '../.env.storybook') })
    if (env.error) {
      throw env.error
    }
    return env.parsed!
  },

  webpackFinal: async (config) => {
    config?.module?.rules?.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader',
      },
    })

    config.externals = ['pino-pretty', 'lokijs', 'encoding']

    if (config?.resolve?.fallback) {
      config.resolve.fallback = { fs: false, module: false }
    }

    return config
  },
}
export default config

// This addon can cause random Chrome crashes ("Snap!" errors) but works well in production.
// We need it to be able to force components into desired states for screenshots
if (process.env.NODE_ENV === 'production') {
  config.addons!.push('storybook-addon-pseudo-states')
}
