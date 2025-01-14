import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { RouteItem } from '@/features/dialogs/common/components/transaction-overview/RouteItem'
import { SkyBadge } from '@/features/dialogs/common/components/transaction-overview/SkyBadge'
import { TransactionOutcome } from '@/features/dialogs/common/components/transaction-overview/TransactionOutcome'
import { cn } from '@/ui/utils/style'
import { assert } from '@/utils/assert'
import { SavingsDialogTxOverview } from '../../types'
import { APYDetails, TransactionOverviewDetailsItem } from './components'
import { TransactionOverviewPlaceholder } from './components/TransactionOverviewPlaceholder'

export interface TransactionOverviewProps {
  txOverview: SavingsDialogTxOverview
  selectedToken: Token
  showAPY?: boolean
}

export function TransactionOverview({ txOverview, selectedToken, showAPY }: TransactionOverviewProps) {
  if (txOverview.status !== 'success') {
    return <TransactionOverviewPlaceholder badgeToken={selectedToken.symbol} showAPY={showAPY} />
  }
  const { APY, baseStable, stableEarnRate, route, skyBadgeToken } = txOverview

  assert(route.length > 0, 'Route must have at least one item')
  const outcome = route.at(-1)!
  const displayRouteVertically = Boolean(route.length > 2 && route[0]?.value?.gte(NormalizedUnitNumber(100_000)))

  return (
    <div className="isolate">
      <DialogPanel className="shadow-none">
        <DialogPanelTitle>Transaction overview</DialogPanelTitle>
        {showAPY && (
          <TransactionOverviewDetailsItem label="APY">
            <APYDetails APY={APY} baseStable={baseStable} stableEarnRate={stableEarnRate} />
          </TransactionOverviewDetailsItem>
        )}
        <TransactionOverviewDetailsItem label="Route">
          <div className={cn('flex flex-col items-end gap-2', !displayRouteVertically && 'md:flex-row')}>
            {route.map((item, index) => (
              <RouteItem
                key={item.token.symbol}
                item={item}
                index={index}
                isLast={index === route.length - 1}
                displayRouteVertically={displayRouteVertically}
              />
            ))}
          </div>
        </TransactionOverviewDetailsItem>
        <TransactionOverviewDetailsItem label="Outcome">
          <TransactionOutcome outcome={outcome} />
        </TransactionOverviewDetailsItem>
      </DialogPanel>

      <SkyBadge tokens={[skyBadgeToken.symbol]} />
    </div>
  )
}
