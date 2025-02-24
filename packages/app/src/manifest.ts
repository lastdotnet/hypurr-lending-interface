import { type MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#0b0c10',
    theme_color: '#0b0c10',
    description: 'Hypurr',
    display: 'standalone',
    icons: [
      {
        purpose: 'maskable',
        sizes: '192x192',
        src: '/images/android-chrome-192x192.png',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '512x512',
        src: '/images/android-chrome-512x512.png',
        type: 'image/png',
      },
      {
        sizes: '192x192',
        src: '/images/android-chrome-192x192.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: '/images/android-chrome-512x512.png',
        type: 'image/png',
      },
    ],
    name: 'Hypurr Lending Market',
    prefer_related_applications: true,
    scope: '/',
    short_name: 'Hypurr Lending Market',
    start_url: '/?source=pwa',
  }
}
