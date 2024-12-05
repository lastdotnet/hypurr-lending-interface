import { http, Chain, Transport, custom } from 'viem'
import { VIEM_TIMEOUT_ON_FORKS } from './config.e2e'
import { getInjectedNetwork } from './getInjectedNetwork'
import { hyperTestnet } from '../chain/constants'

export interface GetTransportsParamsOptions {
  forkChain?: Chain
  baseDevNetChain?: Chain
}

export type GetTransportsResult = Record<number, Transport>

interface JsonRpcResponse {
  jsonrpc: '2.0'
  id: number
  result?: any
  error?: {
    message: string
    code?: number
  }
}

let requestId = 0
const customRpc = {
  async request(method: string, params: any[]) {
    requestId += 1

    const response = await fetch(hyperTestnet.rpcUrls.default.http[0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: requestId,
        method,
        params,
      }),
    })

    const data = (await response.json()) as JsonRpcResponse

    if (data.error) {
      throw new Error(data.error.message)
    }
    return data.result
  },
}

export function getTransports({ forkChain, baseDevNetChain }: GetTransportsParamsOptions): GetTransportsResult {
  const transports: Record<number, Transport> = {
    [hyperTestnet.id]: custom({
      async request({ method, params }) {
        const response = await customRpc.request(method, params)
        return response
      },
    }),
  }

  if (forkChain) {
    transports[forkChain.id] = http(forkChain.rpcUrls.default.http[0], { timeout: VIEM_TIMEOUT_ON_FORKS })
  }

  if (baseDevNetChain) {
    transports[baseDevNetChain.id] = http(baseDevNetChain.rpcUrls.default.http[0])
  }

  if (import.meta.env.VITE_FEATURE_RPC_INJECTION_VIA_URL === '1') {
    const injectedNetwork = getInjectedNetwork()
    if (injectedNetwork) {
      transports[injectedNetwork.chainId] = http(injectedNetwork.rpc)
    }
  }

  return transports
}
