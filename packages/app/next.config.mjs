import withImages from 'next-images'
import { execSync } from 'node:child_process'

const buildSha = execSync('git rev-parse --short HEAD').toString().trimEnd()
const buildTime = new Date().toLocaleString('en-gb')

const nextConfig = withImages({
  reactStrictMode: true,
  distDir: './dist',

  env: {
    NEXT_PUBLIC_BUILD_SHA: buildSha,
    NEXT_PUBLIC_BUILD_TIME: buildTime,
  },
  images: {
    disableStaticImages: true,
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
    webpackBuildWorker: true,
  },
  webpack(config) {
    // Disable webpack caching in production
    if (process.env.NODE_ENV === 'production') {
      config.cache = false
    }

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [/url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    config.module.rules.push({
      test: /^(.*\.test-e2e\..*|.*\.PageObject\..*|.*\.e2e\..*)$/,
      use: 'ignore-loader', // This will ignore any file matching the pattern
    })

    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: '@lingui/loader', // https://github.com/lingui/js-lingui/issues/1782
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

  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/:path*',
      },
      {
        source: '/ba-api/:path*',
        destination: '/:path*',
      },
      {
        source: '/info-sky-api/:path*',
        destination: '/:path*',
      },
      {
        source: '/claim-with-gas',
        destination: 'https://faucet-ashy.vercel.app/claim-with-gas/',
      },
      {
        source: '/verify-follow/:path*',
        destination: 'https://faucet-ashy.vercel.app/verify-follow/:path*',
      },
    ]
  },
})

export default nextConfig
