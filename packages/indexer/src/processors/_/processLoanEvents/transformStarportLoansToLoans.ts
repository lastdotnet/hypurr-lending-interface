import { type Hex, decodeAbiParameters } from 'viem';

import { type ChainId } from 'chains';

import { BasePricingDetailsStructABI } from '../../../abi/BasePricingDetailsStructABI';
import { Loan, LoanType, Provider, type StarportLoan } from '../../../model';

export const transformStarportLoansToLoans = ({
  chainId,
  starportLoans,
}: {
  chainId: ChainId;
  starportLoans: StarportLoan[];
}): Loan[] =>
  starportLoans.map((starportLoan) => {
    const [basePricingDetails] = decodeAbiParameters(
      [BasePricingDetailsStructABI],
      starportLoan.terms.pricingData as Hex
    );

    const loan: Loan = {
      address: starportLoan.debt[0].token,
      amount: starportLoan.debt[0].amount,
      borrower: starportLoan.borrower,
      chainId,
      collateral: starportLoan.collateral,
      decimals: basePricingDetails.decimals,
      duration: undefined,
      id: starportLoan.id,
      lender: starportLoan.issuer,
      provider: Provider.ASTARIA,
      rate: basePricingDetails.rate,
      start: starportLoan.start,
      type: LoanType.ASTARIA,
    };

    return new Loan(loan);
  });
