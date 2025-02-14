import { type ReactNode } from 'react'

import { TextLink } from '@/astaria/components/TextLink'
import { CONTACT_EMAIL } from '@/astaria/constants/emails'
import { SUPPORT_URL } from '@/astaria/constants/urls'

type SupportLinkProps = {
  children: string | ReactNode
  type?: undefined | 'url' | 'email'
}

export const SupportLink = ({ children, type = 'url' }: SupportLinkProps) => {
  const href = type === 'url' ? SUPPORT_URL : `mailto:${CONTACT_EMAIL}`

  return <TextLink href={href}>{children}</TextLink>
}
