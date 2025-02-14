import { ENV } from '@/astaria/constants/environment'

export const getDisplayAcceptTerms = (acceptedTerms: boolean) =>
  ENV.NEXT_PUBLIC_VERCEL_ENV === 'production' && !acceptedTerms
