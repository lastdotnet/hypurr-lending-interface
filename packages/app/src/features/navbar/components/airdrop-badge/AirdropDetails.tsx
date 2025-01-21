import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
// import { SPK_MOCK_TOKEN } from '@/domain/types/Token'
import { assets } from '@/ui/assets'
// import BoxArrowTopRight from '@/ui/assets/box-arrow-top-right.svg?react'
// import { Link } from '@/ui/atoms/link/Link'
import { Skeleton } from '@/ui/atoms/skeleton/Skeleton'
// import { links } from '@/ui/constants/links'
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
          <img src={assets.hypurrLogo} className="h-7 xl:h-6" />
          {isLoading ? (
            <Skeleton className="h-5 w-7" />
          ) : (
            <div className="font-semibold text-base tabular-nums" data-chromatic="ignore">
              {formatAirdropAmount({ amount, precision, isGrowing })}
            </div>
          )}
        </div>
      </div>
      {/*
  <div className="flex max-w-60 flex-col gap-2 p-4">
        DAI borrowers with volatile assets and ETH depositors will be eligible for a future LAST points airdrop.
        <Link
          to={links.docs.sparkAirdrop}
          external
          className="flex items-center gap-2.5 font-medium text-basics-dark-grey text-sm"
        >
          <BoxArrowTopRight className="h-4 w-4" />
          Learn more
        </Link>
      </div> */}
    </div>
  )
}
