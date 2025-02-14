import { ETHER_DECIMALS, numberToBigInt } from 'common';

export const POINTS_DECIMALS = ETHER_DECIMALS;
export const POINT_AMOUNT = numberToBigInt({
  amount: 0.003858,
  decimals: POINTS_DECIMALS,
}); // 1 ETH for 30 days = 10000 points => 1 ETH for 1 second is 0.003858

export const INTENT_TRANSMISSION_BONUS_POINTS = 100; // no longer used, but left for previous points
export const INTENT_FILL_BONUS_POINTS_MAX = 1000;
export const DAILY_BONUS_POINTS = 100;
