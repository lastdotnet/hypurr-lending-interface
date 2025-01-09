import { Typography } from '@/ui/atoms/typography/Typography'
import { BorrowDetails } from '../logic/useEasyBorrow'
export interface BorrowRateBannerProps {
  assetsToBorrowMeta: BorrowDetails
}

export function BorrowRateBanner() {
  return (
    <div className="flex flex-col items-center md:mt-12">
      <div className="flex items-center gap-2">
        <Typography variant="h1" gradient>
          Borrow USDXL
        </Typography>
      </div>
      <Typography variant="h2" className="mt-6 text-center font-normal text-base text-white/60">
        Deposit native Hyperliquid assets and borrow USDXL for leveraged yield that purrrrrrs.
      </Typography>
    </div>
  )
}
