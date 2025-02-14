import { encodeFunctionData, getAbiItem } from 'viem'

import { type FunctionData } from '@/astaria/types-internal/function-data'

export function prepFunctionData(data: FunctionData): FunctionData {
  const { abi, args, functionName } = data

  //will throw if abi cannot be used to encode args
  encodeFunctionData(data)

  const abiItem = getAbiItem({ abi, args, name: functionName })

  if (abiItem === undefined) {
    throw new Error(`abiItem with functionName of ${functionName} is undefined`)
  }

  return {
    ...data,
    abi: [abiItem],
  }
}
