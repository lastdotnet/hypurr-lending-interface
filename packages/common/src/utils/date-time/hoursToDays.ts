import { divideNumber } from '../divide';

const HOURS_IN_A_DAY = 24;
export const hoursToDays = (hours: number) =>
  Math.floor(divideNumber(hours, HOURS_IN_A_DAY));
