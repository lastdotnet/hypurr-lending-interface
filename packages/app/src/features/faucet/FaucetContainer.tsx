import { useState } from 'react'
import { FaucetView } from './views/FaucetView'
import { SuccessView } from './views/SuccessView'
import { GuestView } from './views/GuestView'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { FaucetPanel } from './components/FaucetPanel'

function FaucetContainer() {
  const [success, setSuccess] = useState(false)
  const { primaryWallet } = useDynamicContext()

  return (
    <FaucetPanel key={primaryWallet?.address}>
      {(() => {
        switch (true) {
          case success:
            return <SuccessView />
          case !primaryWallet:
            return <GuestView />
          default:
            return <FaucetView setSuccess={setSuccess} />
        }
      })()}
    </FaucetPanel>
  )
}

export { FaucetContainer }
