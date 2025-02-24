import { type ChainId } from 'chains'
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains'

import { ENV } from '../environment'

//Allows for linting to check for missing chain lookups, while not requiring all rpc urls be set for development mode
const RPCUrlLookup: Record<ChainId, string | undefined> = {
  [base.id]: ENV.RPC_URL_BASE,
  [mode.id]: ENV.RPC_URL_MODE,
  [foundry.id]: ENV.RPC_URL_FOUNDRY,
  [mainnet.id]: ENV.RPC_URL_MAINNET,
  [sepolia.id]: ENV.RPC_URL_SEPOLIA,
}

export const getRPCUrl = (chainId: ChainId) => {
  const rpcUrl = RPCUrlLookup[chainId]
  if (rpcUrl) {
    return rpcUrl
  }
  throw new Error(`RPC_URL not configured for ${chainId}`)
}
