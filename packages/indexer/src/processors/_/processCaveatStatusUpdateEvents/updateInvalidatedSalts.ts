import { type Store } from '@subsquid/typeorm-store';
import { ILike } from 'typeorm';

import { CaveatStatus, SignedCaveat } from '../../../model';
import type { FilledCaveat, InvalidatedUserSalt } from './types';
import { updateCaveatStatus } from './updateCaveatStatus';

export const updateInvalidatedSalts = async ({
  invalidatedUserSalts,
  store,
}: {
  invalidatedUserSalts: InvalidatedUserSalt[] | FilledCaveat[];
  store: Store;
}): Promise<string[]> => {
  if (invalidatedUserSalts.length === 0) {
    return [];
  }

  console.log(`Invalidating ${invalidatedUserSalts.length} salt(s).`);

  const idsToDelete: string[] = [];
  await Promise.all(
    invalidatedUserSalts.map(async ({ owner, salt }) => {
      const recordsToInvalidate = await store.findBy(SignedCaveat, {
        owner: ILike(owner),
        salt,
        status: CaveatStatus.Active,
      });

      if (!recordsToInvalidate.length) {
        return;
      }

      idsToDelete.push(
        ...recordsToInvalidate.map((record: SignedCaveat) => record.id)
      );

      return store.save(
        recordsToInvalidate.map((record) =>
          updateCaveatStatus({
            signedCaveat: record,
            status: CaveatStatus.Invalidated,
          })
        )
      );
    })
  ).catch((error) => console.error('Error invalidating salts:', error));

  return idsToDelete;
};
