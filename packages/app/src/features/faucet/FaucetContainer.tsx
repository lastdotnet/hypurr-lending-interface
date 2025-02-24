import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useState } from 'react'
import { Address, formatUnits } from 'viem'
import { useTransaction } from 'wagmi'
import { FaucetPanel } from './components/FaucetPanel'
import { FaucetView } from './views/FaucetView'
import { GuestView } from './views/GuestView'
import { SuccessView } from './views/SuccessView'

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
