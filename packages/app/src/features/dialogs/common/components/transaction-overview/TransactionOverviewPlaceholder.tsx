import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import { SkyBadge } from '@/features/dialogs/common/components/transaction-overview/SkyBadge'
import { TransactionOverviewDetailsItem } from './TransactionOverviewDetailsItem'
import { useLingui } from '@lingui/react/macro'
export interface TransactionOverviewPlaceholder {
  badgeTokens: TokenSymbol[]
}
export function TransactionOverviewPlaceholder({ badgeTokens }: TransactionOverviewPlaceholder) {
  const { t } = useLingui()
  const placeholder = '-'
  return (
    <div className="isolate">
      <DialogPanel className="shadow-none">
        <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
        <TransactionOverviewDetailsItem label={t`Route`}>
          <div className="flex min-h-[46px] flex-col justify-center">
            <div>{placeholder}</div>
          </div>
        </TransactionOverviewDetailsItem>
        <TransactionOverviewDetailsItem label={t`Outcome`}>{placeholder}</TransactionOverviewDetailsItem>
      </DialogPanel>
      <SkyBadge tokens={badgeTokens} />
    </div>
  )
}
