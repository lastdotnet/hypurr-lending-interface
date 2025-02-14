import { type Store } from '@subsquid/typeorm-store';
import { ILike } from 'typeorm';

import { type ChainId } from 'chains';

import { CaveatStatus, SignedCaveat } from '../../../model';
import { type FilledCaveat } from './types';
import { updateCaveatStatus } from './updateCaveatStatus';
import { updateInvalidatedSalts } from './updateInvalidatedSalts';

export const updateFilledCaveats = async ({
  filledCaveats,
  store,
}: {
  chainId: ChainId;
  filledCaveats: FilledCaveat[];
  store: Store;
}): Promise<string[]> => {
  if (filledCaveats.length === 0) {
    return [];
  }

  console.log(`Filling ${filledCaveats.length} caveats(s).`);

  const filledIdsToDelete: string[] = [];
  //await to avoid race condition on status field w/ active record pattern
  await Promise.all(
    filledCaveats.map(async ({ hash, owner }) => {
      //find caveat by hash & owner, update status: filled
      const recordToUpdate = await store.findOneBy(SignedCaveat, {
        hash,
        owner: ILike(owner),
      });

      if (!recordToUpdate) {
        console.error(`Missing signed caveat to update status: ${hash}`);
        return;
      }

      filledIdsToDelete.push(recordToUpdate.id);

      return store.save(
        updateCaveatStatus({
          signedCaveat: recordToUpdate,
          status: CaveatStatus.Filled,
        })
      );
    })
  ).catch((error) => console.error('Error updating filled caveats:', error));

  //remove intents/offers associated with the filled salt
  return updateInvalidatedSalts({
    invalidatedUserSalts: filledCaveats,
    store,
  }).then((idsToDelete) => [...filledIdsToDelete, ...idsToDelete]);
};
