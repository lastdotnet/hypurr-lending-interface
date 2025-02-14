import { type Hex, decodeAbiParameters } from 'viem';

import { type ChainId } from 'chains';
import { encodeShortID } from 'common';

import { BaseRecallDetailsStructABI } from '../../abi/BaseRecallDetailsStructABI';
import { BorrowIntent, type Recall, type StarportLoan } from '../../model';
import { calculateAssortmentId } from '../../utils';

interface CreateRecallIntentProps {
  endTime: bigint;
  id: string;
  recall: Recall;
  starportLoan: StarportLoan;
  startTime: bigint;
}

export const createRecallIntent = ({
  endTime,
  id,
  recall,
  starportLoan,
  startTime,
}: CreateRecallIntentProps) => {
  const [baseRecallDetails] = decodeAbiParameters(
    [BaseRecallDetailsStructABI],
    starportLoan.terms.statusData as Hex
  );

  const intent: BorrowIntent = {
    activeApproval: true,
    assortmentId: calculateAssortmentId(
      starportLoan.collateral,
      starportLoan.debt
    ),
    borrow: starportLoan.debt,
    chainId: recall.chainId,
    collateral: starportLoan.collateral,
    deadline: startTime + baseRecallDetails.recallWindow,
    endRate: baseRecallDetails.recallMax,
    endTime,
    id,
    isRecall: true,
    maxAmount: starportLoan.debt[0].amount,
    minAmount: starportLoan.debt[0].amount,
    recall,
    shortId: encodeShortID({
      chainId: recall.chainId as ChainId,
      value: id,
    }),
    signedCaveat: null,
    startRate: 0n,
    startTime,
    usdValueBorrow: null,
    usdValueCollateral: null,
  };

  return new BorrowIntent(intent);
};
