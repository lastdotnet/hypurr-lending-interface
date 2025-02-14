import { readFileSync } from 'fs';

import { type ChainId } from 'chains';
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains';

import { ENV } from '../environment';

const BASE_START_BLOCK = 10932629;
const MAINNET_START_BLOCK = 19769275;
const MODE_START_BLOCK = 6821389;
const SEPOLIA_START_BLOCK = 5344415;

const BASE_INTENT_FILL_BONUS_START_BLOCK = 13828797;
const MODE_INTENT_FILL_BONUS_START_BLOCK = 7179758;
const SEPOLIA_INTENT_FILL_BONUS_START_BLOCK = 5821084;
const GENESIS_BLOCK = 0;

const startBlockLookup: Record<ChainId, number> = {
  [mainnet.id]: MAINNET_START_BLOCK,
  [foundry.id]: GENESIS_BLOCK,
  [base.id]: BASE_START_BLOCK,
  [mode.id]: MODE_START_BLOCK,
  [sepolia.id]: SEPOLIA_START_BLOCK,
};

const intentFillStartBlockLookup: Record<ChainId, number> = {
  [mainnet.id]: GENESIS_BLOCK,
  [foundry.id]: GENESIS_BLOCK,
  [base.id]: BASE_INTENT_FILL_BONUS_START_BLOCK,
  [mode.id]: MODE_INTENT_FILL_BONUS_START_BLOCK,
  [sepolia.id]: SEPOLIA_INTENT_FILL_BONUS_START_BLOCK,
};

export const getIntentFillStartBlock = ({ chainId }: { chainId: ChainId }) =>
  intentFillStartBlockLookup[chainId];

export const getStartBlock = ({ chainId }: { chainId: ChainId }) => {
  //if forking, use anvil start block
  if (ENV.FORK_URL) {
    return parseInt(readFileSync('./src/anvil-start-block.txt').toString()) + 1;
  }

  return startBlockLookup[chainId];
};
