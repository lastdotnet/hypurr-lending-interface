import { type StarportLoan } from '../../../model';

export const getStarportLoanDetails = ({
  starportLoan,
  tokenType,
}: {
  starportLoan: StarportLoan;
  tokenType: string;
}) => {
  if (tokenType === 'collateral') {
    return {
      address: starportLoan.collateral.at(0)?.token,
      amount: starportLoan.collateral.at(0)?.amount,
      itemType: starportLoan.collateral.at(0)?.itemType,
    };
  } else {
    return {
      address: starportLoan.debt.at(0)?.token,
      amount: starportLoan.debt.at(0)?.amount,
      itemType: starportLoan.debt.at(0)?.itemType,
    };
  }
};
