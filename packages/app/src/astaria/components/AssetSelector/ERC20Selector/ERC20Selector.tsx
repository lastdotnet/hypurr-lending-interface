import { type ComponentProps, type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { ERC20SelectorItems } from '@/astaria/components/AssetSelector/ERC20Selector/ERC20SelectorItems'
import { Command, CommandEmpty, CommandInput, CommandList } from '@/astaria/components/Command'
import { Form, FormField, FormItem, FormMessage } from '@/astaria/components/Form'

import { type ERC20Asset, type IntentAsset, isERC20Asset } from 'assets'

const formSchema = z.object({
  token: z.string({ required_error: 'Please select a token' }),
})

type FormSchemaType = z.infer<typeof formSchema>
export const ERC20Selector = ({
  asset,
  setAsset,
  setDialogOpen,
  type,
}: {
  asset: IntentAsset
  setAsset: (asset: ERC20Asset) => void
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  type: 'borrow' | 'collateral' | 'deposit'
}) => {
  const form = useForm<FormSchemaType>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  })
  const { control } = form

  const [query, setQuery] = useState<string>()

  const commandFilter: ComponentProps<typeof Command>['filter'] = (value, search) => {
    if (value.includes(search.toLowerCase())) {
      return 1
    }

    return 0
  }

  return (
    <Form {...form}>
      <form id="tokenSelectorForm" noValidate>
        <FormField
          control={control}
          name="token"
          render={() => (
            <FormItem>
              <Command filter={commandFilter} value={`${asset.address}:${isERC20Asset(asset) ? asset.symbol : ''}`}>
                <CommandInput
                  className="mb-2"
                  onValueChange={setQuery}
                  placeholder="Search for a token or enter an address…"
                />
                <CommandList className="max-h-96">
                  <CommandEmpty>No tokens found</CommandEmpty>
                  <ERC20SelectorItems
                    asset={asset}
                    query={query}
                    setAsset={setAsset}
                    setDialogOpen={setDialogOpen}
                    type={type}
                  />
                </CommandList>
              </Command>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
