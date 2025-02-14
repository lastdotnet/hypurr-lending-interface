import { type Store } from '@subsquid/typeorm-store';
import { type PublicClient } from 'viem';

import { type ChainId } from 'chains';

import { type StarportLoan } from '../../../model';
import { incrementStats } from './incrementStats';

export const updateERC20StatsForOpenedStarportLoans = async ({
  chainId,
  publicClient,
  starportLoans,
  store,
}: {
  chainId: ChainId;
  publicClient: PublicClient;
  starportLoans: StarportLoan[];
  store: Store;
}) => {
  if (starportLoans.length === 0) {
    return;
  }
  console.log('Starting update on erc20 tokens, because of newly opened loans');

  for (const starportLoan of starportLoans) {
    await incrementStats({
      chainId,
      onOpen: true,
      publicClient,
      starportLoan,
      store,
      tokenType: 'collateral',
    });
    await incrementStats({
      chainId,
      onOpen: true,
      publicClient,
      starportLoan,
      store,
      tokenType: 'debt',
    });
  }
};
