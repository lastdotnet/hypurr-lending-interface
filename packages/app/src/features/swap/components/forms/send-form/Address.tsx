import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'

import { Control } from 'react-hook-form'
import { ControlledAddressInput } from '@/ui/organisms/controlled-address-input/ControlledAddressInput'
import { SendFormSchema } from '../../../logic/useSend'

interface AddressProps {
  control: Control<SendFormSchema>
}

export function Address(props: AddressProps) {
  const { control } = props
  return (
    <Panel.Wrapper className="mt-2 p-4 pb-5">
      <Typography variant="h4" className="py-3 font-semibold">
        Address
      </Typography>

      <div>
        <div className="mt-2 flex flex-row items-start gap-2">
          <ControlledAddressInput fieldName="address" control={control} />
        </div>
      </div>
    </Panel.Wrapper>
  )
}
