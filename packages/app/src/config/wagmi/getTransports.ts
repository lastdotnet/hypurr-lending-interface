import { http, Chain, Transport, custom } from 'viem'
import { VIEM_TIMEOUT_ON_FORKS } from '@/config/consts'
import { getInjectedNetwork } from './getInjectedNetwork'
import { hyperEVM, hyperTestnet } from '../chain/constants'
import { HTTPConnectionError, StreamExhaustionError, ConnectionTimeoutError } from '@/domain/errors/ConnectionErrors'

export interface GetTransportsParamsOptions {
  forkChain?: Chain
  baseDevNetChain?: Chain
}

export type GetTransportsResult = Record<number, Transport>

interface JsonRpcResponse {
  jsonrpc: string
  id: number
  result?: any
  error?: {
    message: string
    code?: number
  }
}

interface Connection {
  activeStreams: number
  lastUsed: number
  controller: AbortController
}

// Connection pool to manage HTTP/2 streams
const connectionPool = new Map<string, Connection>();

const MAX_STREAMS_PER_CONNECTION = 100;
const CONNECTION_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;

const customRpc = {
  async request(url: string, method: string, params: unknown[]): Promise<unknown> {
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
      try {
        const connection = await this.getConnection(url);
        return await this.makeRequest(url, method, params, connection);
      } catch (error) {
        retries++;
        if (error instanceof StreamExhaustionError || error instanceof ConnectionTimeoutError) {
          if (retries === MAX_RETRIES) throw error;
          await this.resetConnection(url);
          continue;
        }
        throw error;
      }
    }
  },

  async getConnection(url: string): Promise<Connection> {
    const now = Date.now();
    let connection = connectionPool.get(url);

    // Clean up stale connections
    if (connection && (now - connection.lastUsed > CONNECTION_TIMEOUT)) {
      await this.resetConnection(url);
      connection = undefined;
    }

    if (!connection) {
      connection = {
        activeStreams: 0,
        lastUsed: now,
        controller: new AbortController()
      };
      connectionPool.set(url, connection);
    }

    if (connection.activeStreams >= MAX_STREAMS_PER_CONNECTION) {
      throw new StreamExhaustionError();
    }

    connection.activeStreams++;
    connection.lastUsed = now;
    return connection;
  },

  async resetConnection(url: string): Promise<void> {
    const connection = connectionPool.get(url);
    if (connection) {
      connection.controller.abort();
      connectionPool.delete(url);
    }
  },

  async makeRequest(url: string, method: string, params: unknown[], connection: Connection): Promise<unknown> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: Date.now(),
          method,
          params,
        }),
        signal: connection.controller.signal,
      });

      if (!response.ok) {
        throw new HTTPConnectionError(`HTTP error: ${response.status}`);
      }

      const data = await response.json() as JsonRpcResponse;

      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.result;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('aborted')) {
        throw new ConnectionTimeoutError();
      }
      throw error;
    }
  }
};

export function getTransports({ forkChain, baseDevNetChain }: GetTransportsParamsOptions): GetTransportsResult {
  const transports: Record<number, Transport> = {
    [hyperTestnet.id]: custom({
      async request({ method, params }) {
        const response = await customRpc.request(hyperTestnet.rpcUrls.default.http[0], method, params)
        return response
      },
    }),
    [hyperEVM.id]: custom({
      async request({ method, params }) {
        const response = await customRpc.request(hyperEVM.rpcUrls.default.http[0], method, params)
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

  if (process.env.NEXT_PUBLIC_FEATURE_RPC_INJECTION_VIA_URL === '1') {
    const injectedNetwork = getInjectedNetwork()
    if (injectedNetwork) {
      transports[injectedNetwork.chainId] = http(injectedNetwork.rpc)
    }
  }

  return transports
}
