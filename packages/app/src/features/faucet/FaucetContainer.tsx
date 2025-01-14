import { useState } from 'react'
import { FaucetView } from './views/FaucetView'
import { SuccessView } from './views/SuccessView'
import { GuestView } from './views/GuestView'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { FaucetPanel } from './components/FaucetPanel'
import { useTransaction } from 'wagmi'
import { Address, formatUnits } from 'viem'

function FaucetContainer() {
  const [mintTx, setMintTx] = useState<Address>()
  const { primaryWallet } = useDynamicContext()

  const result = useTransaction({
    hash: mintTx,
  })
  const hypeAmount = result.data?.value ? formatUnits(result.data.value, 18) : ''

  return (
    <FaucetPanel key={primaryWallet?.address}>
      {(() => {
        switch (true) {
          case !!mintTx && !!hypeAmount:
            return <SuccessView mintTx={mintTx} hypeAmount={hypeAmount} />
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
