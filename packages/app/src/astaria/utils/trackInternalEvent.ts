'use server'

import { type Event, eventSchema, sendInternalEvent } from 'notifications'

import { ENV_SERVER } from '@/astaria/constants/environmentServer'

export async function trackInternalEvent(eventObject: Event): Promise<void> {
  const event = eventSchema.parse(eventObject)

  if (ENV_SERVER.NODE_ENV === 'production' && ENV_SERVER.VERCEL_ENV === 'production' && event && event.payload) {
    // Send internal event to slack (#internal-event-feed)
    sendInternalEvent(event.payload)
  }
}
