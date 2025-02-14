import { type DataHandlerContext } from '@subsquid/evm-processor';
import { type Store } from '@subsquid/typeorm-store';
import { type Hex, decodeEventLog } from 'viem';

import { events as BaseRecallEvents } from '../../abi/BaseRecall';
import { events as StarportEvents } from '../../abi/Starport';
import { Events } from '../../events.abi';
import { type LoanOpenArgs } from '../../utils/isValidStarportLoan';
import type {
  CaveatNonceIncremented,
  FilledCaveat,
  InvalidatedUserSalt,
} from './processCaveatStatusUpdateEvents/types';
import { type RecallEvent } from './processRecallEvents';

export type ClosedPoint = {
  blockTimestamp: number;
  id: string;
};

export type BlockEventData = {
  closedLoanIds: string[];
  closedPoints: ClosedPoint[];
  filledCaveats: FilledCaveat[];
  incrementedNonces: CaveatNonceIncremented[];
  invalidatedUserSalts: InvalidatedUserSalt[];
  openedLoans: LoanOpenArgs[];
  recallEvents: RecallEvent[];
};

export const scrapeEvents = async (
  ctx: DataHandlerContext<Store>
): Promise<BlockEventData> => {
  //Event data to scrape and then process
  const openedLoans: LoanOpenArgs[] = [];
  const closedLoanIds: string[] = [];
  const closedPoints: ClosedPoint[] = [];
  const filledCaveats: FilledCaveat[] = [];
  const invalidatedUserSalts: InvalidatedUserSalt[] = [];
  const incrementedNonces: CaveatNonceIncremented[] = [];
  const recallEvents: RecallEvent[] = [];

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      switch (log.topics[0]) {
        case StarportEvents.Open.topic: {
          const loanOpenArgs = decodeEventLog({
            abi: Events,
            data: log.data as Hex,
            eventName: 'Open',
            topics: [StarportEvents.Open.topic as Hex],
          }).args;

          if (!loanOpenArgs) {
            console.error('Failed to decode loan open event log');
            break;
          }
          console.log('Open:', loanOpenArgs.loanId.toString());
          openedLoans.push(loanOpenArgs);
          break;
        }
        case StarportEvents.Close.topic: {
          const loan = StarportEvents.Close.decode(log);
          console.log('Close:', loan.loanId.toString());
          closedLoanIds.push(loan.loanId.toString());
          closedPoints.push({
            blockTimestamp: block.header.timestamp,
            id: loan.loanId.toString(),
          });
          break;
        }
        case StarportEvents.CaveatSaltInvalidated.topic: {
          const { owner, salt } =
            StarportEvents.CaveatSaltInvalidated.decode(log);
          console.log('CaveatSaltInvalidated:', owner, salt);
          invalidatedUserSalts.push({ owner, salt });
          break;
        }
        case StarportEvents.CaveatFilled.topic: {
          const { hash, owner, salt } = StarportEvents.CaveatFilled.decode(log);
          console.log('CaveatFilled:', owner, hash, salt);
          filledCaveats.push({
            blockHeight: block.header.height,
            fromAddress: log.transaction?.from,
            hash,
            owner,
            salt,
          });
          break;
        }
        case StarportEvents.CaveatNonceIncremented.topic: {
          const { newNonce, owner } =
            StarportEvents.CaveatNonceIncremented.decode(log);
          console.log('CaveatNonceIncremented:', owner, newNonce);
          incrementedNonces.push({
            newNonce,
            owner,
            timestamp: block.header.timestamp,
          });
          break;
        }
        case BaseRecallEvents.Recalled.topic: {
          const { end, loanId, recaller } =
            BaseRecallEvents.Recalled.decode(log);
          console.log('Recalled:', loanId.toString(), recaller, end.toString());
          recallEvents.push({
            end,
            loanId,
            recaller,
            timestamp: block.header.timestamp,
          });
          break;
        }
      }
    }
  }
  return {
    closedLoanIds,
    closedPoints,
    filledCaveats,
    incrementedNonces,
    invalidatedUserSalts,
    openedLoans,
    recallEvents,
  };
};
