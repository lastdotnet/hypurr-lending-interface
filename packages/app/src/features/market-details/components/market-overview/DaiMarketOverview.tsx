import { NormalizedUnitNumber, Percentage } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { Panel } from '@/ui/atoms/panel/Panel'

import { formatPercentage } from '@/domain/common/format'
import { CooldownTimer } from '@/ui/molecules/cooldown-timer/CooldownTimer'
import { DssAutoline } from '../../types'
import { MarketOverviewChart } from '../charts/market-overview/MarketOverviewChart'
import { colors } from '../charts/market-overview/colors'
import { Legend } from '../charts/market-overview/components/Legend'
import { DetailsGrid } from './components/DetailsGrid'
import { DetailsGridItem } from './components/DetailsGridItem'
import { MarketOverviewContent } from './components/MarketOvierviewContent'
import { Trans } from '@lingui/react/macro'
export interface DaiMarketOverviewProps {
  token: Token
  borrowed: NormalizedUnitNumber
  instantlyAvailable: NormalizedUnitNumber
  skyCapacity: NormalizedUnitNumber
  marketSize: NormalizedUnitNumber
  totalAvailable: NormalizedUnitNumber
  utilizationRate: Percentage
  dssAutoline: DssAutoline
}

export function DaiMarketOverview({
  token,
  marketSize,
  borrowed,
  instantlyAvailable,
  skyCapacity,
  totalAvailable,
  utilizationRate,
  dssAutoline,
}: DaiMarketOverviewProps) {
  const chartData = [
    { value: borrowed.toNumber(), color: colors.blue },
    { value: instantlyAvailable.toNumber(), color: colors.green },
    { value: skyCapacity.toNumber(), color: colors.orange },
  ]

  return (
    <Panel.Wrapper>
      <MarketOverviewContent>
        <h4 className="font-semibold text-base md:text-xl">
          <Trans>Market Overview</Trans>
        </h4>
        <MarketOverviewChart data={chartData}>
          <Legend token={token} utilized={borrowed} total={marketSize} utilizationRate={utilizationRate} />
        </MarketOverviewChart>
        <DetailsGrid>
          <DetailsGridItem>
            <DetailsGridItem.Title variant="blue">
              <Trans>Borrowed</Trans>
            </DetailsGridItem.Title>
            <DetailsGridItem.Value>{token.formatUSD(borrowed, { compact: true })}</DetailsGridItem.Value>
          </DetailsGridItem>
          <DetailsGridItem>
            <DetailsGridItem.Title>
              <Trans>Market size</Trans>
            </DetailsGridItem.Title>
            <DetailsGridItem.Value>{token.formatUSD(marketSize, { compact: true })}</DetailsGridItem.Value>
          </DetailsGridItem>
          <DetailsGridItem>
            <DetailsGridItem.Title>
              <Trans>Total available</Trans>
            </DetailsGridItem.Title>
            <DetailsGridItem.Value>{token.formatUSD(totalAvailable, { compact: true })}</DetailsGridItem.Value>
          </DetailsGridItem>

          <DetailsGridItem>
            <DetailsGridItem.Title>
              <Trans>Utilization rate</Trans>
            </DetailsGridItem.Title>
            <DetailsGridItem.Value>{formatPercentage(utilizationRate)}</DetailsGridItem.Value>
          </DetailsGridItem>

          <DetailsGridItem>
            <DetailsGridItem.Title variant="green">
              <Trans>Instantly available</Trans>
            </DetailsGridItem.Title>
            <DetailsGridItem.Value>
              {token.formatUSD(instantlyAvailable, { compact: true })}

              <CooldownTimer
                renewalPeriod={dssAutoline.increaseCooldown}
                latestUpdateTimestamp={dssAutoline.lastIncreaseTimestamp}
              />
            </DetailsGridItem.Value>
          </DetailsGridItem>
          <DetailsGridItem>
            <DetailsGridItem.Title variant="orange">
              <Trans>Capacity</Trans>
            </DetailsGridItem.Title>
            <DetailsGridItem.Value>{token.formatUSD(skyCapacity, { compact: true })}</DetailsGridItem.Value>
          </DetailsGridItem>
        </DetailsGrid>
      </MarketOverviewContent>
    </Panel.Wrapper>
  )
}
