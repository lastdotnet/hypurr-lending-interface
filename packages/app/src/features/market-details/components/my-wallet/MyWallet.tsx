import { BorrowEligibilityStatus } from '@/domain/market-info/reserve-status'
import { OpenDialogFunction } from '@/domain/state/dialogs'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { borrowDialogConfig } from '@/features/dialogs/borrow/BorrowDialog'
import { depositDialogConfig } from '@/features/dialogs/deposit/DepositDialog'
import { Panel } from '@/ui/atoms/panel/Panel'
import { ActionRow } from './components/ActionRow'
import { BorrowRow } from './components/BorrowRow'
import { TokenBalance } from './components/TokenBalance'
import { WalletPanelContent } from './components/WalletPanelContent'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { withdrawDialogConfig } from '@/features/dialogs/withdraw/WithdrawDialog'
import { Trans, useLingui } from '@lingui/react/macro'

export interface MyWalletProps {
  token: Token
  tokenBalance: NormalizedUnitNumber
  isCombinedBalance?: boolean
  lend?: {
    available: NormalizedUnitNumber
    token: Token
  }
  deposit: {
    available: NormalizedUnitNumber
    token: Token
  }
  borrow: {
    available: NormalizedUnitNumber
    token: Token
    eligibility: BorrowEligibilityStatus
  }
  withdraw?: {
    available: NormalizedUnitNumber
    token: Token
  }
  openDialog: OpenDialogFunction
}

export function MyWallet({
  token,
  tokenBalance,
  isCombinedBalance,
  lend,
  deposit,
  borrow,
  withdraw,
  openDialog,
}: MyWalletProps) {
  const { t } = useLingui()
  return (
    <Panel.Wrapper>
      <WalletPanelContent>
        <h3 className="font-normal text-base md:text-xl">
          <Trans>My Wallet</Trans>
        </h3>
        <TokenBalance token={token} balance={tokenBalance} isCombinedBalance={isCombinedBalance} />
        {lend && (
          <ActionRow
            token={lend.token}
            value={lend.available}
            onAction={() => openDialog(depositDialogConfig, { token: lend.token })}
            label={t`Available to lend`}
            buttonText={t`Lend`}
          />
        )}
        {token.symbol !== TokenSymbol('USDXL') && (
          <ActionRow
            token={deposit.token}
            value={deposit.available}
            onAction={() => openDialog(depositDialogConfig, { token: deposit.token })}
            label={token.symbol === 'DAI' ? t`Deposit DAI as collateral` : t`Available to deposit`}
            buttonText={t`Deposit`}
          />
        )}
        {withdraw && (
          <ActionRow
            token={withdraw.token}
            value={withdraw.available}
            onAction={() => openDialog(withdrawDialogConfig, { token: withdraw.token })}
            label={t`Available to withdraw`}
            buttonText={t`Withdraw`}
          />
        )}
        <BorrowRow
          token={borrow.token}
          onAction={() => openDialog(borrowDialogConfig, { token: borrow.token })}
          availableToBorrow={borrow.available}
          eligibility={borrow.eligibility}
        />
      </WalletPanelContent>
    </Panel.Wrapper>
  )
}
