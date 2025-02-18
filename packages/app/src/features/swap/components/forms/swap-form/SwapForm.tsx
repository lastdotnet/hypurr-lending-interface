import { Buy } from './Buy'
import { Sell } from './Sell'
import { Form } from '@/ui/atoms/form/Form'
import { UseFormReturn } from 'react-hook-form'
import { SwapFormSchema } from '@/features/swap/logic/useSwap'
import { ToggleButton } from './ToggleButton'
import { Button } from '@/ui/atoms/button/Button'
import { Typography } from '@/ui/atoms/typography/Typography'
import { Token } from '@/domain/types/Token'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'

interface SwapFormProps {
  form: UseFormReturn<SwapFormSchema>
}

const mockToken = new Token({
  symbol: TokenSymbol('USDC'),
  name: 'USDC',
  decimals: 6,
  address: CheckedAddress('0x0000000000000000000000000000000000000000'),
  unitPriceUsd: '1',
})

const mockToken2 = new Token({
  symbol: TokenSymbol('HYPE'),
  name: 'HYPE',
  decimals: 18,
  address: CheckedAddress('0x0000000000000000000000000000000000000000'),
  unitPriceUsd: '1',
})

const assets = [
  { token: mockToken, balance: NormalizedUnitNumber(100) },
  { token: mockToken2, balance: NormalizedUnitNumber(100) },
]

export function SwapForm(props: SwapFormProps) {
  const { form } = props
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <div className="relative z-10">
          <Sell control={form.control} assets={assets} selectedAssets={assets} />
          <ToggleButton className="absolute right-1/2 bottom-0 translate-x-1/2 translate-y-3/4" />
        </div>
        <Buy control={form.control} assets={assets} selectedAssets={assets} />

        <Button className="mt-4 w-full rounded-lg">Wrap</Button>
      </form>

      <div className="flex justify-end">
        <Typography variant="span" className="text-white/50 text-xs">
          Fees: $0.1
        </Typography>
      </div>
    </Form>
  )
}
