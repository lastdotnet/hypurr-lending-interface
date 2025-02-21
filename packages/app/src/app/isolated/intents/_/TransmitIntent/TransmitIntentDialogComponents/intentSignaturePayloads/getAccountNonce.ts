import { type Address } from 'viem'

import { type ChainId } from 'chains'

import { Contracts } from '@/astaria/types-internal/contract-types'
import { getContractAddress } from '@/astaria/utils/getContractAddress'
import { getPublicClient } from '@/astaria/utils/getPublicClient'

import { StarportABI } from 'sdk/abi/StarportABI'

export const getAccountNonce = ({
  address,
  chainId,
}: {
  address: Address
  chainId: ChainId
}) => {
  const publicClient = getPublicClient({ chainId })
  return publicClient.readContract({
    abi: StarportABI,
    address: getContractAddress({
      chainId,
      contractName: Contracts.Starport,
    }),
    args: [address],
    functionName: 'caveatNonces',
  })
}
