// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface Window {
  fathom?: {
    trackEvent: (eventName: string, options?: { _value?: number }) => void
  }
}
