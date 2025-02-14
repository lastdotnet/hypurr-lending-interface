import { IconCheck } from '@tabler/icons-react'
import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { clsx } from 'clsx'

import { AssetImageBox } from '@/astaria/components/AssetImageBox'
import { ERC721ImageBox } from '@/astaria/components/AssetImageBox/ERC721ImageBox'
import { useUserNFTAssets } from '@/astaria/components/AssetSelector/useUserNFTAssets'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/astaria/components/Command'
import { FetchNextPagePoint } from '@/astaria/components/FetchNextPagePoint'
import { Form, FormField, FormItem, FormMessage } from '@/astaria/components/Form'

import { type ERC721, type IntentAsset, isERC721Asset } from 'assets'

const NUMBER_OF_INITIAL_SKELETON_NFTS_TO_SHOW = 4

const NFTLoadingArray = [...Array(NUMBER_OF_INITIAL_SKELETON_NFTS_TO_SHOW).keys()]

const formSchema = z.object({
  asset: z.string({ required_error: 'Please select an asset' }),
})

type FormSchemaType = z.infer<typeof formSchema>
export const ERC721Selector = ({
  asset,
  setAsset,
  setDialogOpen,
}: {
  asset: IntentAsset
  setAsset: (asset: ERC721) => void
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const form = useForm<FormSchemaType>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  })
  const { control } = form
  const { inView, ref: endOfPage } = useInView()

  const { fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isPending, nfts } = useUserNFTAssets({})

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage])

  return (
    <Form {...form}>
      <form id="NFTSelectorForm" noValidate>
        <FormField
          control={control}
          name="asset"
          render={() => (
            <FormItem>
              <Command value={isERC721Asset(asset) ? asset.tokenId.toString() : undefined}>
                <CommandInput className="mb-2" placeholder="Search for a NFT…" />
                <CommandList className="max-h-96 [&_[cmdk-list-sizer]]:grid [&_[cmdk-list-sizer]]:grid-cols-2">
                  <CommandEmpty>No NFTs found</CommandEmpty>
                  {nfts?.map((nft) => (
                    <CommandItem
                      key={`${nft.collection?.name} ${nft.tokenId.toString()}`}
                      className="cursor-pointer"
                      onSelect={() => {
                        setAsset(nft)
                        setDialogOpen(false)
                      }}
                      value={`${nft.collection?.name}:${nft.collection?.name?.toLowerCase()}:${nft.tokenId.toString()}:${nft.tokenId.toString().toLowerCase()}`}
                    >
                      <ERC721ImageBox asset={nft} className="h-[151px] w-[151px]" inCard indicator={false} />
                      {isERC721Asset(asset) && asset.tokenId === nft.tokenId ? (
                        <div className="absolute right-2 top-1.5 flex items-center justify-center border bg-white p-4">
                          <IconCheck className={clsx('h-4 w-4 shrink-0')} />
                        </div>
                      ) : null}
                    </CommandItem>
                  ))}
                  {isFetching || isPending
                    ? NFTLoadingArray.map((id) => (
                        <CommandItem key={id}>
                          <AssetImageBox asset={undefined} indicator={false} skeleton />
                        </CommandItem>
                      ))
                    : null}
                </CommandList>
              </Command>
              <FormMessage />
            </FormItem>
          )}
        />
        <FetchNextPagePoint ref={endOfPage} />
      </form>
    </Form>
  )
}
