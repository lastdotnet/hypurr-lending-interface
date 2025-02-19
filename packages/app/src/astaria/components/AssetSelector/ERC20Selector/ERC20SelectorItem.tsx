import { type Dispatch, type SetStateAction } from 'react'

import { type Address, isAddressEqual } from 'viem'

import { ERC20SelectorItemDisplay } from '@/astaria/components/AssetSelector/ERC20Selector/ERC20SelectorItemDisplay'
import { useReadBalance } from '@/astaria/components/AssetSelector/ERC20Selector/useReadBalance'

import { type ERC20Asset, type IntentAsset, isERC20Asset } from 'assets'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

export const ERC20SelectorItem = ({
  asset,
  erc20,
  setAsset,
  setDialogOpen,
}: {
  asset: IntentAsset | undefined
  erc20: ERC20Asset
  setAsset: (asset: ERC20Asset) => void
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const { address, chainId, decimals, logoURI, name, symbol, usdValue } = erc20

  const { primaryWallet: wallet } = useDynamicContext()

  const userAddress = wallet?.address as Address | undefined

  const { balance, isFetching } = useReadBalance({
    enabled: !!userAddress,
    tokenAddress: address,
    userAddress: userAddress as Address,
  })
  const isSelected = isERC20Asset(asset) && isAddressEqual(asset.address, address)

  return (
    <ERC20SelectorItemDisplay
      amount={balance?.amount}
      erc20={erc20}
      isSelected={isSelected}
      onSelect={() => {
        setAsset({
          address,
          chainId,
          decimals,
          logoURI,
          name,
          symbol,
          usdValue,
        })
        setDialogOpen(false)
      }}
      skeleton={isFetching}
      value={`${address}:${address.toLowerCase()}:${erc20.symbol}:${erc20.symbol.toLowerCase()}:${erc20.name}:${erc20.name.toLowerCase()}`}
    />
  )
}
