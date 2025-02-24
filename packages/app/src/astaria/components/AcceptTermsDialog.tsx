'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/astaria/components/Button'
import { Checkbox } from '@/astaria/components/Checkbox'
import {
  Dialog,
  DialogActions,
  DialogContainer,
  DialogContent,
  DialogForm,
  DialogHeader,
  DialogTitle,
} from '@/astaria/components/Dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/astaria/components/Form'
import { TextLink } from '@/astaria/components/TextLink'
import { ACCEPT_TERMS_LOCAL_STORAGE_KEY, APP_DATA } from '@/astaria/config/config'
import { ROUTES } from '@/astaria/constants/routes'

const formSchema = z.object({
  accept: z.boolean({ required_error: 'Please accept the terms' }),
})

type FormSchemaType = z.infer<typeof formSchema>

type AcceptTermsModalProps = {
  onAcceptTerms: (() => void) | undefined
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}
export const AcceptTermsDialog = ({ onAcceptTerms, open, setOpen }: AcceptTermsModalProps) => {
  const [, setAcceptedTerms] = useLocalStorage<boolean>(ACCEPT_TERMS_LOCAL_STORAGE_KEY, false)
  const form = useForm<FormSchemaType>({
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form

  const onSubmit = async () => {
    setOpen(false)
    setAcceptedTerms(true)
    if (onAcceptTerms) {
      onAcceptTerms()
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContainer>
        <Form {...form}>
          <DialogForm id="acceptTermsForm" noValidate onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Welcome to {APP_DATA.SHORT_NAME}.</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <p>
                Please confirm your agreement to {APP_DATA.NAME}&apos;s{' '}
                <TextLink href={ROUTES.TERMS}>Terms of Use</TextLink> and{' '}
                <TextLink href={ROUTES.PRIVACY}>Privacy Policy</TextLink>:
              </p>

              <FormField
                control={control}
                name="accept"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        className="mr-2"
                        data-autofocus
                        isError={!!errors.accept}
                        label={
                          <span className="text-sm">
                            I have read and understand, and do hereby agree to be bound by the{' '}
                            <TextLink href={ROUTES.TERMS}>Terms of Use</TextLink> and{' '}
                            <TextLink href={ROUTES.PRIVACY}>Privacy Policy</TextLink>, including all future amendments
                            thereto. Such agreement is irrevocable and will apply to all my uses of {APP_DATA.NAME}
                            &apos;s websites, applications, smart contracts and content without providing confirmation
                            in each instance. I understand that {APP_DATA.NAME} does not endorse or provide any warranty
                            with respect to products, tokens or crypto assets.
                          </span>
                        }
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button
                className="border-r-0 border-b-0 border-l-0"
                form="acceptTermsForm"
                fullWidth
                rounded="dialog"
                type="submit"
              >
                Accept &amp; connect
              </Button>
            </DialogActions>
          </DialogForm>
        </Form>
      </DialogContainer>
    </Dialog>
  )
}
