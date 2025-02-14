import { getNowInSeconds } from './getNowInSeconds';

export const secondsFromNow = (timestamp?: number) =>
  timestamp ? timestamp - getNowInSeconds() : 0;
