'use server'

import { sepolia } from 'viem/chains'

import { ChainIdSchema } from 'chains'
import { AddressSchema } from 'common'
import { ILike, Not } from 'typeorm'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { type AssetIdentifier, getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { StarportLoanSchemaWithId } from '@/app/api/cron/matchingservice/_/types'
import { BadRequestError } from '@/app/api/server-error'
import { transformLoan } from '@/app/loans/_/useLoans/transformLoan'
import {
  type GETLoansParameters,
  type GETLoansResponse,
  GETLoansResponseSchema,
  type Recall,
  RecallSchema,
} from '@/astaria/types-internal/loan-schemas'
import { mapItemTypeToAssetType } from '@/astaria/utils/mapItemTypeToAssetType'

import { Loan as IndexerLoan, type StarportLoan } from 'indexer/model'

const getLoanAssetIdentifiers = ({ loans }: { loans: IndexerLoan[] }) =>
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

export const getLoans = async ({ address, isTestnet, limit, offset }: GETLoansParameters) => {
  if (!address) {
    throw new BadRequestError(`Borrower Address OR Lender Address is Required.`)
  }

  const dataSource = await initializeDataSource()

  const loanQuery = dataSource.manager
    .getRepository(IndexerLoan)
    .createQueryBuilder('loan')
    .where([
      {
        borrower: ILike(address),
        chainId: isTestnet ? sepolia.id : Not(sepolia.id),
      },
      {
        chainId: isTestnet ? sepolia.id : Not(sepolia.id),
        lender: ILike(address),
      },
    ])

  const aggregatedLoans = await loanQuery
    .leftJoin('starport_loan', 'starport_loan', 'loan.id = starport_loan.id')
    .addSelect([
      'starport_loan.terms as terms',
      'starport_loan.custodian as custodian',
      'starport_loan.originator as originator',
      'starport_loan.debt as debt',
    ])
    .leftJoinAndSelect('recall', 'recall', 'starport_loan.id = recall.id')
    .orderBy('recall.id', 'ASC') // This line orders the loans by recall id, putting those with recalls first
    .skip(offset)
    .take(limit)
    .getRawAndEntities()

  const loansFromAPI = aggregatedLoans.entities

  const assetsPromise = getAssetsMetadata({
    assets: getLoanAssetIdentifiers({ loans: loansFromAPI }),
  })

  const [total, assets] = await Promise.all([loanQuery.clone().getCount(), assetsPromise])

  const loans = loansFromAPI.map((loan, index) =>
    transformLoan({
      address,
      assets,
      dataSource,
      loan,
      recall: getRecallFromRaw(aggregatedLoans.raw[index]),
      starportLoan: getStarportLoanFromRaw(aggregatedLoans.raw[index]),
    }),
  )

  const response: GETLoansResponse = {
    loans,
    paging: {
      itemsReturned: loans.length,
      limit,
      offset,
      onLastPage: offset + limit >= total,
      total,
    },
  }

  return GETLoansResponseSchema.parse(response)
}

// eslint-disable-next-line @/astaria/typescript-eslint/no-explicit-any
const getStarportLoanFromRaw = (raw: any) => {
  const starportLoan: StarportLoan = {
    borrower: raw.loan_borrower,
    chainId: raw.loan_chain_id,
    collateral: raw.loan_collateral,
    custodian: raw.custodian,
    debt: raw.debt,
    id: raw.loan_id,
    issuer: raw.loan_lender,
    originator: raw.originator,
    start: raw.loan_start,
    terms: raw.terms,
  }

  return StarportLoanSchemaWithId.extend({ chainId: ChainIdSchema }).parse(starportLoan)
}

// eslint-disable-next-line @/astaria/typescript-eslint/no-explicit-any
const getRecallFromRaw = (raw: any) => {
  if (raw.recall_id) {
    const recall: Recall = {
      end: raw.recall_end,
      recaller: raw.recall_recaller,
      start: raw.recall_start,
    }
    return RecallSchema.parse(recall)
  }
  return null
}
