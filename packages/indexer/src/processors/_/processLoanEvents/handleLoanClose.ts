import { type Store } from '@subsquid/typeorm-store';
import { type PublicClient } from 'viem';

import { type ChainId } from 'chains';

import { archiveBorrowIntents } from '../archiveBorrowIntents';
import { type ClosedPoint } from '../scrapeEvents';
import { closePoints } from './closePoints';
import { deleteBorrowIntents } from './deleteBorrowIntents';
import { deleteClosedLoans } from './deleteClosedLoans';
import { deleteClosedStarportLoans } from './deleteClosedStarportLoans';
import { deleteRecalls } from './deleteRecalls';
import { updateERC20StatsForClosedLoans } from './updateERC20StatsForClosedLoans';

export const handleLoanClose = async ({
  chainId,
  closedLoanIds,
  closedPoints,
  publicClient,
  store,
}: {
  chainId: ChainId;
  closedLoanIds: string[];
  closedPoints: ClosedPoint[];
  publicClient: PublicClient;
  store: Store;
}) => {
  //archive intents before deleting them
  await archiveBorrowIntents({ ids: closedLoanIds, store });

  // Recall intents need to be deleted first, then recalls and finally loans to avoid relation errors
  await deleteBorrowIntents({ closedLoanIds, store });
  await deleteRecalls({ closedLoanIds, store });

  // the update needs the loans to not be deleted
  await updateERC20StatsForClosedLoans({
    chainId,
    closedLoanIds,
    publicClient,
    store,
  });

  return Promise.all([
    deleteClosedStarportLoans({ closedLoanIds, store }),
    deleteClosedLoans({ closedLoanIds, store }),
    closePoints({ closedPoints, store }),
  ]);
};
