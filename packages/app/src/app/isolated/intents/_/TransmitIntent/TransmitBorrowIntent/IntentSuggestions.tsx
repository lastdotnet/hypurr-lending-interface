import { useFormContext } from 'react-hook-form'

import { type Address, zeroAddress } from 'viem'

import { clsx } from 'clsx'

import { type BorrowIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitBorrowIntent/borrowIntentFormSchema'
import { type LendIntentFormSchema } from '@/app/isolated/intents/_/TransmitIntent/TransmitLendIntent/lendIntentFormSchema'
import { useBatchedBalances } from '@/astaria/components/AssetSelector/ERC20Selector/useBatchedBalances'
import { useERC20Token } from '@/astaria/components/AssetSelector/ERC20Selector/useERC20Token'
import { useERC20Tokens } from '@/astaria/components/AssetSelector/ERC20Selector/useERC20Tokens'
import { Button } from '@/astaria/components/Button'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { useChainId } from '@/astaria/hooks/useChainId'
import { getERC20sWithBalance } from '@/astaria/utils/erc20sWithBalance'
import { getBorrowAmountBasedOnLTV, getCollateralAmountBasedOnLTV } from '@/astaria/utils/getBorrowAmountBasedOnLTV'
import { getUSDValue } from '@/astaria/utils/getUSDValue'

import { useAccount } from '@/domain/hooks/useAccount'
import { type ERC20, type ERC20Asset } from 'assets'

const SUGGESTED_BORROW_SYMBOL = 'USDC'
const SUGGESTED_COLLATERAL_SYMBOL = 'WETH'
const SUGGESTED_LTV = 70
const NUMBER_OF_SUGGESTED_INTENTS_TO_SHOW = 3

const getValues = ({
  erc20,
  suggestedAsset,
  type,
}: {
  erc20: ERC20
  suggestedAsset: ERC20Asset
  type: 'borrow' | 'lend'
}) => {
  if (type === 'lend') {
    const borrowAsset = erc20
    const borrowAmount = erc20.amount
    const collateralAsset = suggestedAsset

    return {
      borrowAmount,
      borrowAsset,
      collateralAmount: getCollateralAmountBasedOnLTV({
        borrowAmount,
        borrowAsset,
        collateralAsset,
        ltv: SUGGESTED_LTV,
      }),
      collateralAsset,
    }
  }

  const borrowAsset = suggestedAsset
  const collateralAmount = erc20.amount
  const collateralAsset = erc20

  return {
    borrowAmount: getBorrowAmountBasedOnLTV({
      borrowAsset,
      collateralAmount,
      collateralAsset,
      ltv: SUGGESTED_LTV,
    }),
    borrowAsset,
    collateralAmount,
    collateralAsset,
  }
}

const IntentSuggestion = ({
  erc20,
  suggestedAsset,
  type,
}: {
  erc20: ERC20
  suggestedAsset: ERC20Asset
  type: 'borrow' | 'lend'
}) => {
  const { setValue, trigger } = useFormContext<BorrowIntentFormSchema | LendIntentFormSchema>()

  return (
    <Button
      emphasis="medium"
      noUppercase
      onClick={() => {
        const { borrowAmount, borrowAsset, collateralAmount, collateralAsset } = getValues({
          erc20,
          suggestedAsset,
          type,
        })

        setValue('borrowAmount', borrowAmount)
        setValue('borrowAsset', borrowAsset)
        setValue('collateralAmount', collateralAmount)
        setValue('collateralAsset', collateralAsset)
        trigger(['borrowAmount', 'borrowAsset', 'collateralAmount', 'collateralAsset']) // trigger validation
      }}
      size="xs"
    >
      <ERC20Image erc20={erc20} size="sm" />
      {erc20.symbol}
    </Button>
  )
}

export const IntentSuggestions = ({ type }: { type: 'borrow' | 'lend' }) => {
  const userAddress = useAccount()
  const chainId = useChainId()
  const { erc20s } = useERC20Tokens({
    type: type === 'lend' ? 'collateral' : 'borrow',
  })
  const { erc20: suggestedAsset } = useERC20Token({
    chainId,
    symbol: type === 'lend' ? SUGGESTED_COLLATERAL_SYMBOL : SUGGESTED_BORROW_SYMBOL,
  })

  const { balances, isPending } = useBatchedBalances({
    enabled: !!userAddress && !!erc20s,
    tokenAddresses: erc20s?.map((erc20) => erc20.address) || [zeroAddress],
    userAddress: userAddress as Address,
  })

  const { erc20sWithBalance } = getERC20sWithBalance({
    balances,
    erc20s,
  })
  const topERC20sWithBalance = erc20sWithBalance
    .sort((a, b) => {
      const aValue = getUSDValue({
        amount: a.amount,
        decimals: a.decimals,
        usdValue: a.usdValue,
      })
      const bValue = getUSDValue({
        amount: b.amount,
        decimals: b.decimals,
        usdValue: b.usdValue,
      })

      return (bValue || 0) - (aValue || 0)
    })
    .slice(0, NUMBER_OF_SUGGESTED_INTENTS_TO_SHOW)

  if (topERC20sWithBalance.length === 0) {
    return null
  }

  return (
    <div
      className={clsx('mt-1 grid grid-cols-3 gap-2', {
        'mb-1': type === 'borrow',
      })}
    >
      {isPending ? (
        <Button emphasis="medium" noUppercase size="xs">
          <SkeletonText />
        </Button>
      ) : null}
      {suggestedAsset
        ? topERC20sWithBalance.map((erc20) => (
            <IntentSuggestion key={erc20.address} erc20={erc20} suggestedAsset={suggestedAsset} type={type} />
          ))
        : null}
    </div>
  )
}
