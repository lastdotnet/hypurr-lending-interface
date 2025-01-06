import { formatPercentage } from '@/domain/common/format'
import { Typography } from '@/ui/atoms/typography/Typography'
import { BorrowDetails } from '../logic/useEasyBorrow'
import { assets } from '@/ui/assets'

export interface BorrowRateBannerProps {
  assetsToBorrowMeta: BorrowDetails
}

export function BorrowRateBanner({ assetsToBorrowMeta }: BorrowRateBannerProps) {
  const { borrowRate } = assetsToBorrowMeta
  return (
    <div className="flex flex-col items-center md:mt-12">
      <div className="flex items-center gap-2">
        <img src={assets.surrf} alt="Surrf" className="" />
        <Typography variant="h1" gradient className="text-4xl md:text-5xl">
          Borrow USDXL
        </Typography>
      </div>
      <Typography variant="h3" className="mt-6 text-center text-lg text-primary-bg/70 md:text-2xl">
        Borrow USDXL at <span className="text-white">{formatPercentage(borrowRate)}</span> from Hypurr
      </Typography>
    </div>
  )
}
