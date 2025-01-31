import withImages from 'next-images'


const nextConfig = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  experimental: {
    swcPlugins: [
      [
        "@lingui/swc-plugin", {}
      ],
    ],
  },
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  },

  webpack(config, { isServer }) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

        config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: "@lingui/loader", // https://github.com/lingui/js-lingui/issues/1782
      },
    })


    if (config.externals) {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
    } else {
      config.externals = ['pino-pretty', 'lokijs', 'encoding']
    }

    config.resolve.fallback = { fs: false, module: false }


    return config
  },
})

export default nextConfig
