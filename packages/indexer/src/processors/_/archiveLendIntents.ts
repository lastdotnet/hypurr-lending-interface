import { type Store } from '@subsquid/typeorm-store';

import { ArchivedLendIntent, LendIntent } from '../../model';

export const archiveLendIntents = async ({
  ids,
  store,
}: {
  ids: string[];
  store: Store;
}) => {
  if (ids.length === 0) {
    return;
  }

  console.log(`Archiving ${ids.length} intents(s).`);
  const archivedIntentsToSave: ArchivedLendIntent[] = (
    await Promise.all(
      ids.map(async (id) => {
        const intent = await store.findOne(LendIntent, {
          relations: {
            signedCaveat: true,
          },
          where: {
            id,
          },
        });

        if (!intent) {
          return null;
        }
        return new ArchivedLendIntent(intent);
      })
    )
  ).filter((intent): intent is ArchivedLendIntent => intent !== null);

  return store
    .save(archivedIntentsToSave)
    .catch((error) => console.error('Error archiving lend intents:', error));
};
