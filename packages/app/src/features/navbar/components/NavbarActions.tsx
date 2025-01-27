import { cn } from '@/ui/utils/style'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { ConnectedWalletInfo, RewardsInfo } from '../types'
import { RewardsBadge } from './rewards-badge/RewardsBadge'
import ConnectButton from './ConnectButton'
import { UserProfileButton } from './UserProfileButton'
import { AirdropBadge } from './airdrop-badge/AirdropBadge'

export interface NavbarActionsProps {
  mobileMenuCollapsed: boolean
  connectedWalletInfo: ConnectedWalletInfo | undefined
  rewardsInfo: RewardsInfo
  openSandboxDialog: () => void
  isSandboxEnabled: boolean
}

export function NavbarActions({ mobileMenuCollapsed, rewardsInfo }: NavbarActionsProps) {
  const { primaryWallet } = useDynamicContext()

  return (
    <div
      className={cn(
        'mb-2 flex flex-col items-start justify-center gap-6',
        'xl:mb-0 xl:flex-row xl:items-stretch xl:justify-center xl:gap-2.5',
        mobileMenuCollapsed ? 'hidden xl:flex' : 'flex',
      )}
    >
      <RewardsBadge {...rewardsInfo} />
      <AirdropBadge airdrop={undefined} isLoading={false} isError={false} />

      {primaryWallet ? <UserProfileButton /> : <ConnectButton />}
    </div>
  )
}
