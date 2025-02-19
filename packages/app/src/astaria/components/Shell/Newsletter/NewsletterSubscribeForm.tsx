import { IconCheck, IconX } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { EVENT } from 'notifications'

import { Button } from '@/astaria/components/Button'
import { Form, FormField, FormItem, FormMessage } from '@/astaria/components/Form'
import { Input } from '@/astaria/components/Input'
import { useSubscribeToNewsLetter } from '@/astaria/components/Shell/Newsletter/useSubscribeToNewsletter'
import { useToast } from '@/astaria/components/Toast/useToast'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'
import { trackInternalEvent } from '@/astaria/utils/trackInternalEvent'
import { EMAIL_VALIDATION } from '@/astaria/validation/commonValidation'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Address } from 'viem'

const formSchema = z.object({
  email: EMAIL_VALIDATION,
})

type FormSchemaType = z.infer<typeof formSchema>

export const NewsletterSubscribeForm = () => {
  const { primaryWallet: wallet } = useDynamicContext()

  const address = wallet?.address as Address | undefined

  const { toast } = useToast()

  const form = useForm<FormSchemaType>({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  })
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = form

  const {
    isError: isErrorSubscribeToNewsLetter,
    isPending: isPendingSubscribeToNewsLetter,
    mutateAsync: subscribeToNewsLetter,
  } = useSubscribeToNewsLetter()

  const onSubmit = async (values: FormSchemaType) => {
    const emailEncoded = encodeURIComponent(values.email)

    await subscribeToNewsLetter(emailEncoded).then(() => {
      trackInternalEvent({
        name: EVENT.ACCOUNT_BLACKLIST_REJECT,
        payload: {
          description: `User ${values.email} is now subscribed to our newsletter list!`,
          title: 'Email Newsletter Subscription',
          values: {
            account: address as string,
          },
        },
      })
      sendSafaryClubEvent({
        eventName: 'Sign up for the Newsletter',
        eventType: 'offchain',
      })
    })

    if (isErrorSubscribeToNewsLetter) {
      toast({
        description: `There was an error subscribing ${values.email} to our newsletter list. Please try again.`,
        icon: <IconX />,
        title: 'Email subscription error!',
      })

      return
    }

    toast({
      description: `Let’s go! ${values.email} is now subscribed to our newsletter list.`,
      icon: <IconCheck />,
      title: 'Email subscription success!',
    })

    reset()
  }

  return (
    <Form {...form}>
      <form className="flex shrink-0" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Input
                aria-label="Join our newsletter"
                {...field}
                isError={!!errors.email}
                placeholder="join our newsletter"
                type="email"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="-ml-px" loading={isSubmitting || isPendingSubscribeToNewsLetter} type="submit">
          Subscribe
        </Button>
      </form>
    </Form>
  )
}
