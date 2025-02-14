import { type Store } from '@subsquid/typeorm-store';
import { ILike, LessThan, Not } from 'typeorm';

import { CaveatStatus, SignedCaveat } from '../../../model';
import { type CaveatNonceIncremented } from './types';
import { updateCaveatStatus } from './updateCaveatStatus';

export const updateIncrementedNonces = async ({
  incrementedNonces,
  store,
}: {
  incrementedNonces: CaveatNonceIncremented[];
  store: Store;
}): Promise<string[]> => {
  if (incrementedNonces.length === 0) {
    return [];
  }

  console.log(`Invalidating ${incrementedNonces.length} nonce(s).`);

  const idsToDelete: string[] = [];
  const promises = incrementedNonces.map(
    async ({ newNonce, owner, timestamp }) => {
      //set status = 'invalidated', where nonce not equal to newNonce & owner == owner & timestamp < timestamp
      const recordsToUpdate = await store.findBy(SignedCaveat, {
        createdAt: LessThan(new Date(timestamp)),
        nonce: Not(newNonce.toString()),
        owner: ILike(owner),
        status: CaveatStatus.Active,
      });

      if (!recordsToUpdate) {
        return;
      }

      idsToDelete.push(
        ...recordsToUpdate.map((record: SignedCaveat) => record.id)
      );

      return store.save(
        recordsToUpdate.map((record) =>
          updateCaveatStatus({
            signedCaveat: record,
            status: CaveatStatus.Invalidated,
          })
        )
      );
    }
  );
  return Promise.all(promises)
    .catch((error) => console.error('updateIncrementedNonces Error: ', error))
    .then(() => idsToDelete);
};
