import { type ChainId } from 'chains'
import { type DataSource, type EntityTarget, type ObjectLiteral } from 'typeorm'

import { ArchivedBorrowIntent, ArchivedLendIntent, BorrowIntent, LendIntent } from 'indexer/model'

const intentVolumeHelper = async ({
  chainId,
  dataSource,
  modelType,
}: {
  chainId: ChainId
  dataSource: DataSource
  modelType: EntityTarget<ObjectLiteral>
}) => {
  const result = await dataSource
    .getRepository(modelType)
    .createQueryBuilder('query')
    .select('SUM(COALESCE(query.usdValueCollateral, 0) + COALESCE(query.usdValueBorrow, 0))', 'totalVolume')
    .where('query.chainId = :chainId', { chainId })
    .getRawOne()

  return Number(result.totalVolume) || 0
}

export const calculateIntentVolume = async ({
  chainId,
  dataSource,
}: {
  chainId: ChainId
  dataSource: DataSource
}) => {
  const results = await Promise.all([
    intentVolumeHelper({ chainId, dataSource, modelType: BorrowIntent }),
    intentVolumeHelper({ chainId, dataSource, modelType: LendIntent }),
    intentVolumeHelper({
      chainId,
      dataSource,
      modelType: ArchivedBorrowIntent,
    }),
    intentVolumeHelper({ chainId, dataSource, modelType: ArchivedLendIntent }),
  ])

  const totalIntentVolume = results.reduce((acc, res) => acc + res)

  return { totalIntentVolume }
}
