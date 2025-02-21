import { hyperTestnet } from '@/config/chain/constants'
import { Typography } from '@/ui/atoms/typography/Typography'
import { shortenAddress } from '@/ui/utils/shortenAddress'
import { DynamicUserProfile, useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { WalletIcon } from '@dynamic-labs/wallet-book'
import { Address } from 'viem'
import Image from 'next/image'

export function UserProfileButton({ className }: { className?: string }) {
  const { primaryWallet, setShowDynamicUserProfile, networkConfigurations, network } = useDynamicContext()

  const networkIcon = networkConfigurations?.evm?.[0]?.iconUrls[0]

  if (!primaryWallet) return null
  return (
    <>
      <button onClick={() => setShowDynamicUserProfile(true)} className={className}>
        <div className="flex items-center gap-2">
          {networkIcon && <Image src={networkIcon} alt="" className="h-4 w-4" width={16} height={16} />}
          {Number(network) === hyperTestnet.id && (
            <Typography variant="span" className="text-xs">
              Testnet
            </Typography>
          )}
        </div>

        <WalletIcon walletKey={primaryWallet.connector.key} width={16} />

        {shortenAddress(primaryWallet.address as Address, { startLength: 3, endLength: 3 })}
      </button>

      <DynamicUserProfile />
    </>
  )
}
