import { type ChainId } from 'chains';
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains';

const stateSchemaLookup: Record<ChainId, string> = {
  [base.id]: 'base-processor',
  [foundry.id]: 'foundry-processor',
  [mainnet.id]: 'mainnet-processor',
  [mode.id]: 'mode-processor',
  [sepolia.id]: 'sepolia-processor',
};

export const getStateSchema = ({ chainId }: { chainId: ChainId }) =>
  stateSchemaLookup[chainId];
