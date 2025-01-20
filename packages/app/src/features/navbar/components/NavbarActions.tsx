import { cn } from '@/ui/utils/style'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { ConnectedWalletInfo, RewardsInfo } from '../types'
import { RewardsBadge } from './rewards-badge/RewardsBadge'
import { SettingsDropdown } from './settings-dropdown/SettingsDropdown'
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

export function NavbarActions({
  mobileMenuCollapsed,
  rewardsInfo,
  openSandboxDialog,
  isSandboxEnabled,
}: NavbarActionsProps) {
  const { primaryWallet } = useDynamicContext()

  return (
    <div
      className={cn(
        'mb-2 flex flex-col items-center justify-center gap-6',
        'lg:mb-0 lg:flex-row lg:justify-end lg:gap-2.5',
        mobileMenuCollapsed ? 'hidden lg:flex' : 'flex',
      )}
    >
      <RewardsBadge {...rewardsInfo} />
      <AirdropBadge airdrop={undefined} isLoading={false} isError={false} />
      {primaryWallet ? <UserProfileButton /> : <ConnectButton />}

      <SettingsDropdown onSandboxModeClick={openSandboxDialog} isSandboxEnabled={isSandboxEnabled} />
    </div>
  )
}
