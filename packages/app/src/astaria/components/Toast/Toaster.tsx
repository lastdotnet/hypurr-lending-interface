'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/astaria/components/Toast'
import { useToast } from '@/astaria/components/Toast/useToast'

export const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ action, description, icon, id, title, ...rest }) => (
        <Toast key={id} {...rest}>
          <div className="flex items-center gap-2">
            {icon ? <div className="shrink-0">{icon}</div> : null}
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
