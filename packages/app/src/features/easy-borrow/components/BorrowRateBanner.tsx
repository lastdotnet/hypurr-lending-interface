import { formatPercentage } from '@/domain/common/format'
import { Typography } from '@/ui/atoms/typography/Typography'
import { BorrowDetails } from '../logic/useEasyBorrow'
import { assets } from '@/ui/assets'

export interface BorrowRateBannerProps {
  assetsToBorrowMeta: BorrowDetails
}

export function BorrowRateBanner({ assetsToBorrowMeta }: BorrowRateBannerProps) {
  const { dai, usds, borrowRate } = assetsToBorrowMeta
  return (
    <div className="flex flex-col items-center md:mt-12">
      <div className="flex items-center gap-2">
        <img src={assets.surrf} alt="Surrf" className="" />
        <Typography variant="h1" className="font-normal text-4xl text-primary md:text-5xl">
          Mint USDxl
        </Typography>
      </div>
      <Typography variant="h3" className="mt-6 text-center font-medium text-lg text-primary-bg/70 md:text-2xl">
        Borrow {dai}
        {usds ? ` or ${usds}` : ''} at <span className="text-white">{formatPercentage(borrowRate)}</span> from Hypurr
      </Typography>
    </div>
  )
}
