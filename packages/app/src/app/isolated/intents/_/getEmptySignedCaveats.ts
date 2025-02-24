import { zeroHash } from 'viem'

import { type AbiParametersToPrimitiveTypes, type ExtractAbiFunction } from 'abitype'

import { type StarportABI } from 'sdk/abi/StarportABI'

type StarportContractOriginationParameters = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof StarportABI, 'originate'>['inputs']
>
export type StarportContractSignedCaveats = StarportContractOriginationParameters[1]

export const getEmptySignedCaveats = (): StarportContractSignedCaveats => ({
  caveats: [],
  deadline: 0n,
  salt: zeroHash,
  signature: zeroHash,
  singleUse: false,
})
