import { type Address, zeroAddress, zeroHash } from 'viem';

import {
  type ConsiderationItem,
  type LendIntentItem,
  type OrderParameters,
  OrderType,
  type ReceivedItem,
  type SpentItem,
} from '../types/seaport';

export function buildOrderParameters(
  offerer: Address,
  lendIntent: LendIntentItem[],
  consideration: ConsiderationItem[],
  startTime: bigint,
  endTime: bigint
): OrderParameters {
  return {
    conduitKey: zeroHash,
    consideration,
    endTime,
    offer: lendIntent,
    offerer,
    orderType: OrderType.CONTRACT,
    salt: 0n,
    startTime,
    totalOriginalConsiderationItems: BigInt(consideration.length),
    zone: zeroAddress,
    zoneHash: zeroHash,
  };
}

export function spentItemsToLendIntentItems(
  spentItems: readonly SpentItem[]
): LendIntentItem[] {
  return spentItems.map(({ amount, identifier, itemType, token }) => ({
    endAmount: amount,
    identifierOrCriteria: identifier,
    itemType,
    startAmount: amount,
    token,
  }));
}

export function receivedItemsToConsiderationItems(
  receivedItems: ReceivedItem[]
): ConsiderationItem[] {
  return receivedItems.map(
    ({ amount, identifier, itemType, recipient, token }) => ({
      endAmount: amount,
      identifierOrCriteria: identifier,
      itemType,
      recipient,
      startAmount: amount,
      token,
    })
  );
}
