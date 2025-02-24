import { TokenWithBalance } from '@/domain/common/types'
import { DialogPanel } from '@/features/dialogs/common/components/DialogPanel'
import { DialogPanelTitle } from '@/features/dialogs/common/components/DialogPanelTitle'
import BigNumber from 'bignumber.js'
import { HealthFactorChange } from '../../common/components/transaction-overview/HealthFactorChange'
import { TransactionOverviewDetailsItem } from '../../common/components/transaction-overview/TransactionOverviewDetailsItem'
import { useLingui } from '@lingui/react/macro'
export interface CollateralOverviewPanelProps {
  collateral: TokenWithBalance
  currentHealthFactor?: BigNumber
  updatedHealthFactor?: BigNumber
}
export function CollateralOverviewPanel({
  collateral: { token, balance },
  currentHealthFactor,
  updatedHealthFactor,
}: CollateralOverviewPanelProps) {
  const { t } = useLingui()
  return (
    <DialogPanel>
      <DialogPanelTitle>{t`Transaction overview`}</DialogPanelTitle>
      <TransactionOverviewDetailsItem label={t`Deposit balance`}>
        <div className="flex flex-col items-end gap-0.5">
          <p className="text-base">
            {token.format(balance, { style: 'auto' })} {token.symbol}
          </p>
          <div className="text-white/50 text-xs">{token.formatUSD(balance)}</div>
        </div>
      </TransactionOverviewDetailsItem>
      <HealthFactorChange currentHealthFactor={currentHealthFactor} updatedHealthFactor={updatedHealthFactor} />
    </DialogPanel>
  )
}
