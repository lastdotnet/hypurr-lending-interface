import { type Dispatch, type SetStateAction } from 'react'

import { type Address, isAddress, zeroAddress } from 'viem'

import { ERC20SelectorItem } from '@/astaria/components/AssetSelector/ERC20Selector/ERC20SelectorItem'
import { ExternalERC20SelectorItem } from '@/astaria/components/AssetSelector/ERC20Selector/ExternalERC20SelectorItem'
import { isSelectingExternalERC20 } from '@/astaria/components/AssetSelector/ERC20Selector/isSelectingExternalERC20'
import { useBatchedBalances } from '@/astaria/components/AssetSelector/ERC20Selector/useBatchedBalances'
import { useERC20Tokens } from '@/astaria/components/AssetSelector/ERC20Selector/useERC20Tokens'
import { getERC20sWithBalance } from '@/astaria/utils/erc20sWithBalance'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { type ERC20Asset, type IntentAsset } from 'assets'

export const ERC20SelectorItems = ({
  asset,
  query,
  setAsset,
  setDialogOpen,
  type,
}: {
  asset: IntentAsset
  query: string | undefined
  setAsset: (asset: ERC20Asset) => void
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  type: 'borrow' | 'collateral' | 'deposit'
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const userAddress = wallet?.address as Address | undefined

  const { erc20s } = useERC20Tokens({ type })

  const queryIsSelectingExternalERC20 = isSelectingExternalERC20({
    asset,
    erc20s,
    query,
  })

  const selectedAddress = !!query && isAddress(query) ? query : asset.address

  const { balances } = useBatchedBalances({
    enabled: !!userAddress && !!erc20s,
    tokenAddresses: erc20s?.map((erc20) => erc20.address) || [zeroAddress],
    userAddress: userAddress as Address,
  })

  const { erc20sWithBalance, erc20sWithoutBalance } = getERC20sWithBalance({
    balances,
    erc20s,
  })

  const sortedTokens = [...erc20sWithBalance, ...erc20sWithoutBalance]

  return (
    <>
      {queryIsSelectingExternalERC20 ? (
        <ExternalERC20SelectorItem address={selectedAddress} setAsset={setAsset} setDialogOpen={setDialogOpen} />
      ) : null}
      {sortedTokens.map((erc20) => (
        <ERC20SelectorItem
          key={erc20.address}
          asset={asset}
          erc20={erc20}
          setAsset={setAsset}
          setDialogOpen={setDialogOpen}
        />
      ))}
    </>
  )
}
