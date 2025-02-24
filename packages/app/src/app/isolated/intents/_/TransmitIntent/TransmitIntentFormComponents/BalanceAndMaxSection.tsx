import { useFormContext } from 'react-hook-form'

import { useBalance } from 'wagmi'

import { type BorrowIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { Button } from '@/astaria/components/Button'
import { Connected } from '@/astaria/components/Connected'
import { CurrencyAmount } from '@/astaria/components/CurrencyAmount'

import { wagmiConfig } from '@/astaria/config/wagmi'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { type ERC20Asset, type IntentAsset, isERC20Asset } from 'assets'
import { Address } from 'viem'

const BalanceAndMaxSectionConnected = ({
  amountFieldName,
  asset,
}: {
  amountFieldName: 'borrowAmount' | 'collateralAmount'
  asset: ERC20Asset
}) => {
  const { clearErrors, setValue } = useFormContext<BorrowIntentFormSchema>()
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const {
    data: balance,
    isFetching,
    isPending,
  } = useBalance({
    address,
    query: {
      enabled: isERC20Asset(asset),
    },
    token: asset.address,
    config: wagmiConfig,
  })

  return (
    <div className="mt-1 flex items-center justify-end gap-0.5">
      <span className="text-xs">Balance:</span>
      <Button
        emphasis="low"
        onClick={() => {
          setValue(amountFieldName, balance?.value || 0n)
          clearErrors(amountFieldName)
        }}
        size="xs"
      >
        <CurrencyAmount
          amount={balance?.value || 0n}
          decimals={asset.decimals}
          skeleton={(isFetching && !balance) || isPending}
          usdValue={asset.usdValue}
        />
      </Button>
    </div>
  )
}

export const BalanceAndMaxSection = ({
  amountFieldName,
  asset,
}: {
  amountFieldName: 'borrowAmount' | 'collateralAmount'
  asset: IntentAsset
}) => {
  if (!isERC20Asset(asset)) {
    return null
  }

  return (
    <Connected connectedComponent={<BalanceAndMaxSectionConnected amountFieldName={amountFieldName} asset={asset} />} />
  )
}
