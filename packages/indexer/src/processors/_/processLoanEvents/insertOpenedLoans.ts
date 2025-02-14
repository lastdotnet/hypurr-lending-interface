import { type Store } from '@subsquid/typeorm-store';

import { type Loan } from '../../../model';

export const insertOpenedLoans = ({
  loans,
  store,
}: {
  loans: Loan[];
  store: Store;
}) => {
  if (loans.length === 0) {
    return;
  }

  console.log(`Inserting ${loans.length} loan(s).`);

  return store
    .insert(loans)
    .catch((error) => console.error('Error inserting loans:', error));
};
