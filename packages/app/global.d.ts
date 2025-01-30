/// <reference types="vite-plugin-svgr/client" />
declare const __BUILD_SHA__: string | undefined
declare const __BUILD_TIME__: string | undefined

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface Window {
  fathom?: {
    trackEvent: (eventName: string, options?: { _value?: number }) => void
  }
}
