import type { Dispatch, SetStateAction } from 'react'
import { useInView } from 'react-intersection-observer'

import { ETHER_DECIMALS } from 'common'
import { type Address } from 'viem'

import { Alert, AlertDescription, AlertTitle } from '@/astaria/components/Alert'
import { getAssetName } from '@/astaria/components/AssetName'
import { ERC20SelectorItemDisplay } from '@/astaria/components/AssetSelector/ERC20Selector/ERC20SelectorItemDisplay'
import { useReadBalance } from '@/astaria/components/AssetSelector/ERC20Selector/useReadBalance'
import { useChainId } from '@/astaria/hooks/useChainId'
import { getChain } from '@/astaria/utils/getChain'

import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { type ERC20Asset, getERC20TokenByAddress } from 'assets'

export const ExternalERC20SelectorItem = ({
  address,
  setAsset,
  setDialogOpen,
}: {
  address: Address
  setAsset: (asset: ERC20Asset) => void
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const chainId = useChainId()
  const { primaryWallet: wallet } = useDynamicContext()

  const userAddress = wallet?.address as Address | undefined

  const { inView, ref } = useInView()

  const { balance, isPending } = useReadBalance({
    enabled: userAddress && inView,
    tokenAddress: address,
    userAddress: userAddress as Address,
  })

  const erc20 = balance ? { ...balance, chainId } : undefined

  if (!isPending && !erc20) {
    const erc20Token = getERC20TokenByAddress({
      address: address.toLowerCase() as Address,
    })
    if (!erc20Token) {
      return null
    }
    const isOnWrongChain = erc20Token.chainId !== chainId

    if (isOnWrongChain) {
      return (
        <>
          <ERC20SelectorItemDisplay
            ref={ref}
            amount={undefined}
            disabled
            erc20={erc20Token}
            isSelected={false}
            value={address.toLowerCase()}
          />
          <Alert tone="destructive">
            <AlertTitle>Wrong network</AlertTitle>
            <AlertDescription>
              {getAssetName({ asset: erc20Token })} is on {getChain({ chainId: erc20Token.chainId }).name}.
            </AlertDescription>
          </Alert>
        </>
      )
    }
  }

  const hasInvalidDecimals = !erc20 || erc20.decimals < 1n || erc20.decimals > ETHER_DECIMALS

  return (
    <>
      <ERC20SelectorItemDisplay
        ref={ref}
        amount={balance?.amount}
        disabled={hasInvalidDecimals}
        erc20={erc20}
        isSelected={false}
        onSelect={() => {
          if (!balance) {
            return
          }

          setAsset({
            address,
            chainId,
            decimals: balance.decimals,
            name: balance.name,
            symbol: balance.symbol,
          })
          setDialogOpen(false)
        }}
        skeleton={isPending}
        value={`${address.toLowerCase()}:${balance?.symbol.toLowerCase()}`}
      />
      {!isPending && hasInvalidDecimals ? (
        <Alert tone="destructive">
          <AlertTitle>Invalid token</AlertTitle>
          <AlertDescription>
            Only tokens that use between 0 and {ETHER_DECIMALS} decimals are supported. {getAssetName({ asset: erc20 })}{' '}
            uses {erc20?.decimals}.
          </AlertDescription>
        </Alert>
      ) : null}
    </>
  )
}
