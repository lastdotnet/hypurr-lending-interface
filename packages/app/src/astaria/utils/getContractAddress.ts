import { getAddress } from 'viem'

import { type ChainId } from 'chains'

import { addressMap } from '@/astaria/config/addresses'
import { type Contracts } from '@/astaria/types-internal/contract-types'

export const getContractAddress = ({
  chainId,
  contractName,
}: {
  chainId: ChainId
  contractName: Contracts
}) => getAddress(addressMap[chainId][contractName])
