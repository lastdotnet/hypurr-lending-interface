import { type Store } from '@subsquid/typeorm-store';

import { ArchivedLoan, Loan } from '../../../model';

export const archiveLoans = async ({
  idsToArchive,
  store,
}: {
  idsToArchive: string[];
  store: Store;
}) => {
  if (idsToArchive.length === 0) {
    return;
  }

  console.log(`Archiving ${idsToArchive.length} loan(s).`);
  const archivedLoansToSave: ArchivedLoan[] = (
    await Promise.all(
      idsToArchive.map(async (id) => {
        const loan = await store.findOne(Loan, {
          where: {
            id,
          },
        });

        if (!loan) {
          console.error(`Loan not found for loanId: ${id}`);
          return null;
        }
        return new ArchivedLoan(loan);
      })
    )
  ).filter((loan): loan is ArchivedLoan => loan !== null);

  return store
    .save(archivedLoansToSave)
    .catch((error) => console.error('Error archiving loans:', error));
};
