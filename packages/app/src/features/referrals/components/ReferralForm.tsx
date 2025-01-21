import { useForm, Controller } from 'react-hook-form'
import { ReferralInput } from './ReferralInput'
import { Button } from '@/ui/atoms/button/Button'

type ReferralFormValues = {
  referralCode: string
}

export const ReferralForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, touchedFields },
  } = useForm<ReferralFormValues>({
    defaultValues: {
      referralCode: '',
    },
  })

  const onSubmit = (data: ReferralFormValues) => {
    // biome-ignore lint/suspicious/noConsoleLog: wait API
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-start gap-x-3">
      <Controller
        name="referralCode"
        control={control}
        rules={{
          required: 'Referral code is required',
          minLength: {
            value: 4,
            message: 'Referral code must be at least 4 characters',
          },
        }}
        render={({ field }) => (
          <ReferralInput
            {...field}
            onChange={(e) => field.onChange(e.target.value.replace(/\s/g, ''))} // Remove spaces on input
            error={touchedFields.referralCode ? errors.referralCode?.message : undefined}
            placeholder='Enter tracking code you want to use, ie."MEOW"'
          />
        )}
      />
      <div className="flex grow-0">
        <Button type="submit" className="w-full rounded-full px-8">
          Claim Code
        </Button>
      </div>
    </form>
  )
}
