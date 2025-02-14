import { zeroHash } from 'viem';
import { z } from 'zod';

import { AddressSchema, HexSchema, Uint256Schema } from 'common';

export enum OrderType {
  // 0: No partial fills, anyone can execute
  FULL_OPEN,
  // 1:  Partial fills supported, anyone can execute
  PARTIAL_OPEN,
  // 2: No partial fills, only offerer or zone can execute
  FULL_RESTRICTED,
  // 3: Partial fills supported, only offerer or zone can execute
  PARTIAL_RESTRICTED,
  // 4: No partial fills, only offerer can execute
  CONTRACT,
}

export const OrderTypeSchema = z.nativeEnum(OrderType);

export enum ItemType {
  // 0: ETH on mainnet, MATIC on polygon, etc.
  NATIVE,
  // 1: ERC20 items (ERC777 and ERC20 analogues could also technically work)
  ERC20,
  // 2: ERC721 items
  ERC721,
  // 3: ERC1155 items
  ERC1155,
  // 4: ERC721 items where a number of tokenIds are supported
  ERC721_WITH_CRITERIA,
  // 5: ERC1155 items where a number of ids are supported
  ERC1155_WITH_CRITERIA,
}

export const ItemTypeSchema = z.nativeEnum(ItemType);

export const SpentItemSchema = z.object({
  amount: Uint256Schema,
  identifier: Uint256Schema,
  itemType: ItemTypeSchema,
  token: AddressSchema,
});
export type SpentItem = z.infer<typeof SpentItemSchema>;

export const ReceivedItemSchema = SpentItemSchema.extend({
  recipient: AddressSchema,
});
export type ReceivedItem = z.infer<typeof ReceivedItemSchema>;

export const LendIntentItemSchema = z.object({
  endAmount: Uint256Schema,
  identifierOrCriteria: Uint256Schema,
  itemType: ItemTypeSchema,
  startAmount: Uint256Schema,
  token: AddressSchema,
});
export type LendIntentItem = z.infer<typeof LendIntentItemSchema>;

export const ConsiderationItemSchema = z.object({
  endAmount: Uint256Schema,
  identifierOrCriteria: Uint256Schema,
  itemType: ItemTypeSchema,
  recipient: AddressSchema,
  startAmount: Uint256Schema,
  token: AddressSchema,
});
export type ConsiderationItem = z.infer<typeof ConsiderationItemSchema>;

export const OrderParametersSchema = z.object({
  conduitKey: HexSchema,
  consideration: z.array(ConsiderationItemSchema),
  endTime: Uint256Schema,
  offer: z.array(LendIntentItemSchema),
  offerer: AddressSchema,
  orderType: OrderTypeSchema,
  salt: Uint256Schema,
  startTime: Uint256Schema,
  totalOriginalConsiderationItems: Uint256Schema,
  zone: AddressSchema,
  zoneHash: HexSchema,
});
export type OrderParameters = z.infer<typeof OrderParametersSchema>;

export const AdvancedOrderSchema = z.object({
  denominator: Uint256Schema,
  extraData: HexSchema,
  numerator: Uint256Schema,
  parameters: OrderParametersSchema,
  signature: HexSchema,
});
export type AdvancedOrder = z.infer<typeof AdvancedOrderSchema>;

export const FulfillAdvancedOrderArgs = z.object({
  advancedOrder: AdvancedOrderSchema,
  criteriaResolvers: z.array(z.never()),
  fulfillerConduitKey: z.literal(zeroHash),
  recipient: AddressSchema,
});
export type FulfillAdvancedOrderArgs = z.infer<typeof FulfillAdvancedOrderArgs>;
