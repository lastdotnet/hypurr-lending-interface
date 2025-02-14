import { type Store } from '@subsquid/typeorm-store';
import { LessThan } from 'typeorm';

import { type ChainId } from 'chains';

import {
  LoanEventData,
  Point,
  PointEvents,
  PointToken,
  type StarportLoan,
} from '../../../model';
import { serializeBigInts } from '../../../utils/serializeBigInts';

export const transformLoansToPoints = async ({
  chainId,
  starportLoans,
  store,
}: {
  chainId: ChainId;
  starportLoans: StarportLoan[];
  store: Store;
}): Promise<Point[]> => {
  const points: Promise<Point | undefined>[] = starportLoans
    .filter(({ borrower, issuer }) => borrower !== issuer)
    .map(async (starportLoan) => {
      const debt = starportLoan.debt.at(0);

      if (debt === undefined) {
        return undefined;
      }

      const tokenMetadata = await store.findOne(PointToken, {
        order: {
          timestamp: 'DESC',
        },
        where: {
          address: debt.token.toLowerCase(),
          chainId,
          timestamp: LessThan(Number(starportLoan.start)),
        },
      });

      if (!tokenMetadata) {
        return undefined;
      }
      const loanEventData: LoanEventData = new LoanEventData(
        undefined,
        serializeBigInts({
          amount: debt.amount,
          baseDenominator: tokenMetadata.baseDenominator,
          borrower: starportLoan.borrower.toLowerCase(),
          decimals: tokenMetadata.decimals,
          isClosed: false,
          lender: starportLoan.issuer.toLowerCase(),
          points: undefined, //points are calculated in real time until the starport loan is closed
          start: starportLoan.start,
        })
      );
      const point: Point = {
        address: tokenMetadata.address,
        chainId,
        data: loanEventData,
        event: PointEvents.Loan,
        id: starportLoan.id,
        isDynamic: true,
      };
      return new Point(point);
    });
  return (await Promise.all(points)).filter((point): point is Point => !!point);
};
