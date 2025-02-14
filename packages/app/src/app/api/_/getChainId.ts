import { type NextRequest } from 'next/server'

import { z } from 'zod'

import { type ChainId } from 'chains'

import { BadRequestError } from '@/app/api/server-error'
import { isSupportedChain } from '@/astaria/utils/isSupportedChain'

export const getChainId = (req: NextRequest) => {
  const chainIdQueryParam = req.nextUrl.searchParams.get('chainId')

  if (!chainIdQueryParam) {
    throw new BadRequestError('Missing query param: chainId')
  }

  const chainId = parseInt(chainIdQueryParam)

  if (!isSupportedChain(chainId)) {
    throw new BadRequestError(`Unsupported chain: ${chainId}`)
  }

  return chainId
}

export const getChainIds = (req: NextRequest) => {
  const chainIdsQueryParam = req.nextUrl.searchParams.getAll('chainId')

  if (!chainIdsQueryParam || chainIdsQueryParam.length === 0) {
    throw new BadRequestError('Missing query param: chainId')
  }

  const chainIds = z
    .string()
    .array()
    .parse(chainIdsQueryParam)
    .map((item) => {
      const chainId = parseInt(item)
      if (!isSupportedChain(chainId)) {
        throw new BadRequestError(`Unsupported chain: ${chainId}`)
      }
      return chainId as ChainId
    })

  return chainIds
}
