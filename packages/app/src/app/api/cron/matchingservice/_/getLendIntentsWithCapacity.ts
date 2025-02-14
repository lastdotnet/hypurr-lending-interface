import { type Address, type PublicClient, erc20Abi } from 'viem'

import type {
  LenderIntent,
  LenderIntentWithCapacity,
  SignedCaveatWithOwnerAndId,
} from '@/app/api/cron/matchingservice/_/types'

import { type StarportLoan } from 'sdk'

export const getCapacity = ({
  allowance,
  balance,
  lendIntent,
}: {
  allowance: bigint
  balance: bigint
  lendIntent: LenderIntent
}) => {
  const capacity = allowance > balance ? balance : allowance
  if (lendIntent.maxAmount < capacity) {
    return lendIntent.maxAmount
  }
  return capacity
}

export const getLendIntentsWithCapacity = async ({
  lendIntents,
  publicClient,
  starport,
  transactionParametersMap,
}: {
  lendIntents: LenderIntent[]
  publicClient: PublicClient
  starport: Address
  transactionParametersMap: Map<string, SignedCaveatWithOwnerAndId | StarportLoan>
}): Promise<LenderIntentWithCapacity[]> => {
  const lendIntentsWithCapacity = lendIntents.map(async (lendIntent: LenderIntent) => {
    const caveat = transactionParametersMap.get(lendIntent.id)

    if (!caveat || 'collateral' in caveat) {
      throw new Error('Caveat undefined')
    }
    // modify logic for CCA
    // singleUse
    const allowance = await publicClient.readContract({
      abi: erc20Abi,
      address: lendIntent.borrow[0].token,
      args: [caveat.owner, starport],
      functionName: 'allowance',
    })
    const balance = await publicClient.readContract({
      abi: erc20Abi,
      address: lendIntent.borrow[0].token,
      args: [caveat.owner],
      functionName: 'balanceOf',
    })

    return {
      ...lendIntent,
      capacity: getCapacity({ allowance, balance, lendIntent }),
      singleUse: caveat.singleUse,
    }
  })
  return Promise.all(lendIntentsWithCapacity)
}
