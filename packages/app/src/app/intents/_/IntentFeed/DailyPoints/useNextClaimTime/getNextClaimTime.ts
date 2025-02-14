'use server'

import { type Address } from 'viem'

import { initializeDataSource } from '@/app/api/_/dataSource'
import { getNextTime } from '@/astaria/utils/getNextTime'
import { TIME_HAS_PASSED_TIME } from '@/astaria/utils/timeHasPassed'

import { EventType, OffChainPoint } from 'indexer/model'

type GetNextClaimTimeParameters = {
  address: Address
}

export const getNextClaimTime = async ({ address }: GetNextClaimTimeParameters) => {
  const chainDataSource = await initializeDataSource()

  const result = await chainDataSource.manager.getRepository(OffChainPoint).findOne({
    order: {
      createdAt: 'DESC',
    },
    where: {
      address: address.toLowerCase(),
      type: EventType.CheckedIntentFeed,
    },
  })

  if (result) {
    const lastClaimedTime = result.createdAt.getTime()
    return getNextTime({ lastTime: lastClaimedTime })
  }
  return TIME_HAS_PASSED_TIME
}
