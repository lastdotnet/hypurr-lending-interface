import { UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAccount } from '@/domain/hooks/useAccount'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { CheckedAddress } from '@/domain/types/CheckedAddress'
import { NormalizedUnitNumber } from '@/domain/types/NumericValues'
import { Token } from '@/domain/types/Token'
import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { TokenWithBalance, TokenWithValue } from '@/domain/common/types'

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

const mockAssetsWithBalance = [
  { token: mockToken, balance: NormalizedUnitNumber(100) },
  { token: mockToken2, balance: NormalizedUnitNumber(100) },
] as TokenWithBalance[]
const mockAssetsWithValue = [
  { token: mockToken, value: NormalizedUnitNumber(100) },
  { token: mockToken2, value: NormalizedUnitNumber(100) },
] as TokenWithValue[]

const SendFormSchema = z.object({
  amount: z.string(),
  token: z.string(),
  address: z.string(),
})

export type SendFormSchema = z.infer<typeof SendFormSchema>

export interface UseSendResults {
  form: UseFormReturn<SendFormSchema>
  pageStatus: 'form' | 'confirmation' | 'success'
  guestMode: boolean
  mockAssetsWithBalance: TokenWithBalance[]
  mockAssetsWithValue: TokenWithValue[]
  openConnectModal: () => void
}

export function useSend(): UseSendResults {
  const account = useAccount()
  const guestMode = !account
  const { setShowAuthFlow } = useDynamicContext()

  const form = useForm<SendFormSchema>({
    resolver: zodResolver(SendFormSchema),
    defaultValues: {
      amount: '',
      token: '',
      address: '',
    },
  })

  return {
    form,
    pageStatus: 'form',
    guestMode,
    mockAssetsWithBalance,
    mockAssetsWithValue,
    openConnectModal: () => setShowAuthFlow(true),
  }
}
