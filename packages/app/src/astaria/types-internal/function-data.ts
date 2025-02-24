import type { Abi, Address, EncodeFunctionDataParameters } from 'viem'

export type FunctionData = EncodeFunctionDataParameters<Abi, string> & {
  account?: Address | undefined
  address: Address
  functionName: string
}
