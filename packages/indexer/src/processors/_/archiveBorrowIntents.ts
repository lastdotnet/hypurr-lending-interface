import { type Store } from '@subsquid/typeorm-store';

import { ArchivedBorrowIntent, BorrowIntent } from '../../model';

export const archiveBorrowIntents = async ({
  ids,
  store,
}: {
  ids: string[];
  store: Store;
}) => {
  if (ids.length === 0) {
    return;
  }
  console.log(`Archiving ${ids.length} borrow intents(s).`);
  const archivedIntentsToSave: ArchivedBorrowIntent[] = (
    await Promise.all(
      ids.map(async (id) => {
        const intent = await store.findOne(BorrowIntent, {
          relations: {
            recall: {
              starportLoan: true,
            },
            signedCaveat: true,
          },
          where: {
            id,
          },
        });

        if (!intent) {
          return null;
        }
        return new ArchivedBorrowIntent(intent);
      })
    )
  ).filter((intent): intent is ArchivedBorrowIntent => intent !== null);

  return store
    .save(archivedIntentsToSave)
    .catch((error) => console.error('Error archiving borrow intents:', error));
};
