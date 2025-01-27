import { shortenAddress } from '@/ui/utils/shortenAddress'
import { DynamicUserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { WalletIcon } from '@dynamic-labs/wallet-book'
import { Address } from 'viem'

export function UserProfileButton() {
  const { primaryWallet, setShowDynamicUserProfile, networkConfigurations } = useDynamicContext()
  const networkIcon = networkConfigurations?.evm?.[0]?.iconUrls[0]

  if (!primaryWallet) return null

  return (
    <>
      <button
        onClick={() => setShowDynamicUserProfile(true)}
        className="flex items-center gap-2 rounded-sm px-[.65rem] py-[.56rem] text-sm transition hover:bg-white/10"
      >
        {networkIcon && <img src={networkIcon} alt="" className="h-4 w-4" />}

        <WalletIcon walletKey={primaryWallet.connector.key} width={16} />

        {shortenAddress(primaryWallet.address as Address, { startLength: 3, endLength: 3 })}
      </button>

      <DynamicUserProfile />
    </>
  )
}
