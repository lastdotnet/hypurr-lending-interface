import { type Store } from '@subsquid/typeorm-store';
import { type PublicClient } from 'viem';

import { type ChainId } from 'chains';

import { type StarportLoan } from '../../../model';
import {
  type LoanOpenArgs,
  isValidStarportLoan,
} from '../../../utils/isValidStarportLoan';
import { insertOpenedLoans } from './insertOpenedLoans';
import { insertOpenedPoints } from './insertOpenedPoints';
import { insertOpenedStarportLoans } from './insertOpenedStarportLoans';
import { transformLoanOpenArgsToStarportLoan } from './transformLoanOpenArgsToStarportLoan';
import { transformLoansToPoints } from './transformLoansToPoints';
import { transformStarportLoansToLoans } from './transformStarportLoansToLoans';
import { updateERC20StatsForOpenedStarportLoans } from './updateERC20StatsForOpenedStarportLoans';

export const handleOpenLoans = async ({
  chainId,
  openedLoans,
  publicClient,
  store,
}: {
  chainId: ChainId;
  openedLoans: LoanOpenArgs[];
  publicClient: PublicClient;
  store: Store;
}) => {
  // Filter out invalid loans
  const starportLoans = await Promise.all(
    openedLoans.map(async (event: LoanOpenArgs) =>
      (await isValidStarportLoan(publicClient, event.loan))
        ? transformLoanOpenArgsToStarportLoan({ chainId, loanOpenArgs: event })
        : undefined
    )
  ).then((result) =>
    result.filter(
      (starportLoan): starportLoan is StarportLoan => !!starportLoan
    )
  );

  return Promise.all([
    insertOpenedStarportLoans({ starportLoans, store }),
    insertOpenedLoans({
      loans: transformStarportLoansToLoans({ chainId, starportLoans }),
      store,
    }),
    insertOpenedPoints({
      points: await transformLoansToPoints({ chainId, starportLoans, store }),
      store,
    }),
    updateERC20StatsForOpenedStarportLoans({
      chainId,
      publicClient,
      starportLoans,
      store,
    }),
  ]);
};
