'use server'

import { formatUnits } from 'viem'

import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { type AssetIdentifier, getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { getSpentItemCacheKey } from '@/app/api/_/getSpentItemCacheKey'
import { RECALL_ID } from '@/astaria/constants/walletNotificationId'
import { mapItemTypeToAssetType } from '@/astaria/utils/mapItemTypeToAssetType'

import { type Asset } from 'assets'
import { Loan } from 'indexer/model'
import { ItemType, SpentItemSchema } from 'sdk'

const getLoanAssetIdentifiers = ({ loans }: { loans: Loan[] }) =>
  loans.flatMap(({ address, chainId, collateral }) => {
    const collateralAssetIdentifiers = collateral.map<AssetIdentifier>((item) => {
      const type = mapItemTypeToAssetType(item.itemType)

      return {
        address: AddressSchema.parse(item.token),
        chainId: ChainIdSchema.parse(chainId),
        tokenId: type !== 'ERC20' ? item.identifier : undefined,
        type,
      }
    })
    const debtAssetIdentifier: AssetIdentifier = {
      address: AddressSchema.parse(address),
      chainId: ChainIdSchema.parse(chainId),
    }

    return [...collateralAssetIdentifiers, debtAssetIdentifier]
  })

const handleNaming = (name: string | undefined) => (name !== '' ? name : '?')

const handleBorrowAsset = (loanDetails: Loan, assetMetadata: Map<string, Asset>) => {
  const metadata = assetMetadata.get(loanDetails.address.toLowerCase())

  return {
    amount: formatUnits(loanDetails.amount, Number(loanDetails.decimals)),
    name: metadata && 'name' in metadata ? handleNaming(metadata.name) : '?',
  }
}

const handleCollateralAsset = (loanDetails: Loan, assetMetadata: Map<string, Asset>) => {
  const collateral = SpentItemSchema.parse(loanDetails.collateral.at(0))

  const metadata = assetMetadata.get(getSpentItemCacheKey({ item: collateral }))

  if (collateral.itemType === ItemType.ERC20) {
    return {
      amount: metadata && 'decimals' in metadata ? formatUnits(collateral.amount, metadata.decimals) : '?',
      name: metadata && 'name' in metadata ? handleNaming(metadata.name) : '?',
    }
  } else {
    return {
      amount: undefined,
      name:
        metadata && 'collection' in metadata
          ? `${handleNaming(metadata.collection.name)} ${String(collateral.identifier)}`
          : '?',
    }
  }
}

const handleRecall = async (body: string): Promise<string> => {
  try {
    const dataSource = await initializeDataSource()

    const loanDetails = await dataSource.getRepository(Loan).findOne({
      where: {
        id: body,
      },
    })

    if (!loanDetails) {
      throw new Error(`Could not find loan ${body} for recall`)
    }

    const assetMetadata = await getAssetsMetadata({
      assets: getLoanAssetIdentifiers({ loans: [loanDetails] }),
    })

    const borrowMetadata = handleBorrowAsset(loanDetails, assetMetadata)

    const collateralMetadata = handleCollateralAsset(loanDetails, assetMetadata)

    return `
            Your loan of <strong>${borrowMetadata.amount} ${borrowMetadata.name}</strong> for 
            <strong>${collateralMetadata.amount || ''} ${collateralMetadata.name}</strong> has been <strong>recalled</strong>.
            <br/><br/>
            Repay on the My Loans page soon to avoid a higher interest rate or liquidation.
        `
  } catch (error) {
    return 'Error occured while fetching the loan details.'
  }
}

export const getNotificationBody = async ({
  body,
  type,
}: {
  body: string
  type: string
}): Promise<string> => {
  switch (type) {
    case RECALL_ID: {
      const res = await handleRecall(body)
      return res
    }
    default: {
      return body
    }
  }
}
