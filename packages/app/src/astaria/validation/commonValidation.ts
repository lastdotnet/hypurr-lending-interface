import { z } from 'zod'

export const EMAIL_VALIDATION = z.string().min(1, 'Enter your email').email()
