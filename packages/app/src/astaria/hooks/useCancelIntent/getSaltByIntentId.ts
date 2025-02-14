'use server'

import { type ChainId } from 'chains'

import { initializeDataSource } from '@/app/api/_/dataSource'

import { CaveatStatus, SignedCaveat } from 'indexer/model'

export const getSaltByIntentId = async ({
  chainId,
  id,
}: {
  chainId: ChainId
  id?: string
}) => {
  const dataSource = await initializeDataSource()
  const signedCaveat = await dataSource.manager
    .getRepository(SignedCaveat)
    .findOneBy({ chainId, id, status: CaveatStatus.Active })

  if (!signedCaveat) {
    throw new Error(`SignedCaveat not found for id: ${id}`)
  }

  return signedCaveat.salt
}
