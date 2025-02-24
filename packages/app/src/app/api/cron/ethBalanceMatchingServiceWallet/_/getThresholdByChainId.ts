import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import { numberToBigInt } from 'common'

const MIN_BALANCE_BY_CHAIN = {
  [base.id]: numberToBigInt({ amount: 0.05 }),
  [foundry.id]: 0n,
  [mainnet.id]: numberToBigInt({ amount: 0.2 }),
  [mode.id]: numberToBigInt({ amount: 0.05 }),
  [sepolia.id]: 0n,
} as const

type KEEPER_CHAIN_ID = keyof typeof MIN_BALANCE_BY_CHAIN

export const getThresholdByChainId = (chainId: KEEPER_CHAIN_ID) => MIN_BALANCE_BY_CHAIN[chainId]
