import { getOriginChainId } from '@/domain/hooks/useOriginChainId'
import { baseSavingsInfoQueryOptions } from '@/domain/savings-info/baseSavingsInfo'
import { useStore } from '@/domain/state'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { assets } from '@/ui/assets'
import { base } from 'viem/chains'
import { AppConfig } from '../feature-flags'
import { PLAYWRIGHT_USDS_CONTRACTS_NOT_AVAILABLE_KEY } from '../wagmi/config.e2e'
import { hyperTestnet } from './constants'
import { ChainConfigEntry, ChainMeta, SupportedChainId } from './types'
import { USDXL_ADDRESS } from '../consts'

const commonTokenSymbolToReplacedName = {
  [TokenSymbol('DAI')]: { name: 'DAI Stablecoin', symbol: TokenSymbol('DAI') },
  [TokenSymbol('USDC')]: { name: 'Circle USD', symbol: TokenSymbol('USDC') },
  [TokenSymbol('wstETH')]: { name: 'Lido Staked ETH', symbol: TokenSymbol('wstETH') },
  [TokenSymbol('rETH')]: { name: 'Rocket Pool Staked ETH', symbol: TokenSymbol('rETH') },
  [TokenSymbol('GNO')]: { name: 'Gnosis Token', symbol: TokenSymbol('GNO') },
  [TokenSymbol('WETH')]: { name: 'Ethereum', symbol: TokenSymbol('ETH') },
  [TokenSymbol('weETH')]: { name: 'Ether.fi Staked ETH', symbol: TokenSymbol('weETH') },
}

const _PLAYWRIGHT_MAINNET_USDS_CONTRACTS_NOT_AVAILABLE =
  import.meta.env.VITE_PLAYWRIGHT === '1' && (window as any)[PLAYWRIGHT_USDS_CONTRACTS_NOT_AVAILABLE_KEY] === true

const chainConfig: Record<SupportedChainId, ChainConfigEntry> = {
  [hyperTestnet.id]: {
    originChainId: hyperTestnet.id,
    daiSymbol: TokenSymbol('USDC'),
    sdaiSymbol: TokenSymbol('USDC'),
    usdsSymbol: undefined,
    susdsSymbol: undefined,
    psmStables: [TokenSymbol('USDC'), TokenSymbol('sUSDe'), TokenSymbol('USDXL')],
    meta: {
      name: 'Hyperliquid EVM Testnet',
      logo: assets.hypurrLogo,
    },
    permitSupport: {
      // [CheckedAddress('0x04f42e29D6057B7D70Ea1cab8E516C0029420B64')]: false, // USDC
      // [CheckedAddress('0xc9Fc065b2e986f29138Bd398E6FaAbd291c58B8E')]: false, // USDT
      // // [CheckedAddress('0x7eA65834587ABF89A94d238a404C4A638Fc7641B')]: false, // WETH
      // [CheckedAddress('0x1A86bA62361DDCc680b2B230c7b3CcF5D777ed7E')]: false, // testWETH
    },
    tokensWithMalformedApprove: [],
    airdrop: {},
    extraTokens: [
      {
        symbol: TokenSymbol('sUSDe'),
        oracleType: 'fixed-usd',
        address: CheckedAddress('0x2222c34a8dd4ea29743bf8ec4ff165e059839782'),
      },
      {
        symbol: TokenSymbol('USDC'),
        oracleType: 'fixed-usd',
        address: CheckedAddress('0x6fdbaf3102efc67cee53eefa4197be36c8e1a094'),
      },
      {
        symbol: TokenSymbol('USDXL'),
        oracleType: 'fixed-usd',
        address: USDXL_ADDRESS,
      },
    ],
    markets: {
      defaultAssetToBorrow: TokenSymbol('USDXL'),
      nativeAssetInfo: {
        nativeAssetName: 'Ethereum',
        nativeAssetSymbol: TokenSymbol('ETH'),
        wrappedNativeAssetSymbol: TokenSymbol('WHYPE'),
        wrappedNativeAssetAddress: CheckedAddress('0x8bf86549d308e50Db889cF843AEBd6b7B0d7BB9a'),
        minRemainingNativeAssetBalance: NormalizedUnitNumber(0.001),
      },
      tokenSymbolToReplacedName: {
        ...commonTokenSymbolToReplacedName,
      },
      oracles: {
        [TokenSymbol('WHYPE')]: {
          type: 'market-price',
          providedBy: ['chainlink', 'chronicle'],
        },
        [TokenSymbol('USDC')]: {
          type: 'fixed',
        },
        [TokenSymbol('sUSDe')]: {
          type: 'fixed',
        },
        [TokenSymbol('USDXL')]: {
          type: 'fixed',
        },
      },
    },
    savings: undefined,
    farms: undefined,
  },
  ...(typeof import.meta.env.VITE_DEV_BASE_DEVNET_RPC_URL === 'string'
    ? {
        [base.id]: {
          originChainId: base.id as SupportedChainId,
          daiSymbol: undefined,
          sdaiSymbol: undefined,
          usdsSymbol: TokenSymbol('USDS'),
          susdsSymbol: TokenSymbol('sUSDS'),
          psmStables: [TokenSymbol('USDC'), TokenSymbol('USDS')],
          meta: {
            name: 'Base DevNet',
            logo: assets.chain.baseDevNet,
          },
          tokensWithMalformedApprove: [],
          permitSupport: {},
          airdrop: {},
          extraTokens: [
            {
              symbol: TokenSymbol('USDC'),
              oracleType: 'fixed-usd',
              address: CheckedAddress('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'),
            },
            {
              symbol: TokenSymbol('sUSDS'),
              oracleType: 'ssr-auth-oracle',
              address: CheckedAddress('0x02Edc8718799a22fCBeBEd0C58a1D09657C81bC8'),
            },
            {
              symbol: TokenSymbol('USDS'),
              oracleType: 'fixed-usd',
              address: CheckedAddress('0x21F5b5dF683B6885D6A88f330C4474ADeE2A6ed3'),
            },
            {
              symbol: TokenSymbol('SKY'),
              oracleType: 'zero-price',
              address: CheckedAddress('0xA40D3Ad0dEdED3df8cDf02108AFf90220C437B82'),
            },
          ] as const,
          markets: undefined,
          savings: {
            savingsDaiInfoQuery: undefined,
            savingsUsdsInfoQuery: baseSavingsInfoQueryOptions,
            inputTokens: [TokenSymbol('USDC'), TokenSymbol('USDS')],
            getEarningsApiUrl: undefined,
            savingsRateApiUrl: undefined,
          },
          farms: undefined,
        } satisfies ChainConfigEntry,
      }
    : {}),
}

export function getChainConfigEntry(chainId: number): ChainConfigEntry {
  const sandboxConfig = useStore.getState().appConfig.sandbox
  const sandbox = useStore.getState().sandbox.network

  const originChainId = getOriginChainId(chainId, sandbox)
  if (originChainId !== chainId) {
    return {
      ...chainConfig[originChainId],
      meta: getSandboxChainMeta(chainConfig[originChainId].meta, sandboxConfig),
    }
  }

  return chainConfig[chainId]
}

function getSandboxChainMeta(originChainMeta: ChainMeta, sandboxConfig: AppConfig['sandbox']): ChainMeta {
  return {
    ...originChainMeta,
    name: sandboxConfig?.chainName || originChainMeta.name,
    logo: assets.magicWandCircle,
  }
}
