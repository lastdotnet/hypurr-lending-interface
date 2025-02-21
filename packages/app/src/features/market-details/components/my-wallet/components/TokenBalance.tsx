import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { TokenIcon } from '@/ui/atoms/token-icon/TokenIcon'
import { Info } from '@/ui/molecules/info/Info'
import { testIds } from '@/ui/utils/testIds'
import { Trans } from '@lingui/react/macro'

interface TokenBalanceProps {
  token: Token
  balance: NormalizedUnitNumber
  isCombinedBalance?: boolean
}

export function TokenBalance({ token, balance, isCombinedBalance }: TokenBalanceProps) {
  return (
    <div className="my-4 flex flex-col gap-1">
      <p className="text-white/50 text-xs">
        <Trans>Balance:</Trans>
      </p>

      <div className="flex items-center">
        <TokenIcon token={token} className="mr-2 h-6 w-6" />
        <p
          className="flex items-center gap-2 font-semibold text-base md:text-xl"
          data-testid={testIds.marketDetails.walletPanel.balance}
        >
          {token.format(balance, { style: 'auto' })} {token.symbol}
          {isCombinedBalance && (
            <Info size={16}>
              <Trans>WHYPE and HYPE balances are combined.</Trans>
            </Info>
          )}
        </p>
      </div>
    </div>
  )
}
