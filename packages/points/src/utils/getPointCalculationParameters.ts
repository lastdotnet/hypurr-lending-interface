import { ETHER_DECIMALS, numberToBigInt } from 'common';

import {
  DAILY_BONUS_POINTS,
  INTENT_TRANSMISSION_BONUS_POINTS,
} from '../constants';
import {
  calculatePointsForPoint,
  getTokenAmount,
} from './calculatePointsForPoint';

interface CheckedIntentFeedData {
  createdAt: Date;
}

interface IntentFillData {
  createdAt: Date;
  hash: string;
  points: bigint;
}

interface LoanPointData {
  amount: bigint;
  baseDenominator: number;
  decimals: number;
  points?: bigint | null;
  start: bigint;
}

type PointData = LoanPointData | CheckedIntentFeedData | IntentFillData;

interface Point {
  address: string;
  data: PointData;
  event: string;
  isDynamic: boolean;
}

export const getPointCalculationParameters = ({
  points,
  startTime,
}: {
  points: Point[];
  startTime: number;
}) => {
  const currentDynamicPoints = points
    .filter((point) => point.isDynamic)
    .map((point: Point) => {
      if (point.event === 'Loan') {
        const pointData = point.data as LoanPointData;
        if (pointData.points) {
          return pointData.points; // Use the points directly from when the loan was closed
        } else {
          return calculatePointsForPoint({ point: pointData, startTime });
        }
      } else {
        return (point.data as IntentFillData).points;
      }
    })
    .reduce((acc, val) => acc + val, 0n);

  const totalNonDynamicPoints = points
    .filter((point) => !point.isDynamic)
    .map((point) => {
      if (point.event === 'CheckedIntentFeed') {
        return numberToBigInt({
          amount: DAILY_BONUS_POINTS,
          decimals: ETHER_DECIMALS,
        });
      } else if (point.event === 'IntentSubmission') {
        return numberToBigInt({
          amount: INTENT_TRANSMISSION_BONUS_POINTS,
          decimals: ETHER_DECIMALS,
        });
      } else {
        throw new Error(`This point should be dynamic`);
      }
    })
    .reduce((acc, val) => acc + val, 0n);

  const startPoints = currentDynamicPoints + totalNonDynamicPoints;

  const totalActiveLoanTokenAmount = points
    .filter((point) => point.isDynamic)
    .map((point) => {
      if (point.event === 'Loan') {
        const pointData = point.data as LoanPointData;
        if (pointData.points) {
          return 0n; // No need for getting token amount when loan is closed
        } else {
          return getTokenAmount({ point: pointData });
        }
      } else {
        return 0n;
      }
    })
    .reduce((acc, val) => acc + val, 0n);

  return {
    startPoints,
    startTime,
    totalActiveLoanTokenAmount,
  };
};
