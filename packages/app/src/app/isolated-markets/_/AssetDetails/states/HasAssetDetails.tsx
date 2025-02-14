import { type FetchNextPageOptions, type InfiniteData, type InfiniteQueryObserverResult } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { MarketAssetCard } from '@/app/isolated-markets/_/AssetDetails/MarketAssetCard'
import { assetDetailsColumns } from '@/app/isolated-markets/_/AssetDetails/assetDetailsColumns'
import { Card } from '@/astaria/components/Card'
import { CardsContainer } from '@/astaria/components/CardsContainer'
import { DataTable } from '@/astaria/components/DataTable'
import { FetchNextPagePoint } from '@/astaria/components/FetchNextPagePoint'
import { type AssetDetail, type GETAssetDetailsResponse } from '@/astaria/types-internal/market-schemas'

const NUMBER_OF_MORE_SKELETON_CARDS_TO_SHOW = 2

const loadingArray = [...Array(NUMBER_OF_MORE_SKELETON_CARDS_TO_SHOW).keys()]

export const HasAssetDetails = ({
  assetDetails,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isRefetching,
}: {
  assetDetails: AssetDetail[]
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<GETAssetDetailsResponse | undefined>>>
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  isRefetching: boolean
}) => {
  const { inView, ref: endOfPage } = useInView()

  useEffect(() => {
    if (assetDetails && inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [assetDetails, fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <>
      <Card className="hidden md:block">
        <DataTable columns={assetDetailsColumns} data={assetDetails} isFetchingNextPage={isFetchingNextPage} />
        <FetchNextPagePoint ref={endOfPage} />
      </Card>
      <CardsContainer className="md:hidden">
        {assetDetails?.map((assetDetail) => (
          <div key={assetDetail.erc20.address}>
            <MarketAssetCard assetDetails={assetDetail} />
          </div>
        ))}
        {isFetchingNextPage || isRefetching
          ? loadingArray.map((id) => (
              <div key={id}>
                <MarketAssetCard skeleton />
              </div>
            ))
          : null}
      </CardsContainer>
    </>
  )
}
