import { FaucetContainer } from '@/features/faucet/FaucetContainer'
import { Helmet } from 'react-helmet'

export function FaucetPage() {
  return (
    <>
      <Helmet>
        <meta property="og:image" content="/faucet-meta.jpg" />
        <meta name="twitter:image" content="/faucet-meta.jpg" />
      </Helmet>

      <FaucetContainer />
    </>
  )
}
