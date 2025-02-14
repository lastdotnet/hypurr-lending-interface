import { USDValueDisplay } from '@/app/intents/_/TransmitIntent/TransmitIntentFormComponents/USDValueDisplay'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { type ERC20, type ERC20Asset } from 'assets'

export const USDValue = ({
  amount,
  asset,
  className,
}: {
  amount: bigint | undefined
  asset: ERC20 | ERC20Asset
  className?: string
}) => {
  const usdValueRaw = getUSDValue({
    amount,
    decimals: asset.decimals,
    usdValue: asset.usdValue,
  })

  return <USDValueDisplay className={className} usdValue={usdValueRaw} />
}
