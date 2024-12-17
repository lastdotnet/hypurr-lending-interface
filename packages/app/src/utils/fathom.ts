import { Action } from '@/features/actions/logic/types'

export function trackEvent(eventName: string, value?: number): void {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('mode', import.meta.env.MODE)
  if (typeof window !== 'undefined' && window.fathom) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('fathom', window.fathom)
    if (import.meta.env.MODE !== 'production') return
    const options = value !== undefined ? { _value: value } : undefined
    window.fathom.trackEvent(eventName, options)
  } else {
    console.warn('Fathom is not loaded')
  }
}

export function getEventNameByAction(action: Action): string {
  const descriptor = (() => {
    switch (true) {
      case 'token' in action:
        return action.token.symbol
      case 'reserve' in action:
        return action.reserve.token.symbol
      case 'stakingToken' in action:
        return action.stakingToken.symbol
      case 'rewardToken' in action:
        return action.rewardToken.symbol
      case 'eModeCategoryId' in action:
        return `emode_id_${action.eModeCategoryId}`
      case 'fromToken' in action && 'toToken' in action:
        return `${action.fromToken.symbol}_to_${action.toToken.symbol}`
      case 'inToken' in action && 'outToken' in action:
        return `${action.inToken.symbol}_to_${action.outToken.symbol}`
      default: {
        const exhaustiveCheck: never = action
        throw new Error(`Unhandled case: ${exhaustiveCheck}`)
      }
    }
  })()

  return descriptor.toLowerCase()
}
