'use client'

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from '@/app/isolated/markets/_/AssetDetails/states/Error'
import { HasAssetDetails } from '@/app/isolated/markets/_/AssetDetails/states/HasAssetDetails'
import { Pending } from '@/app/isolated/markets/_/AssetDetails/states/Pending'
import { useAssetDetails } from '@/app/isolated/markets/_/AssetDetails/useAssetDetails'

export const AssetDetails = () => {
  const { assetDetails, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isPending, isRefetching, isSuccess } =
    useAssetDetails()

  if (isSuccess && assetDetails && assetDetails.length > 0) {
    return (
      <HasAssetDetails
        assetDetails={assetDetails}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isRefetching={isRefetching}
      />
    )
  }

  if (isError || (isSuccess && (!assetDetails || (assetDetails && assetDetails.length < 1)))) {
    return <Error />
  }

  if (isPending) {
    return <Pending />
  }

  return null
}
