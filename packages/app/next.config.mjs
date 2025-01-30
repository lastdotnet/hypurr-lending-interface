import withImages from 'next-images'

const nextConfig = withImages({
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  i18n: {
    locales: ['en', 'pl'], // Define supported locales
    defaultLocale: 'en',
  },

  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    if (config.externals) {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
    } else {
      config.externals = ['pino-pretty', 'lokijs', 'encoding']
    }


    return config
  },
})

export default nextConfig
