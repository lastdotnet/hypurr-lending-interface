import { getOriginChainId } from '@/domain/hooks/useOriginChainId'
import { useStore } from '@/domain/state'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { assets } from '@/ui/assets'
import { base } from 'viem/chains'
import { USDXL_ADDRESS } from '../consts'
import { AppConfig } from '../feature-flags'
import { hyperEVM, hyperTestnet } from './constants'
import { ChainConfigEntry, ChainMeta, SupportedChainId } from './types'

const commonTokenSymbolToReplacedName = {
  [TokenSymbol('USDC')]: { name: 'Circle USD', symbol: TokenSymbol('USDC') },
  [TokenSymbol('SolvBTC')]: { name: 'SolvBTC', symbol: TokenSymbol('SolvBTC') },
}

const chainConfig: Record<SupportedChainId, ChainConfigEntry> = {
  [hyperTestnet.id]: {
    originChainId: hyperTestnet.id,
    daiSymbol: undefined,
    sdaiSymbol: undefined,
    usdsSymbol: undefined,
    susdsSymbol: undefined,
    psmStables: [TokenSymbol('USDC'), TokenSymbol('sUSDe'), TokenSymbol('USDXL')],
    meta: {
      name: 'Hyperliquid EVM Testnet',
      logo: assets.hyperEvmLogo,
    },
    permitSupport: {
      [CheckedAddress('0x2222c34a8dd4ea29743bf8ec4ff165e059839782')]: true, // sUSDe
      [CheckedAddress('0x6fdbaf3102efc67cee53eefa4197be36c8e1a094')]: true, // USDC
      [USDXL_ADDRESS]: true, // USDXL
      [CheckedAddress('0x702aB9B6556020F5c7AC814162Cb641d64291144')]: false, // WHYPE
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
        symbol: TokenSymbol('SolvBTC'),
        oracleType: 'zero-price',
        address: CheckedAddress('0x4B85aCF84b2593D67f6593D18504dBb3A337D3D8'),
      },
      {
        symbol: TokenSymbol('stTESTH'),
        oracleType: 'zero-price',
        address: CheckedAddress('0xe2fbc9cb335a65201fcde55323ae0f4e8a96a616'),
      },
      {
        symbol: TokenSymbol('USDXL'),
        oracleType: 'fixed-usd',
        address: USDXL_ADDRESS,
      },
      {
        symbol: TokenSymbol('KHYPE'),
        oracleType: 'zero-price',
        address: CheckedAddress('0x2ca0f62dceae63ef25a59f4abfec83264df204c1'),
      },
    ],
    markets: {
      defaultAssetToBorrow: TokenSymbol('USDXL'),
      nativeAssetInfo: {
        nativeAssetName: 'Hype',
        nativeAssetSymbol: TokenSymbol('HYPE'),
        wrappedNativeAssetSymbol: TokenSymbol('WHYPE'),
        wrappedNativeAssetAddress: CheckedAddress('0x702aB9B6556020F5c7AC814162Cb641d64291144'),
        minRemainingNativeAssetBalance: NormalizedUnitNumber(0.001),
      },
      tokenSymbolToReplacedName: {
        ...commonTokenSymbolToReplacedName,
      },
      oracles: {
        [TokenSymbol('WHYPE')]: {
          type: 'market-price',
          providedBy: ['redstone'],
        },
        [TokenSymbol('SolvBTC')]: {
          type: 'market-price',
          providedBy: ['redstone'],
        },
        [TokenSymbol('stTESTH')]: {
          type: 'market-price',
          providedBy: ['redstone'],
        },
        [TokenSymbol('KHYPE')]: {
          type: 'market-price',
          providedBy: ['redstone'],
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
  [hyperEVM.id]: {
    originChainId: hyperEVM.id,
    daiSymbol: undefined,
    sdaiSymbol: undefined,
    usdsSymbol: undefined,
    susdsSymbol: undefined,
    psmStables: [TokenSymbol('USDC')],
    meta: {
      name: 'Hyperliquid EVM',
      logo: assets.hyperEvmLogo,
    },
    permitSupport: {},
    tokensWithMalformedApprove: [],
    airdrop: {},
    extraTokens: [],
    markets: {
      defaultAssetToBorrow: TokenSymbol('WHYPE'),
      nativeAssetInfo: {
        nativeAssetName: 'Hype',
        nativeAssetSymbol: TokenSymbol('HYPE'),
        wrappedNativeAssetSymbol: TokenSymbol('WHYPE'),
        wrappedNativeAssetAddress: CheckedAddress('0x5555555555555555555555555555555555555555'),
        minRemainingNativeAssetBalance: NormalizedUnitNumber(0.001),
      },
      tokenSymbolToReplacedName: {
        ...commonTokenSymbolToReplacedName,
      },
      oracles: {
        [TokenSymbol('WHYPE')]: {
          type: 'market-price',
          providedBy: ['pyth'],
        },
      },
    },
    savings: undefined,
    farms: undefined,
  },
  [base.id]: {
    originChainId: base.id,
    daiSymbol: undefined,
    sdaiSymbol: undefined,
    usdsSymbol: undefined,
    susdsSymbol: undefined,
    psmStables: [TokenSymbol('USDC')],
    meta: {
      name: 'Base',
      logo: assets.hyperEvmLogo,
    },
    permitSupport: {},
    tokensWithMalformedApprove: [],
    airdrop: {},
    extraTokens: [],
    markets: undefined,
    savings: undefined,
    farms: undefined,
  },
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
