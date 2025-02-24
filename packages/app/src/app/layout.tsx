import '../css/main.css'

import App from '@/App'
import { Debug } from '@/features/debug'
import { DialogDispatcherContainer } from '@/features/dialogs/dispatcher/DialogDispatcherContainer'
import { AppLayout } from '@/ui/layouts/app-layout/AppLayout'
import { cn } from '@/ui/utils/style'
import { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Hypurr Lending Market',
  description: 'Hypurr',
  keywords: [
    'Decentralized Finance',
    'DeFi',
    'lending',
    'borrowing',
    'stablecoins',
    'Ethereum',
    'assets',
    'erc-20',
    'smart contracts',
    'open finance',
    'trustless',
  ],
  metadataBase: new URL('https://app.hypurr.fi'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hypurr Lending Market',
  },
  formatDetection: {
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Hypurr Lending Market',
    description: 'Hypurr',
    type: 'website',
    locale: 'en_US',
    images: ['https://app.hypurr.fi/hypurr-meta-logo.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hypurrfi',
    title: 'Hypurr Lending Market',
    description: 'Hypurr',
    images: {
      url: 'https://app.hypurr.fi/hypurr-meta-logo.jpg',
      alt: 'Hypurr logo',
    },
  },
}

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <FathomAnalytics />
      </head>
      <body className={cn(manrope.variable, 'font-sans')}>
        <App>
          <AppLayout>
            <DialogDispatcherContainer />
            {children}
            {process.env.NEXT_PUBLIC_DEV_DEBUG === '1' && <Debug />}
          </AppLayout>
        </App>
      </body>
    </html>
  )
}

function FathomAnalytics() {
  return (
    <Script
      src="https://cdn.usefathom.com/script.js"
      data-spa="auto"
      data-site="NIQJEYAB"
      strategy="beforeInteractive"
      defer
    />
  )
}
