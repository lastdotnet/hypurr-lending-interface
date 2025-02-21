import { formatNumber, toNormalizedValue } from 'common'

import { USDValueDisplay } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValueDisplay'

import { type ERC20Asset } from 'assets'

export const TokenAmountAndUSDDisplay = ({
  amount,
  erc20,
  usdValue,
}: {
  amount: bigint | undefined
  erc20: ERC20Asset | undefined
  usdValue: number | undefined
}) => (
  <div>
    <div className="font-medium">
      {formatNumber({
        amount: toNormalizedValue(amount, erc20?.decimals),
        maxDecimals: 2,
        notation: 'compact',
        useDashForZero: true,
      })}
    </div>
    {amount && amount > 0n ? (
      <USDValueDisplay className="text-xs text-zinc-400" usdValue={usdValue} useDashForZero />
    ) : null}
  </div>
)
