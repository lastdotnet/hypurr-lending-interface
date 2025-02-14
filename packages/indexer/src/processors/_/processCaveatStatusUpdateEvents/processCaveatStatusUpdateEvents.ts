import { type Store } from '@subsquid/typeorm-store';

import { type ChainId } from 'chains';

import { BorrowIntent, LendIntent } from '../../../model';
import { archiveBorrowIntents } from '../archiveBorrowIntents';
import { archiveLendIntents } from '../archiveLendIntents';
import type {
  CaveatNonceIncremented,
  FilledCaveat,
  InvalidatedUserSalt,
} from './types';
import { updateFilledCaveats } from './updateFilledCaveats';
import { updateIncrementedNonces } from './updateIncrementedNonces';
import { updateInvalidatedSalts } from './updateInvalidatedSalts';

export const processCaveatStatusUpdateEvents = async ({
  chainId,
  filledCaveats,
  incrementedNonces,
  invalidatedUserSalts,
  store,
}: {
  chainId: ChainId;
  filledCaveats: FilledCaveat[];
  incrementedNonces: CaveatNonceIncremented[];
  invalidatedUserSalts: InvalidatedUserSalt[];
  store: Store;
}) => {
  const idsToDelete = await Promise.all([
    updateFilledCaveats({ chainId, filledCaveats, store }),
    updateInvalidatedSalts({ invalidatedUserSalts, store }),
    updateIncrementedNonces({ incrementedNonces, store }),
  ]).then((result) => result.flat());

  if (idsToDelete.length === 0) {
    return;
  }

  //archive intents before deleting them
  await Promise.all([
    archiveBorrowIntents({ ids: idsToDelete, store }),
    archiveLendIntents({ ids: idsToDelete, store }),
  ]);

  //remove all associated offers/intents
  return Promise.all([
    store.remove(BorrowIntent, idsToDelete),
    store.remove(LendIntent, idsToDelete),
  ]);
};
