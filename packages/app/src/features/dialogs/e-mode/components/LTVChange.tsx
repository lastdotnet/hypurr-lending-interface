import { formatPercentage } from '@/domain/common/format'
import { Percentage } from '@/domain/types/NumericValues'
import { assets } from '@/ui/assets'
import { testIds } from '@/ui/utils/testIds'
import { TransactionOverviewDetailsItem } from '../../common/components/transaction-overview/TransactionOverviewDetailsItem'
import { useLingui } from '@lingui/react/macro'
interface LTVChangeProps {
  currentMaxLTV: Percentage
  updatedMaxLTV?: Percentage
}

export function LTVChange({ currentMaxLTV, updatedMaxLTV }: LTVChangeProps) {
  const { t } = useLingui()
  if (!updatedMaxLTV) {
    return (
      <TransactionOverviewDetailsItem label={t`Maximum LTV`}>
        <div data-testid={testIds.dialog.eMode.transactionOverview.maxLtv.before}>
          {formatPercentage(currentMaxLTV)}
        </div>
      </TransactionOverviewDetailsItem>
    )
  }

  return (
    <TransactionOverviewDetailsItem label={t`Maximum LTV`}>
      <div className="flex flex-row items-center gap-2">
        <div data-testid={testIds.dialog.eMode.transactionOverview.maxLtv.before}>
          {formatPercentage(currentMaxLTV)}
        </div>
        <img src={assets.arrowRight} />
        <div data-testid={testIds.dialog.eMode.transactionOverview.maxLtv.after}>{formatPercentage(updatedMaxLTV)}</div>
      </div>
    </TransactionOverviewDetailsItem>
  )
}
