import { forwardRef } from 'react'
import { type ControllerRenderProps } from 'react-hook-form'

import { Input, type InputProps } from '@/astaria/components/Input'

type FileInputProps = Pick<ControllerRenderProps, 'onChange' | 'value'> & Omit<InputProps, 'onChange' | 'value'>

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ onChange, value, ...rest }, ref) => (
  <Input
    ref={ref}
    onChange={(event) => {
      if (onChange && event?.target?.files?.length) {
        onChange(event.target.files.item(0))
      }
    }}
    type="file"
    // Prevent
    // Uncaught DOMException: Failed to set the 'value' property on 'HTMLInputElement':
    // This input element accepts a filename, which may only be programmatically set to the empty string.
    // https://claritydev.net/blog/react-hook-form-multipart-form-data-file-uploads#using-controlled-input
    value={value?.fileName}
    {...rest}
  />
))
FileInput.displayName = 'FileInput'
