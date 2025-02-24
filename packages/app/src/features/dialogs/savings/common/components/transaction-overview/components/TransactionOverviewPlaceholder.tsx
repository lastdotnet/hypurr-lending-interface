import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { SkyBadge } from '@/features/dialogs/common/components/transaction-overview/SkyBadge'
import { TransactionOverviewDetailsItem } from './TransactionOverviewDetailsItem'
import { useLingui } from '@lingui/react/macro'
export interface TransactionOverviewPlaceholder {
  badgeToken: TokenSymbol
  showAPY?: boolean
}
export function TransactionOverviewPlaceholder({ badgeToken, showAPY }: TransactionOverviewPlaceholder) {
  const placeholder = '-'
  const { t } = useLingui()
  return (
    <div className="isolate">
      <DialogPanel className="shadow-none">
        <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
        {showAPY && (
          <TransactionOverviewDetailsItem label={t`APY`}>
            <div className="min-h-[46px]">{placeholder}</div>
          </TransactionOverviewDetailsItem>
        )}
        <TransactionOverviewDetailsItem label={t`Route`}>
          <div className="flex min-h-[46px] flex-col items-end justify-between">
            <div>{placeholder}</div>
          </div>
        </TransactionOverviewDetailsItem>
        <TransactionOverviewDetailsItem label={t`Outcome`}>{placeholder}</TransactionOverviewDetailsItem>
      </DialogPanel>
      <SkyBadge tokens={[badgeToken]} />
    </div>
  )
}
