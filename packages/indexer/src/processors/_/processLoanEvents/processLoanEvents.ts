import { type Store } from '@subsquid/typeorm-store';
import { type PublicClient } from 'viem';

import { type ChainId } from 'chains';

import { processRecallEvents } from '../processRecallEvents';
import { type BlockEventData } from '../scrapeEvents';
import { handleLoanClose } from './handleLoanClose';
import { handleOpenLoans } from './handleOpenLoans';

export const processLoanEvents = async ({
  chainId,
  closedLoanIds,
  closedPoints,
  openedLoans,
  publicClient,
  recallEvents,
  store,
}: BlockEventData & {
  chainId: ChainId;
  publicClient: PublicClient;
  store: Store;
}) => {
  await handleOpenLoans({ chainId, openedLoans, publicClient, store });
  await processRecallEvents({ chainId, recallEvents, store });
  await handleLoanClose({
    chainId,
    closedLoanIds,
    closedPoints,
    publicClient,
    store,
  });
};
