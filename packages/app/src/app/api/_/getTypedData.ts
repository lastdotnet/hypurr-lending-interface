import { type Address, type Hex } from 'viem'

import { type ChainId } from 'chains'

import { Contracts } from '@/astaria/types-internal/contract-types'
import { getContractAddress } from '@/astaria/utils/getContractAddress'

import { type Caveat, type TypedData, TypedDataSchema } from 'sdk'

const types = {
  Caveat: [
    {
      name: 'enforcer',
      type: 'address',
    },
    {
      name: 'data',
      type: 'bytes',
    },
  ],
  Origination: [
    {
      name: 'account',
      type: 'address',
    },
    {
      name: 'accountNonce',
      type: 'uint256',
    },
    {
      name: 'singleUse',
      type: 'bool',
    },
    {
      name: 'salt',
      type: 'bytes32',
    },
    {
      name: 'deadline',
      type: 'uint256',
    },
    {
      name: 'caveats',
      type: 'Caveat[]',
    },
  ],
} as const

export const getTypedData = ({
  account,
  accountNonce,
  caveats,
  chainId,
  deadline,
  salt,
  singleUse,
}: {
  account: Address
  accountNonce: bigint
  caveats: Caveat[]
  chainId: ChainId
  deadline: bigint
  salt: Hex
  singleUse: boolean
}) => {
  const transformedTypedData: TypedData<'Origination'> = {
    domain: {
      chainId,
      name: 'Starport',
      verifyingContract: getContractAddress({
        chainId,
        contractName: Contracts.Starport,
      }),
      version: '0',
    },
    message: {
      account,
      accountNonce,
      caveats,
      deadline,
      salt,
      singleUse,
    },
    primaryType: 'Origination',
    types,
  }
  return TypedDataSchema.parse(transformedTypedData) as TypedData<'Origination'>
}
