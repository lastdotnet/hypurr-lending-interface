import { cva } from 'class-variance-authority'
import { UserProfileButton } from './UserProfileButton'
import { useAccount } from '@/domain/hooks/useAccount'
import { ConnectButton } from './ConnectButton'

const navWalletButtonStyles = cva(
  'flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-sm border border-white/4 bg-[#0F0F12] px-4 py-3 text-sm shadow-md transition-colors hover:bg-[#1A1A1D]',
)

export function WalletButton() {
  const address = useAccount()

  return address ? (
    <UserProfileButton className={navWalletButtonStyles()} />
  ) : (
    <ConnectButton className={navWalletButtonStyles()} />
  )
}
