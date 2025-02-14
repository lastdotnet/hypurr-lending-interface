'use client'

import { USDValueDisplay } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValueDisplay'
import { useMarketDetails } from '@/app/isolated-markets/_/MarketDetails/useMarketDetails'
import { Card } from '@/astaria/components/Card'
import { SkeletonNumber } from '@/astaria/components/SkeletonNumber'
import { Tooltip } from '@/astaria/components/Tooltip'
import { TopStat } from '@/astaria/components/TopStat'

export const MarketDetails = () => {
  const { isPending, marketDetails } = useMarketDetails()

  return (
    <Card>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        <TopStat
          label="Intent volume"
          value={
            <USDValueDisplay
              skeleton={isPending}
              standardDecimals
              usdValue={marketDetails?.intentVolume || 0}
              useDashForZero
            />
          }
        />
        <TopStat
          label={<Tooltip content="Cumulative amount collateralized" trigger="Amount collateralized" underline />}
          value={
            <USDValueDisplay
              skeleton={isPending}
              standardDecimals
              usdValue={marketDetails?.cumulativeCollateral || 0}
              useDashForZero
            />
          }
        />
        {/*<TopStat*/}
        {/*  label={*/}
        {/*    <Tooltip*/}
        {/*      content="Cumulative amount borrowed"*/}
        {/*      trigger="Amount borrowed"*/}
        {/*      underline*/}
        {/*    />*/}
        {/*  }*/}
        {/*  value={*/}
        {/*    <USDValueDisplay*/}
        {/*      skeleton={isPending}*/}
        {/*      standardDecimals*/}
        {/*      usdValue={marketDetails?.cumulativeBorrow || 0}*/}
        {/*      useDashForZero*/}
        {/*    />*/}
        {/*  }*/}
        {/*/>*/}
        <TopStat
          label={<Tooltip content="Cumulative amount borrowed" trigger="Amount borrowed" underline />}
          value={
            <USDValueDisplay
              skeleton={isPending}
              standardDecimals
              usdValue={marketDetails?.cumulativeBorrow || 0}
              useDashForZero
            />
          }
        />
        <TopStat
          label="Intents transmitted"
          value={isPending ? <SkeletonNumber /> : marketDetails?.intentsCount.toString()}
        />
        <TopStat label="Active loans" value={isPending ? <SkeletonNumber /> : marketDetails?.activeLoans} />
      </div>
    </Card>
  )
}
