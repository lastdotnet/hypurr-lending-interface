import { Info } from '@/ui/molecules/info/Info'
import { ReactNode } from 'react'

// import { Link } from '@/ui/atoms/link/Link'
// import { links } from '@/ui/constants/links'

interface ReferralPointsTooltipProps {
  children: ReactNode
}

export function ReferralPointsTooltip({ children }: ReferralPointsTooltipProps) {
  return (
    <div className="flex items-center gap-0.5">
      {children}

      <Info>
        <p>Earn points by inviting friends! Share your referral link, and when they supply, you'll receive points</p>
      </Info>
    </div>
  )
}
