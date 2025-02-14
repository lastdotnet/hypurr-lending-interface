import { lookupArchive } from '@subsquid/archive-registry';
import { type EvmBatchProcessor } from '@subsquid/evm-processor';

import { type ChainId } from 'chains';
import { base, foundry, mainnet, mode, sepolia } from 'viem/chains';

const archiveLabelLookup: Record<
  Exclude<ChainId, typeof foundry.id | typeof mode.id>,
  string
> = {
  [base.id]: 'base-mainnet',
  [sepolia.id]: 'eth-sepolia',
  [mainnet.id]: 'eth-mainnet',
};

export function configureArchive({
  chainId,
  processor,
}: {
  chainId: ChainId;
  processor: EvmBatchProcessor;
}) {
  //No archive for local chain or blast(yet)
  if (chainId === foundry.id || chainId === mode.id) {
    console.log(`no archive for chain ${chainId}`);
    return;
  }

  // Add archive source for remote chains for faster historical sync
  processor.setGateway(lookupArchive(archiveLabelLookup[chainId]));
}
