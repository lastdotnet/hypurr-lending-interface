import { type Store } from '@subsquid/typeorm-store';

import { BorrowIntent } from '../../../model';

export const deleteBorrowIntents = ({
  closedLoanIds,
  store,
}: {
  closedLoanIds: string[];
  store: Store;
}) => {
  if (closedLoanIds.length === 0) {
    return;
  }

  console.log(`Deleting ${closedLoanIds.length} intents(s).`);

  return store
    .remove(BorrowIntent, closedLoanIds)
    .catch((error) => console.error('Error deleting intents:', error));
};
