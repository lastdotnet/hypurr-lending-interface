import { useGrowingAirdropAmount } from '../../logic/use-airdrop-info/useGrowingAirdropAmount'
import { Airdrop } from '../../types'
import { AirdropBadgeLayout } from './AirdropBadgeLayout'

interface AirdropBadgeDynamicProps {
  airdrop: Airdrop
  className?: string
  closeMobileMenu?: () => void
}
export function DynamicAirdropBadge({ airdrop, className, closeMobileMenu }: AirdropBadgeDynamicProps) {
  const amount = useGrowingAirdropAmount(airdrop, true)

  return (
    <AirdropBadgeLayout
      amount={amount}
      precision={airdrop.tokenRatePrecision}
      className={className}
      closeMobileMenu={closeMobileMenu}
    />
  )
}
