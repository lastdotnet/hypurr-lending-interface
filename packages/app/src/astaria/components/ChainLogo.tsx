import Image, { type ImageProps } from 'next/image'

import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import { type ChainId } from 'chains'

import BaseImage from '@assets/images/chains/base.svg?url'
import EthereumImage from '@assets/images/chains/ethereum.svg?url'
import ModeImage from '@assets/images/chains/mode.svg?url'
import SepoliaImage from '@assets/images/chains/sepolia.svg?url'
import { SkeletonImage } from '@/astaria/components/SkeletonImage'
import { getChain } from '@/astaria/utils/getChain'

const chainIdToImage: Record<ChainId, string> = {
  [base.id]: BaseImage,
  [foundry.id]: EthereumImage,
  [mainnet.id]: EthereumImage,
  [mode.id]: ModeImage,
  [sepolia.id]: SepoliaImage,
}

interface ChainLogoProps extends Omit<ImageProps, 'alt' | 'src'> {
  alt?: string
  chainId: ChainId | undefined
}

export const ChainLogo = ({ alt, chainId, ...rest }: ChainLogoProps) => {
  if (chainId === undefined) {
    return <SkeletonImage {...rest} />
  }

  const chain = getChain({ chainId })

  return <Image alt={alt || chain.name} className="inline-block" src={chainIdToImage[chainId]} {...rest} />
}
