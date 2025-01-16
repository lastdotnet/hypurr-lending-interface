import { getOriginChainId } from '@/domain/hooks/useOriginChainId'
import { useStore } from '@/domain/state'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { assets } from '@/ui/assets'
import { AppConfig } from '../feature-flags'
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
  [TokenSymbol('SolvBTC')]: { name: 'SolvBTC', symbol: TokenSymbol('SolvBTC') },
}

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
      logo: assets.hyperEvmLogo,
    },
    permitSupport: {
      [CheckedAddress('0x2222c34a8dd4ea29743bf8ec4ff165e059839782')]: true, // sUSDe
      [CheckedAddress('0x6fdbaf3102efc67cee53eefa4197be36c8e1a094')]: true, // USDC
      [USDXL_ADDRESS]: true, // USDXL
      [CheckedAddress('0x8bf86549d308e50Db889cF843AEBd6b7B0d7BB9a')]: false, // WHYPE
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
        oracleType: 'fixed-usd',
        address: CheckedAddress('0x4B85aCF84b2593D67f6593D18504dBb3A337D3D8'),
      },
      {
        symbol: TokenSymbol('stTESTH'),
        oracleType: 'fixed-usd',
        address: CheckedAddress('0xe2fbc9cb335a65201fcde55323ae0f4e8a96a616'),
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
        nativeAssetName: 'Hype',
        nativeAssetSymbol: TokenSymbol('HYPE'),
        wrappedNativeAssetSymbol: TokenSymbol('WHYPE'),
        wrappedNativeAssetAddress: CheckedAddress('0xa42aa6a5a373dC4bD140eC20efeE5C669f9883f9'),
        minRemainingNativeAssetBalance: NormalizedUnitNumber(0.001),
      },
      tokenSymbolToReplacedName: {
        ...commonTokenSymbolToReplacedName,
      },
      oracles: {
        [TokenSymbol('WHYPE')]: {
          type: 'market-price',
          providedBy: [],
        },
        [TokenSymbol('SolvBTC')]: {
          type: 'market-price',
          providedBy: [],
        },
        [TokenSymbol('stTESTH')]: {
          type: 'market-price',
          providedBy: [],
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
