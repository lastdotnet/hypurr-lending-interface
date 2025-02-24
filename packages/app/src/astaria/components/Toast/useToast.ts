'use client'

// Inspired by react-hot-toast library
import { type ReactNode, useEffect, useState } from 'react'

import { type ToastActionElement, type ToastProps } from '@/astaria/components/Toast'

const TOAST_LIMIT = 3
const NOTIFICATION_CLOSE_TIME = 7500

type ToasterToast = ToastProps & {
  action?: ToastActionElement
  description?: ReactNode
  icon?: ReactNode
  id: string
  timeout?: number
  title?: ReactNode
}

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
} as const

let count = 0

const genId = () => {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      toast: ToasterToast
      type: ActionType['ADD_TOAST']
    }
  | {
      toast: Partial<ToasterToast>
      type: ActionType['UPDATE_TOAST']
    }
  | {
      toastId?: ToasterToast['id']
      type: ActionType['DISMISS_TOAST']
    }
  | {
      toastId?: ToasterToast['id']
      type: ActionType['REMOVE_TOAST']
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = ({
  timeout = NOTIFICATION_CLOSE_TIME,
  toastId,
}: {
  timeout?: number
  toastId: string
}) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const toastTimeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      toastId,
      type: 'REMOVE_TOAST',
    })
  }, timeout)

  toastTimeouts.set(toastId, toastTimeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((toast) => (toast.id === action.toast.id ? { ...toast, ...action.toast } : toast)),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue({ toastId })
      } else {
        // biome-ignore lint/complexity/noForEach: <explanation>
        state.toasts.forEach((toast) => {
          addToRemoveQueue({ toastId: toast.id })
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined
            ? {
                ...toast,
                open: false,
              }
            : toast,
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

const dispatch = (action: Action) => {
  memoryState = reducer(memoryState, action)
  // biome-ignore lint/complexity/noForEach: <explanation>
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export type Toast = Omit<ToasterToast, 'id'>

export const toast = ({ ...rest }: Toast) => {
  const id = genId()

  const update = (rest: ToasterToast) =>
    dispatch({
      toast: { ...rest, id },
      type: 'UPDATE_TOAST',
    })
  const dismiss = () => dispatch({ toastId: id, type: 'DISMISS_TOAST' })

  dispatch({
    toast: {
      ...rest,
      id,
      onOpenChange: (open: boolean) => {
        rest.onOpenChange?.(open)
        if (!open) {
          dismiss()
        }
      },
      open: true,
    },
    type: 'ADD_TOAST',
  })

  return {
    dismiss,
    id,
    update,
  }
}

export type ToastReturnType = ReturnType<typeof toast>

export const useToast = () => {
  const [state, setState] = useState<State>(memoryState)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    dismiss: (toastId?: string) => dispatch({ toastId, type: 'DISMISS_TOAST' }),
    toast,
  }
}
