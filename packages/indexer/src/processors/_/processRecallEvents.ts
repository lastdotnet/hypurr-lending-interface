import { type Store } from '@subsquid/typeorm-store';
import { millisecondsToSeconds } from 'date-fns';

import { type ChainId } from 'chains';

import { type BorrowIntent, Recall, StarportLoan } from '../../model';
import { createRecallIntent } from './createRecallIntent';
import { sendNotifications } from './processNotifications/sendNotifications';

export type RecallEvent = {
  end: bigint;
  loanId: bigint;
  recaller: string;
  timestamp: number;
};

export async function processRecallEvents({
  chainId,
  recallEvents,
  store,
}: {
  chainId: ChainId;
  recallEvents: RecallEvent[];
  store: Store;
}) {
  if (recallEvents.length === 0) {
    return;
  }

  console.log(`Inserting ${recallEvents.length} recall(s).`);

  const recallRecords: Recall[] = [];
  const intentRecords: BorrowIntent[] = [];

  try {
    await Promise.all(
      recallEvents.map(async (recall) => {
        const { end, loanId, recaller, timestamp } = recall;
        const start = BigInt(millisecondsToSeconds(timestamp));
        const starportLoan = await store.get(StarportLoan, loanId.toString());

        if (!starportLoan) {
          console.error(`Could not find loan ${loanId} for recall`);
          return;
        }

        const recallData: Recall = {
          chainId,
          end,
          id: loanId.toString(),
          recaller,
          starportLoan,
          start,
        };

        intentRecords.push(
          createRecallIntent({
            endTime: end,
            id: loanId.toString(),
            recall: recallData,
            starportLoan,
            startTime: start,
          })
        );

        recallRecords.push(new Recall(recallData));

        await sendNotifications(starportLoan.borrower, starportLoan.id);
      })
    );

    return await Promise.all([
      store.insert(recallRecords),
      store.insert(intentRecords),
    ]);
  } catch (error) {
    console.error('Error inserting records:', error);
  }

  return undefined;
}
