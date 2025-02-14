'use server'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getAssetsMetadata } from '@/app/api/_/getAssetsMetadata'
import { getIntentAssetIdentifiers } from '@/astaria/hooks/useIntents/getIntentAssetIdentifiers'
import { transformBorrowIntent } from '@/astaria/hooks/useIntents/transformBorrowIntent'
import { transformLendIntent } from '@/astaria/hooks/useIntents/transformLendIntent'
import {
  type GETIntentParameters,
  type GETIntentResponse,
  GETIntentResponseSchema,
} from '@/astaria/types-internal/intent-schemas'

import {
  ArchivedBorrowIntent,
  ArchivedLendIntent,
  BorrowIntent as IndexerBorrowIntent,
  LendIntent as IndexerLendIntent,
} from 'indexer/model'

export const getIntent = async ({ shortId }: GETIntentParameters) => {
  const dataSource = await initializeDataSource()
  let isArchived = false
  const promises = []
  promises.push(
    dataSource.getRepository(IndexerBorrowIntent).findOne({
      relations: {
        recall: {
          starportLoan: true,
        },
        signedCaveat: true,
      },
      where: [
        {
          shortId,
        },
      ],
    }),
  )

  promises.push(
    dataSource
      .getRepository(ArchivedBorrowIntent)
      .findOne({
        relations: {
          signedCaveat: true,
        },
        where: [
          {
            shortId,
          },
        ],
      })
      .then((intent) => {
        if (intent) {
          isArchived = true
          return { ...intent, recall: null }
        } else {
          return null
        }
      }),
  )

  promises.push(
    dataSource
      .getRepository(ArchivedLendIntent)
      .findOne({
        relations: {
          signedCaveat: true,
        },
        where: [
          {
            shortId,
          },
        ],
      })
      .then((intent) => {
        if (intent) {
          isArchived = true
          return { ...intent, recall: null }
        } else {
          return null
        }
      }),
  )

  promises.push(
    dataSource.getRepository(IndexerLendIntent).findOne({
      relations: {
        signedCaveat: true,
      },
      where: [
        {
          shortId,
        },
      ],
    }),
  )

  const intents = (await Promise.all(promises)).filter(
    (intent): intent is Exclude<typeof intent, null> => intent !== null && intent !== undefined,
  )

  if (intents.length === 0) {
    return undefined
  }

  const assets = await getAssetsMetadata({
    assets: getIntentAssetIdentifiers(intents),
  })

  const intent =
    'endTime' in intents[0]
      ? await transformBorrowIntent({
          assets,
          borrowIntent: intents[0],
          dataSource,
        })
      : await transformLendIntent({
          assets,
          lendIntent: intents[0],
        })

  const transformedResponse: GETIntentResponse = {
    intent,
    isArchived,
  }

  return GETIntentResponseSchema.parse(transformedResponse)
}
