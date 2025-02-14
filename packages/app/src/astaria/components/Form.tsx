'use client'

import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
} from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

import { clsx } from 'clsx'

import { Label } from '@/astaria/components/Label'

export const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...rest
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: rest.name }}>
    <Controller {...rest} />
  </FormFieldContext.Provider>
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { formState, getFieldState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

export const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...rest }, ref) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={className} {...rest} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = 'FormItem'

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    above?: boolean
  }
>(({ above = true, children, className, ...rest }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      above={above}
      className={clsx(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...rest}
    >
      {children}
    </Label>
  )
})
FormLabel.displayName = 'FormLabel'

export const FormControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...rest }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField()

    return (
      <Slot
        ref={ref}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        id={formItemId}
        {...rest}
      />
    )
  },
)
FormControl.displayName = 'FormControl'

export const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...rest }, ref) => {
    const { formDescriptionId } = useFormField()

    return <p ref={ref} className={clsx('text-sm text-muted-foreground', className)} id={formDescriptionId} {...rest} />
  },
)
FormDescription.displayName = 'FormDescription'

export const FormMessage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...rest }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <div
        ref={ref}
        className={clsx('text-sm font-medium', { 'text-destructive': error }, className)}
        id={formMessageId}
        {...rest}
      >
        {body}
      </div>
    )
  },
)
FormMessage.displayName = 'FormMessage'
