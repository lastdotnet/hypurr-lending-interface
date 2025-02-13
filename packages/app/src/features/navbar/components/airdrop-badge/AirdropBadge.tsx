import { AirdropInfo } from '../../types'
import { AirdropBadgeLayout } from './AirdropBadgeLayout'
import { DynamicAirdropBadge } from './DynamicAirdropBadge'

export function AirdropBadge({ airdrop, isLoading, isError, className }: AirdropInfo & { className?: string }) {
  if (isError) {
    return null
  }

  if (isLoading) {
    return <AirdropBadgeLayout isLoading className={className} />
  }

  if (!airdrop) {
    return <AirdropBadgeLayout className={className} />
  }

  return <DynamicAirdropBadge airdrop={airdrop} className={className} />
}
