import { type ChainId } from 'chains';

import { SpentItem, StarportLoan, Terms } from '../../../model';
import { type LoanOpenArgs } from '../../../utils/isValidStarportLoan';
import { serializeBigInts } from '../../../utils/serializeBigInts';

type DecodedSpentItem = LoanOpenArgs['loan']['collateral'][0];

export const transformLoanOpenArgsToStarportLoan = ({
  chainId,
  loanOpenArgs,
}: {
  chainId: ChainId;
  loanOpenArgs: LoanOpenArgs;
}): StarportLoan => {
  const { loan: starportLoan, loanId } = loanOpenArgs;

  const transformedCollateral = starportLoan.collateral.map(
    (val: DecodedSpentItem) => new SpentItem(undefined, serializeBigInts(val))
  );

  const transformedDebt = starportLoan.debt.map(
    (val: DecodedSpentItem) => new SpentItem(undefined, serializeBigInts(val))
  );

  const loanRecord: StarportLoan = {
    ...starportLoan,
    chainId,
    collateral: transformedCollateral,
    debt: transformedDebt,
    id: loanId.toString(),
    terms: new Terms(starportLoan.terms),
  };

  return new StarportLoan(loanRecord);
};
