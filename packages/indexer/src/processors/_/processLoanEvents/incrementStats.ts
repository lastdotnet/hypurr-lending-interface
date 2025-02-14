import { type Store } from '@subsquid/typeorm-store';
import {
  type Address,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
} from 'viem';

import { type ChainId } from 'chains';
import { calculateCompoundInterest } from 'common';
import { ItemType } from 'sdk';

import { BasePricingDetailsStructABI } from '../../../abi/BasePricingDetailsStructABI';
import { Erc20Stats, type StarportLoan } from '../../../model';
import { getErc20Decimals } from '../../../utils/getErc20Decimals';
import { getStarportLoanDetails } from './getStarportLoanDetails';

export const incrementStats = async ({
  chainId,
  onOpen,
  publicClient,
  starportLoan,
  store,
  tokenType,
}: {
  chainId: ChainId;
  onOpen: boolean;
  publicClient: PublicClient;
  starportLoan: StarportLoan;
  store: Store;
  tokenType: string;
}) => {
  const { address, amount, itemType } = getStarportLoanDetails({
    starportLoan,
    tokenType,
  });

  if (!address || !amount || itemType !== ItemType.ERC20) {
    return;
  }

  let erc20Stats = await store.findOne(Erc20Stats, {
    where: { address, chainId },
  });

  const [basePricingDetails] = decodeAbiParameters(
    [BasePricingDetailsStructABI],
    starportLoan.terms.pricingData as Hex
  );

  if (!erc20Stats) {
    console.info(`No previous stats for ${tokenType} address: ${address}`);
    erc20Stats = {
      address,
      avgApy: 0n,
      chainId,
      cronUpdatedAt: 0n,
      decimals: Number(
        tokenType === 'debt'
          ? basePricingDetails.decimals
          : await getErc20Decimals(publicClient, address as Address)
      ),
      id: `${chainId}_${address}`,
      totalCollateral: 0n,
      totalDebt: 0n,
    };
  }
  if (onOpen) {
    if (tokenType === 'collateral') {
      erc20Stats.totalCollateral += amount;
    } else {
      erc20Stats.totalDebt += amount;
    }
  } else {
    if (tokenType === 'collateral') {
      erc20Stats.totalCollateral -= amount;
    } else {
      let interest = 0n;
      if (erc20Stats.cronUpdatedAt !== 0n) {
        interest = calculateCompoundInterest({
          amount,
          apy: basePricingDetails.rate,
          decimals: erc20Stats.decimals,
          delta: erc20Stats.cronUpdatedAt - starportLoan.start,
        });
      }
      erc20Stats.totalDebt -= amount + interest;
    }
  }

  await store
    .save(new Erc20Stats(erc20Stats))
    .catch((error) =>
      console.error(`Error updating ${tokenType} token erc20 stats:`, error)
    );
};
