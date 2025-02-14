import { getNowInSeconds } from 'common';

export const getSecondsLeft = (end: bigint | number | string) => {
  const dateDelta = Number(end) - getNowInSeconds();
  return dateDelta > 0 ? dateDelta : 0;
};
