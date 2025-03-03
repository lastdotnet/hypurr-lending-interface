import { Page } from '@playwright/test'
import { Address, Hash, parseEther, parseUnits } from 'viem'

import { Path, paths } from '@/config/paths'
import { BaseUnitNumber } from '@/domain/types/NumericValues'

import { tenderlyRpcActions } from '@/domain/tenderly/TenderlyRpcActions'
import { AssetsInTests, TOKENS_ON_FORK } from './constants'
import { ForkContext } from './forking/setupFork'
import { injectFixedDate, injectFlags, injectNetworkConfiguration, injectWalletConfiguration } from './injectSetup'
import { generateAccount } from './utils'

export type InjectableWallet = { address: Address } | { privateKey: string }
export function buildUrl<T extends Path>(key?: T, pathParams?: Record<string, string>): string {
  const pathTemplate = key && paths[key] // Get the path template from paths, correctly inferred.

  let pathWithParams = pathTemplate

  if (pathParams && pathTemplate) {
    // Iterate over pathParams and replace placeholders in the template.
    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(pathParams).forEach(([paramKey, paramValue]) => {
      const paramPlaceholder = `:${paramKey}`
      if (pathWithParams?.includes(paramPlaceholder)) {
        pathWithParams = pathWithParams?.replace(paramPlaceholder, paramValue) as any
      }
    })
  }

  return `http://localhost:4000${pathWithParams}`
}

export type AssetBalances = Partial<Record<AssetsInTests, number>>
export type ConnectionType = 'not-connected' | 'connected-random' | 'connected-pkey' | 'connected-address'
export type AccountOptions<T extends ConnectionType> = T extends 'not-connected'
  ? {
      type: T
    }
  : T extends 'connected-random'
    ? {
        type: T
        assetBalances?: Partial<Record<AssetsInTests, number>>
      }
    : T extends 'connected-pkey'
      ? {
          type: T
          privateKey: Hash
          assetBalances?: Partial<Record<AssetsInTests, number>>
        }
      : T extends 'connected-address'
        ? {
            type: T
            address: Address
            assetBalances?: Partial<Record<AssetsInTests, number>>
          }
        : never

export interface SetupOptions<K extends Path, T extends ConnectionType> {
  initialPage?: K
  initialPageParams?: Record<string, string>
  account: AccountOptions<T>
  skipInjectingNetwork?: boolean
}

export type SetupReturn<T extends ConnectionType> = T extends 'not-connected'
  ? {
      getLogs: () => string[]
    }
  : {
      account: Address
      getLogs: () => string[]
    }

// should be called at the beginning of any test
export async function setup<K extends Path, T extends ConnectionType>(
  page: Page,
  forkContext: ForkContext,
  options: SetupOptions<K, T>,
): Promise<SetupReturn<T>> {
  if (options.skipInjectingNetwork === true) {
    // if explicitly disabled, do not inject network config abort all network requests to RPC providers
    await page.route(/alchemy/, (route) => route.abort())
    await page.route(/rpc.ankr/, (route) => route.abort())
  } else {
    await injectNetworkConfiguration(page, forkContext.forkUrl, forkContext.chainId)
  }
  await injectFixedDate(page, forkContext.simulationDate)
  await injectFlags(page, forkContext)
  let address: Address | undefined

  if (options.account.type !== 'not-connected') {
    if (options.account.type === 'connected-random') {
      const account = generateAccount({ privateKey: undefined })
      address = account.address
      await injectWalletConfiguration(page, account)
      await injectFunds(forkContext, account.address, options.account.assetBalances)
    }
    if (options.account.type === 'connected-pkey') {
      const account = generateAccount({ privateKey: options.account.privateKey })
      address = account.address
      await injectWalletConfiguration(page, account)
      await injectFunds(forkContext, account.address, options.account.assetBalances)
    }
    if (options.account.type === 'connected-address') {
      address = options.account.address
      await injectWalletConfiguration(page, { address })
    }
  }

  const errorLogs = [] as string[]

  page.on('console', (message) => {
    if (message.type() === 'error') {
      errorLogs.push(message.text())
    }
  })

  await page.goto(buildUrl(options.initialPage, options.initialPageParams))

  return {
    account: address,
    getLogs: () => errorLogs,
  } as any
}

export async function injectFunds(
  forkContext: ForkContext,
  address: Address,
  assetBalances?: AssetBalances,
): Promise<void> {
  if (!assetBalances) {
    return
  }

  if (forkContext.isVnet) {
    const promises = Object.entries(assetBalances).map(async ([tokenName, balance]) => {
      if (tokenName === 'ETH' || tokenName === 'XDAI') {
        await tenderlyRpcActions.setBalance(
          forkContext.forkUrl,
          address,
          BaseUnitNumber(parseEther(balance.toString())),
        )
      } else {
        await tenderlyRpcActions.setTokenBalance(
          forkContext.forkUrl,
          (TOKENS_ON_FORK as any)[forkContext.chainId][tokenName].address,
          address,
          BaseUnitNumber(
            parseUnits(balance.toString(), (TOKENS_ON_FORK as any)[forkContext.chainId][tokenName].decimals),
          ),
        )
      }
    })
    await Promise.all(promises)
  } else {
    // todo remove once we only support vnets
    for (const [tokenName, balance] of Object.entries(assetBalances)) {
      if (tokenName === 'ETH' || tokenName === 'XDAI') {
        await tenderlyRpcActions.setBalance(
          forkContext.forkUrl,
          address,
          BaseUnitNumber(parseEther(balance.toString())),
        )
      } else {
        await tenderlyRpcActions.setTokenBalance(
          forkContext.forkUrl,
          (TOKENS_ON_FORK as any)[forkContext.chainId][tokenName].address,
          address,
          BaseUnitNumber(
            parseUnits(balance.toString(), (TOKENS_ON_FORK as any)[forkContext.chainId][tokenName].decimals),
          ),
        )
      }
    }
  }
}
