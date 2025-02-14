import { type Store } from '@subsquid/typeorm-store';

import { StarportLoan } from '../../../model';

export const deleteClosedStarportLoans = ({
  closedLoanIds,
  store,
}: {
  closedLoanIds: string[];
  store: Store;
}) => {
  if (closedLoanIds.length === 0) {
    return;
  }

  console.log(`Deleting ${closedLoanIds.length} loan(s).`);

  return store
    .remove(StarportLoan, closedLoanIds)
    .catch((error) => console.error('Error deleting loans:', error));
};
