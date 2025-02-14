import { type Leaderboard } from 'indexer/model';

export const sortWalletByPoints = (
  resultList: { totalPoints: bigint; walletAddress: string }[]
) => {
  resultList
    .sort((a, b) => {
      if (a.totalPoints < b.totalPoints) {
        return 1;
      } else if (a.totalPoints > b.totalPoints) {
        return -1;
      } else {
        return 0;
      }
    })
    .unshift({
      totalPoints: 0n,
      walletAddress: '',
    });
  const result: Leaderboard[] = resultList.map((entry, index) => {
    const leaderboard = {
      id: entry.walletAddress,
      points: entry.totalPoints,
      rank: index,
    };

    return leaderboard;
  });
  result.shift(); // we do unshift and shift to raise the index/rank to start from 1
  return result;
};
