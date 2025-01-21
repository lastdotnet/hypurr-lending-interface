import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { SPK_MOCK_TOKEN } from '@/domain/types/Token'
import { assets } from '@/ui/assets'
import { Skeleton } from '@/ui/atoms/skeleton/Skeleton'
import { testIds } from '@/ui/utils/testIds'
import { NavbarActionWrapper } from '../NavbarActionWrapper'
import { AirdropDetails } from './AirdropDetails'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/ui/atoms/dropdown/DropdownMenu'
import { DropdownMenu } from '@/ui/atoms/dropdown/DropdownMenu'

interface AirdropBadgeLayoutProps {
  amount?: NormalizedUnitNumber
  precision?: number
  isLoading?: boolean
  isGrowing?: boolean
  setEnableCounter?: (value: boolean) => void
}
export function AirdropBadgeLayout({
  amount = NormalizedUnitNumber(0),
  precision = 0,
  isLoading,
  isGrowing,
}: AirdropBadgeLayoutProps) {
  return (
    <NavbarActionWrapper label="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <button
              className="gradient-border"
              data-testid={testIds.navbar.airdropBadge}
            >
              <span className="flex items-center gap-1.5">
                <img src={assets.hypurrPaw} className="block h-6 pt-1" />
                {isLoading ? (
                  <Skeleton className="h-5 w-7" />
                ) : (
                  <span className="text-sm text-white/70" data-chromatic="ignore">
                    {SPK_MOCK_TOKEN.format(amount, { style: 'compact' })}
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
