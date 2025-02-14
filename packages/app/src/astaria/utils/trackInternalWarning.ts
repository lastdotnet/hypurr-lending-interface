'use server'

import { type ErrorPayload, sendInternalWarning, warningSchema } from 'notifications'

import { ENV_SERVER } from '@/astaria/constants/environmentServer'

export async function trackInternalWarning(warningObject: ErrorPayload): Promise<void> {
  const warning = warningSchema.parse(warningObject)

  if (ENV_SERVER.NODE_ENV === 'production' && ENV_SERVER.VERCEL_ENV === 'production' && warning) {
    // Send internal warning to slack (#internal-critical)
    sendInternalWarning(warning)
  }
}
