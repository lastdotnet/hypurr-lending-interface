import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { SPK_MOCK_TOKEN } from '@/domain/types/Token'
import { assets } from '@/ui/assets'
import { Skeleton } from '@/ui/atoms/skeleton/Skeleton'
import { testIds } from '@/ui/utils/testIds'
import { cn } from '@/ui/utils/style'
import { useAccount } from '@/domain/hooks/useAccount'
import { MinusIcon } from 'lucide-react'
import { LinkButton } from '@/ui/atoms/button/Button'

interface AirdropBadgeLayoutProps {
  amount?: NormalizedUnitNumber
  precision?: number
  isLoading?: boolean
  className?: string
  closeMobileMenu?: () => void
}
export function AirdropBadgeLayout({
  amount = NormalizedUnitNumber(0),
  isLoading,
  className,
  closeMobileMenu,
}: AirdropBadgeLayoutProps) {
  const account = useAccount()
  const points = account ? (
    SPK_MOCK_TOKEN.format(amount, { style: 'compact' })
  ) : (
    <MinusIcon className="h-4 w-4 pr-0.5" strokeWidth={3} />
  )

  return (
    <div>
      <LinkButton
        href="/points"
        className={cn('gradient-border px-[.6rem] py-[.3rem]', className)}
        data-testid={testIds.navbar.airdropBadge}
        onClick={closeMobileMenu}
      >
        <span className="flex items-center justify-center gap-1.5">
          <img src={assets.hypurrPaw} className="block h-7 pt-1" />
          {isLoading ? (
            <Skeleton className="h-5 w-7" />
          ) : (
            <span className="flex items-center font-bold text-white text-xs" data-chromatic="ignore">
              {points} points
            </span>
          )}
        </span>
      </LinkButton>
    </div>
  )
}
