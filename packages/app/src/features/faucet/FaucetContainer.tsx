import { useState } from 'react'
import { FaucetView } from './views/FaucetView'
import { SuccessView } from './views/SuccessView'
import { GuestView } from './views/GuestView'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { FaucetPanel } from './components/FaucetPanel'

function FaucetContainer() {
  const [mintTx, setMintTx] = useState<string | null>(null)
  const { primaryWallet } = useDynamicContext()

  return (
    <FaucetPanel key={primaryWallet?.address}>
      {(() => {
        switch (true) {
          case !!mintTx:
            return <SuccessView mintTx={mintTx} />
          case !primaryWallet:
            return <GuestView />
          default:
            return <FaucetView setMintTx={setMintTx} />
        }
      })()}
    </FaucetPanel>
  )
}

export { FaucetContainer }
