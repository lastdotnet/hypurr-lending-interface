import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { SPK_MOCK_TOKEN } from '@/domain/types/Token'
import { assets } from '@/ui/assets'
import { Skeleton } from '@/ui/atoms/skeleton/Skeleton'
import Image from 'next/image'
import { formatAirdropAmount } from './utils/formatAirdropAmount'

interface AirdropDetailsProps {
  amount: NormalizedUnitNumber
  precision: number
  isGrowing?: boolean
  isLoading?: boolean
  placeholder?: boolean
}

export function AirdropDetails({ amount, precision, isLoading, isGrowing, placeholder }: AirdropDetailsProps) {
  if (placeholder) {
    return (
      <div className="px-4 py-2 text-sm">
        <p>Coming soon!</p>
      </div>
    )
  }

  return (
    <div className="w-[calc(100vw-48px)] text-xs xl:w-auto">
      <div className="flex flex-col gap-1 border-basics-grey/50 border-b p-4">
        Hypurr points
        <div className="flex items-center gap-2">
          <Image src={assets.hypurrLogo} className="h-7 xl:h-6" alt={''} />
          {isLoading ? (
            <Skeleton className="h-5 w-7" />
          ) : (
            <div className="font-semibold text-base tabular-nums" data-chromatic="ignore">
              {formatAirdropAmount({ amount, precision, isGrowing })} {SPK_MOCK_TOKEN.symbol}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
