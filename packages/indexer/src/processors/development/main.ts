import { type ChainId } from 'chains';

import { isSupportedChain } from '../../utils/index';
import { processChain } from '../processChain';

const chainId = parseInt(process.env.CHAIN_ID ?? '');

if (!isSupportedChain(chainId)) {
  throw new Error('Chain not supported');
}

processChain(chainId as ChainId);
