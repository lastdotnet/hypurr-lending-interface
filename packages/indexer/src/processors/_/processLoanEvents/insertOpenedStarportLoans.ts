import { type Store } from '@subsquid/typeorm-store';

import { type StarportLoan } from '../../../model';

export const insertOpenedStarportLoans = ({
  starportLoans,
  store,
}: {
  starportLoans: StarportLoan[];
  store: Store;
}) => {
  if (starportLoans.length === 0) {
    return;
  }

  console.log(`Inserting ${starportLoans.length} Starport Loan(s).`);

  return store
    .insert(starportLoans)
    .catch((error) => console.error('Error inserting loans:', error));
};
