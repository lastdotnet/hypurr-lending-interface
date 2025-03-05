import { AirdropInfo } from '../../types'
import { AirdropBadgeLayout } from './AirdropBadgeLayout'
import { DynamicAirdropBadge } from './DynamicAirdropBadge'

export function AirdropBadge({
  airdrop,
  isLoading,
  isError,
  className,
  closeMobileMenu,
}: AirdropInfo & { className?: string; closeMobileMenu?: () => void }) {
  if (isError) {
    return null
  }

  if (isLoading) {
    return <AirdropBadgeLayout isLoading className={className} closeMobileMenu={closeMobileMenu} />
  }

  if (!airdrop) {
    return <AirdropBadgeLayout className={className} closeMobileMenu={closeMobileMenu} />
  }

  return <DynamicAirdropBadge airdrop={airdrop} className={className} closeMobileMenu={closeMobileMenu} />
}
