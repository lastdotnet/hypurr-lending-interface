import { type Store } from '@subsquid/typeorm-store';

import { Loan } from '../../../model';
import { archiveLoans } from './archiveLoans';

export const deleteClosedLoans = async ({
  closedLoanIds,
  store,
}: {
  closedLoanIds: string[];
  store: Store;
}) => {
  if (closedLoanIds.length === 0) {
    return;
  }

  console.log(`Deleting ${closedLoanIds.length} loans(s).`);

  //archive intents before deleting them
  await archiveLoans({ idsToArchive: closedLoanIds, store });

  return store
    .remove(Loan, closedLoanIds)
    .catch((error) => console.error('Error deleting loans', error));
};
