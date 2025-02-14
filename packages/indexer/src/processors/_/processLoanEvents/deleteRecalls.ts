import { type Store } from '@subsquid/typeorm-store';

import { Recall } from '../../../model';

export const deleteRecalls = ({
  closedLoanIds,
  store,
}: {
  closedLoanIds: string[];
  store: Store;
}) => {
  if (closedLoanIds.length === 0) {
    return;
  }

  console.log(`Deleting ${closedLoanIds.length} recall(s).`);

  return store
    .remove(Recall, closedLoanIds)
    .catch((error) => console.error('Error deleting recalls:', error));
};
