import { type ChainId } from 'chains';
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains';

import { FALLBACK_ERC20_TOKEN } from '../constants/fallback';
import { type ERC20Asset } from '../types/erc20';
import {
  type SupportedSymbolsBase,
  type SupportedSymbolsMainnet,
  type SupportedSymbolsMode,
  type SupportedSymbolsSepolia,
} from '../types/supported-symbols';
import { getERC20TokensByChainId } from './getERC20TokensByChainId';

const getLookupTable = (chainId: ChainId) =>
  getERC20TokensByChainId(chainId).reduce(
    (obj, token) => Object.assign(obj, { [token.symbol]: token }),
    {}
  );

export type GetERC20TokenBySymbolProps =
  | {
      chainId: typeof base.id;
      symbol: `${SupportedSymbolsBase}`; // If you want to look up an unsupported token use getERC20TokenByAddress instead
    }
  | {
      chainId: typeof foundry.id;
      symbol: `${SupportedSymbolsSepolia}`; // If you want to look up an unsupported token use getERC20TokenByAddress instead
    }
  | {
      chainId: typeof mainnet.id;
      symbol: `${SupportedSymbolsMainnet}`; // If you want to look up an unsupported token use getERC20TokenByAddress instead
    }
  | {
      chainId: typeof mode.id;
      symbol: `${SupportedSymbolsMode}`; // If you want to look up an unsupported token use getERC20TokenByAddress instead
    }
  | {
      chainId: typeof sepolia.id;
      symbol: `${SupportedSymbolsSepolia}`; // If you want to look up an unsupported token use getERC20TokenByAddress instead
    };

export const getERC20TokenBySymbol = ({
  chainId,
  symbol,
}: GetERC20TokenBySymbolProps): ERC20Asset => {
  if (chainId === base.id) {
    const lookupTable = getLookupTable(base.id) as {
      [key in SupportedSymbolsBase]: ERC20Asset;
    };
    return lookupTable[symbol];
  }
  if (chainId === foundry.id) {
    const lookupTable = getLookupTable(sepolia.id) as {
      [key in SupportedSymbolsSepolia]: ERC20Asset;
    };
    return lookupTable[symbol];
  }
  if (chainId === mainnet.id) {
    const lookupTable = getLookupTable(mainnet.id) as {
      [key in SupportedSymbolsMainnet]: ERC20Asset;
    };
    return lookupTable[symbol];
  }
  if (chainId === mode.id) {
    const lookupTable = getLookupTable(mode.id) as {
      [key in SupportedSymbolsMode]: ERC20Asset;
    };
    return lookupTable[symbol];
  }
  if (chainId === sepolia.id) {
    const lookupTable = getLookupTable(sepolia.id) as {
      [key in SupportedSymbolsSepolia]: ERC20Asset;
    };
    return lookupTable[symbol];
  }

  return FALLBACK_ERC20_TOKEN;
};
