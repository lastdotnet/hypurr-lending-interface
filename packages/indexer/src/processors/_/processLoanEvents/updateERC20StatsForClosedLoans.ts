import { type Store } from '@subsquid/typeorm-store';
import { type PublicClient } from 'viem';

import { type ChainId } from 'chains';

import { StarportLoan } from '../../../model';
import { incrementStats } from './incrementStats';

export const updateERC20StatsForClosedLoans = async ({
  chainId,
  closedLoanIds,
  publicClient,
  store,
}: {
  chainId: ChainId;
  closedLoanIds: string[];
  publicClient: PublicClient;
  store: Store;
}) => {
  if (closedLoanIds.length === 0) {
    return;
  }

  console.log('Starting update on erc20 tokens, because of closed loans');

  for (const loanId of closedLoanIds) {
    const starportLoan = await store.get(StarportLoan, loanId);

    if (!starportLoan) {
      console.error(
        `Could not find Starport Loan ${loanId} for updating of erc20`
      );
      return;
    }
    await incrementStats({
      chainId,
      onOpen: false,
      publicClient,
      starportLoan,
      store,
      tokenType: 'collateral',
    });
    await incrementStats({
      chainId,
      onOpen: false,
      publicClient,
      starportLoan,
      store,
      tokenType: 'debt',
    });
  }
};
