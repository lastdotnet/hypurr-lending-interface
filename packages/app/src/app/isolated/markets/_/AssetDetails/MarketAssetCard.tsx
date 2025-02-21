import { forwardRef } from 'react'

import { AverageAPY } from '@/app/isolated/markets/_/AssetDetails/AverageAPY'
import { MarketERC20Display } from '@/app/isolated/markets/_/AssetDetails/MarketERC20Display'
import { TokenAmountAndUSDDisplay } from '@/app/isolated/markets/_/AssetDetails/TokenAmountAndUSDDisplay'
import { AssetCard } from '@/astaria/components/AssetCard'
import { CardLabelValue, CardSection } from '@/astaria/components/Card'
import { type AssetDetail } from '@/astaria/types-internal/market-schemas'

export const MarketAssetCard = forwardRef<
  HTMLDivElement,
  {
    assetDetails?: AssetDetail
    className?: string
    skeleton?: boolean
  }
>(({ assetDetails, className, skeleton, ...rest }, ref) => (
  <AssetCard ref={ref} className={className} {...rest}>
    <CardSection>
      <MarketERC20Display erc20={assetDetails?.erc20} skeleton={skeleton} />
    </CardSection>
    <CardSection className="flex justify-between">
      <CardLabelValue
        label="Total collateral"
        value={
          <TokenAmountAndUSDDisplay
            amount={assetDetails?.totalCollateral}
            erc20={assetDetails?.erc20}
            usdValue={assetDetails?.usdValueCollateral}
          />
        }
      />
      <CardLabelValue
        label="Total borrowed"
        orientation="horizontal"
        value={
          <TokenAmountAndUSDDisplay
            amount={assetDetails?.totalBorrowed}
            erc20={assetDetails?.erc20}
            usdValue={assetDetails?.usdValueBorrowed}
          />
        }
      />
    </CardSection>
    <CardSection>
      <CardLabelValue
        label="Average APY"
        orientation="horizontal"
        value={<AverageAPY avgApy={assetDetails?.avgApy} erc20={assetDetails?.erc20} skeleton={skeleton} />}
      />
    </CardSection>
  </AssetCard>
))
MarketAssetCard.displayName = 'MarketAssetCard'
