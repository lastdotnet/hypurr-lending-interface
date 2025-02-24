import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { SPK_MOCK_TOKEN } from '@/domain/types/Token'
import { assets } from '@/ui/assets'
import { Skeleton } from '@/ui/atoms/skeleton/Skeleton'
import { testIds } from '@/ui/utils/testIds'
import { NavbarActionWrapper } from '../NavbarActionWrapper'
import { AirdropDetails } from './AirdropDetails'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/ui/atoms/dropdown/DropdownMenu'
import { DropdownMenu } from '@/ui/atoms/dropdown/DropdownMenu'
import { cn } from '@/ui/utils/style'
import { useAccount } from '@/domain/hooks/useAccount'
import { MinusIcon } from 'lucide-react'

interface AirdropBadgeLayoutProps {
  amount?: NormalizedUnitNumber
  precision?: number
  isLoading?: boolean
  isGrowing?: boolean
  className?: string
  setEnableCounter?: (value: boolean) => void
}
export function AirdropBadgeLayout({
  amount = NormalizedUnitNumber(0),
  precision = 0,
  isLoading,
  isGrowing,
  className,
}: AirdropBadgeLayoutProps) {
  const account = useAccount()
  const points = account ? (
    SPK_MOCK_TOKEN.format(amount, { style: 'compact' })
  ) : (
    <MinusIcon className="h-4 w-4 pr-0.5" />
  )

  return (
    <NavbarActionWrapper label="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <button
              className={cn('gradient-border px-[.6rem] py-[.3rem]', className)}
              data-testid={testIds.navbar.airdropBadge}
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
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mt-2 border border-white/20 p-0">
          <AirdropDetails
            amount={amount}
            precision={precision}
            isLoading={isLoading}
            isGrowing={isGrowing}
            placeholder
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </NavbarActionWrapper>
  )
}
