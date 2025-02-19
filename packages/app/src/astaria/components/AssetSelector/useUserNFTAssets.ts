import { useInfiniteQuery } from '@tanstack/react-query'

import { type Address } from 'viem'

import { type ChainId } from 'chains'

import { SimpleHash } from '@/astaria/codegen/api/simplehash'
import { ENV } from '@/astaria/constants/environment'
import { SIMPLE_HASH_NETWORK_MAP } from '@/astaria/constants/simpleHash'
import { useChainId } from '@/astaria/hooks/useChainId'

import { type ERC721 } from 'assets'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

const NFTS_PER_PAGE = 8

const simpleHashApi = new SimpleHash({
  HEADERS: { 'X-API-KEY': ENV.NEXT_PUBLIC_SIMPLEHASH_API_KEY },
})

type SimpleHashNFTsByOwnersResponse = Awaited<ReturnType<typeof simpleHashApi.default.nftsByOwners>>
type SimpleHashNFTsByOwnersResponseNFT = NonNullable<SimpleHashNFTsByOwnersResponse['nfts']>[number]
type CleanSimpleHashNFTsByOwnersResponse = {
  next?: SimpleHashNFTsByOwnersResponse['next']
  nextCursor?: SimpleHashNFTsByOwnersResponse['next_cursor']
  nfts?: ERC721[]
  previous?: SimpleHashNFTsByOwnersResponse['previous']
}

const transformNFTDataStructure = (nft: SimpleHashNFTsByOwnersResponseNFT): ERC721 => ({
  address: nft.contract_address as Address, // these types are handled in the filter below
  collection: {
    image: nft.collection?.image_url || undefined,
    name: nft.collection?.name,
  },
  image: nft.image_url || undefined,
  tokenId: BigInt(nft.token_id as string), // these types are handled in the filter below
})

const getNFTsByOwner = async ({
  address,
  chainId,
  cursor,
  limit = NFTS_PER_PAGE,
}: {
  address: Address | undefined
  chainId: ChainId
  cursor?: string
  limit: number
}) => {
  const simpleHashNetwork = SIMPLE_HASH_NETWORK_MAP[chainId]

  const response = await simpleHashApi.default.nftsByOwners({
    chains: simpleHashNetwork,
    cursor,
    limit,
    walletAddresses: address,
  })

  return {
    ...response,
    nextCursor: response.next_cursor,
    nfts: response.nfts
      ?.filter((nft) => nft.contract_address && nft.token_id && nft.contract?.type !== 'ERC1155')
      .map((nft: any) => transformNFTDataStructure(nft)),
  }
}

export const useUserNFTAssets = ({
  limit = NFTS_PER_PAGE,
}: {
  limit?: number
}) => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const chainId = useChainId()

  const { data, ...rest } = useInfiniteQuery({
    getNextPageParam: (lastPage: CleanSimpleHashNFTsByOwnersResponse) => lastPage?.nextCursor,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getNFTsByOwner({
        address,
        chainId,
        ...(typeof pageParam === 'string' ? { cursor: pageParam } : {}),
        limit,
      }),
    queryKey: ['getAssetsByOwner', { address, chainId }],
  })

  const nfts = data?.pages.flatMap((page) => page.nfts ?? []) ?? []

  return {
    nfts,
    ...rest,
  }
}
