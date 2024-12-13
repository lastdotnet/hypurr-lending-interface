import { Helmet } from 'react-helmet'

export function Meta() {
  return (
    <Helmet>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hypurr Lending Market</title>
      <meta name="description" content="Hypurr" />
      <meta property="og:title" content="Hypurr Lending Market" />
      <meta property="og:description" content="Hypurr" />
      <meta property="og:image" content="https://app.hypurr.fi/hypurr-meta-logo.jpg" />
      <meta name="twitter:image" content="https://app.hypurr.fi/hypurr-meta-logo.jpg" />
      <meta name="twitter:image:alt" content="Hypurr logo" />
      <meta name="twitter:site" content="@hypurrfi" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Hypurr Lending Market" />
      <meta name="twitter:description" content="Hypurr" />
      <meta
        name="keywords"
        content="Decentralized Finance, DeFi, lending, borrowing, stablecoins, Ethereum, assets, erc-20, smart contracts, open finance, trustless"
      />
    </Helmet>
  )
}
