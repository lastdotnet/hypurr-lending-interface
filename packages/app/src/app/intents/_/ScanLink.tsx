import { type Address } from 'viem'
import { base, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

import { TextLink } from '@/astaria/components/TextLink'
import { DEFAULT_CHAIN } from '@/astaria/constants/chains'

import { type Asset, type IntentAsset } from 'assets'

type BlockExporer = { name: string; url: string }

const constructScanHref = ({
  blockExplorer,
  tokenAddress,
}: {
  blockExplorer: BlockExporer
  tokenAddress?: Address
}) => {
  if (!tokenAddress) {
    return ''
  }
  return `${blockExplorer.url}/address/${tokenAddress}`
}

export const getScanDetails = ({
  asset,
  chainId,
}: {
  asset: Asset | IntentAsset | undefined
  chainId: ChainId | undefined
}) => {
  let blockExplorer: BlockExporer = DEFAULT_CHAIN.blockExplorers.default

  if (chainId === base.id) {
    blockExplorer = base.blockExplorers.default
  }
  if (chainId === mainnet.id) {
    blockExplorer = mainnet.blockExplorers.default
  }
  if (chainId === mode.id) {
    blockExplorer = mode.blockExplorers.default
  }
  if (chainId === sepolia.id) {
    blockExplorer = sepolia.blockExplorers.default
  }
  return {
    href: constructScanHref({
      blockExplorer,
      tokenAddress: asset?.address,
    }),
    name: blockExplorer.name,
  }
}

export const ScanLink = ({
  asset,
  chainId,
}: {
  asset: Asset | IntentAsset | undefined
  chainId: ChainId | undefined
}) => {
  const { href, name } = getScanDetails({ asset, chainId })
  return <TextLink href={href}>{name}</TextLink>
}
