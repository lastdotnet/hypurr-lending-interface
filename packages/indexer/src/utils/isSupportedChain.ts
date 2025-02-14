import { type ChainId, supportedChains } from 'chains';

import { ENV } from '../environment';

export const SUPPORTED_CHAINS = supportedChains[ENV.RAILWAY_ENVIRONMENT_NAME];

export const isSupportedChain = (chainId: number): chainId is ChainId =>
  SUPPORTED_CHAINS.some((chain) => chain.id === chainId);
