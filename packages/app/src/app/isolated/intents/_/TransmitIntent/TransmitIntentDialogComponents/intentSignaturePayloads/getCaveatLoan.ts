import { type Address, zeroAddress } from 'viem'

import { type ChainId } from 'chains'

import { getPricingData } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getPricingData'
import { getStatusData } from '@/app/isolated/intents/_/TransmitIntent/TransmitIntentDialogComponents/intentSignaturePayloads/getStatusData'
import { emptyBytes } from '@/astaria/constants/empty'
import { Contracts } from '@/astaria/types-internal/contract-types'
import { TRANSMIT_INTENT_PARAMS } from '@/astaria/types-internal/transmit-intent-params'
import { getContractAddress } from '@/astaria/utils/getContractAddress'
import { convertAssetTypeToItemType } from '@/astaria/utils/intents'

import { type Asset, type ERC20, isERC721Asset } from 'assets'
import { ItemType } from 'sdk'

export const getCaveatLoan = ({
  apy,
  borrow,
  borrower,
  chainId,
  collateral,
  issuer,
}: {
  apy: bigint
  borrow: ERC20
  borrower: Address
  chainId: ChainId
  collateral: Asset
  issuer: Address
}) => ({
  borrower,
  collateral: [
    {
      amount: isERC721Asset(collateral) ? TRANSMIT_INTENT_PARAMS.erc721Amount : collateral.amount,
      identifier: isERC721Asset(collateral) ? collateral.tokenId : TRANSMIT_INTENT_PARAMS.fallbackTokenId,
      itemType: convertAssetTypeToItemType(collateral),
      token: collateral.address,
    },
  ],
  custodian: getContractAddress({
    chainId,
    contractName: Contracts.Custodian,
  }),
  debt: [
    {
      amount: borrow.amount,
      identifier: TRANSMIT_INTENT_PARAMS.fallbackTokenId,
      itemType: ItemType.ERC20,
      token: borrow.address,
    },
  ],
  issuer,
  originator: zeroAddress,
  start: TRANSMIT_INTENT_PARAMS.loanStart,
  terms: {
    pricing: getContractAddress({
      chainId,
      contractName: Contracts.V1Pricing,
    }),
    pricingData: getPricingData({ apy, borrow }),
    settlement: getContractAddress({
      chainId,
      contractName: Contracts.V1Settlement,
    }),
    settlementData: emptyBytes,
    status: getContractAddress({
      chainId,
      contractName: Contracts.V1Status,
    }),
    statusData: getStatusData(borrow),
  },
})
