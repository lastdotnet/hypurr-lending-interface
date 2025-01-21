import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { GuestView } from './views/GuestView'
import { ReferralsView } from './views/ReferralsView'
import { ReferralsPanel } from './components/ReferralsPanel'

function ReferralsContainer() {
  const { primaryWallet } = useDynamicContext()

  return (
    <ReferralsPanel key={primaryWallet?.address}>{primaryWallet ? <ReferralsView /> : <GuestView />}</ReferralsPanel>
  )
}

export { ReferralsContainer }
