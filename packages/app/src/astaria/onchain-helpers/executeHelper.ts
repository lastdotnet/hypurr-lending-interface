import { type PublicClient, decodeFunctionResult, encodeDeployData } from 'viem'

import {
  type Abi,
  type AbiParameterToPrimitiveType,
  type AbiParametersToPrimitiveTypes,
  type ExtractAbiFunction,
  type ExtractAbiFunctionNames,
  type Narrow,
} from 'abitype'
import { type ChainId } from 'chains'

import { getPublicClient } from '@/astaria/utils/getPublicClient'

export type ExecuteHelperProps<
  TAbi extends Abi,
  TArgs extends AbiParametersToPrimitiveTypes<Extract<TAbi[number], { type: 'constructor' }>['inputs']>,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = {
  abi: Narrow<TAbi>
  args: TArgs
  bytecode: `0x${string}`
  chainId: ChainId
  /** The contract function which return type is being used to decode the data */
  functionName: TFunctionName
  publicClient?: PublicClient
}

export type ExecuteHelperReturnType<
  TAbi extends Abi,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
> = AbiParameterToPrimitiveType<ExtractAbiFunction<TAbi, TFunctionName>['outputs'][0]>

export async function executeHelper<
  TAbi extends Abi,
  TArgs extends AbiParametersToPrimitiveTypes<Extract<TAbi[number], { type: 'constructor' }>['inputs']>,
  TFunctionName extends ExtractAbiFunctionNames<TAbi>,
>({
  abi,
  args,
  bytecode,
  chainId,
  functionName,
  publicClient,
}: ExecuteHelperProps<TAbi, TArgs, TFunctionName>): Promise<ExecuteHelperReturnType<TAbi, TFunctionName>> {
  const deployData = encodeDeployData<Abi>({
    abi,
    args: args as readonly unknown[],
    bytecode,
  })

  const client = publicClient ?? getPublicClient({ chainId })

  const { data } = await client.call({
    data: deployData,
  })

  if (!data) {
    throw new Error('HELPER_CALL_FAILED')
  }

  return decodeFunctionResult<Abi, string>({
    abi,
    data,
    functionName,
  }) as ExecuteHelperReturnType<TAbi, TFunctionName>
}
