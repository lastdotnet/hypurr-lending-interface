import { type Workbox } from 'workbox-window'

declare global {
  interface Window {
    safary?: {
      track: (args: {
        eventName: string
        eventType: string
        parameters?: { [key: string]: string | number | boolean }
      }) => void
    }
    workbox: Workbox
  }
}
