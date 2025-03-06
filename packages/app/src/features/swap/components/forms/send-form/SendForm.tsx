import { Send } from './Send'
import { Address } from './Address'
import { Form } from '@/ui/atoms/form/Form'
import { UseFormReturn } from 'react-hook-form'
import { SendFormSchema } from '@/features/swap/logic/useSend'
import { Button } from '@/ui/atoms/button/Button'
import { Typography } from '@/ui/atoms/typography/Typography'
import { TokenWithBalance } from '@/domain/common/types'

interface SendFormProps {
  form: UseFormReturn<SendFormSchema>
  guestMode: boolean
  assets: TokenWithBalance[]
  openConnectModal: () => void
}

export function SendForm(props: SendFormProps) {
  const { form, guestMode, assets, openConnectModal } = props

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <Send control={form.control} assets={assets} selectedAssets={assets} />

        <Address control={form.control} />

        {guestMode ? (
          <Button className="mt-4 w-full rounded-lg" onClick={openConnectModal}>
            Connect wallet
          </Button>
        ) : (
          <Button className="mt-4 w-full rounded-lg">Send</Button>
        )}
      </form>

      <div className="flex justify-end">
        <Typography variant="span" className="text-white/50 text-xs">
          Fees: $0.1
        </Typography>
      </div>
    </Form>
  )
}
