'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useLingui } from '@lingui/react'
import i18nConfig from '@/i18nConfig'
import { ChangeEvent } from 'react'

export function LanguageSelect() {
  const { i18n } = useLingui()
  const currentLocale = i18n.locale
  const router = useRouter()
  const currentPathname = usePathname()

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value

    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    // redirect to the new locale path
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push(`/${newLocale}${currentPathname}`)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <select onChange={handleChange} value={currentLocale}>
      <option value="en">English</option>
      <option value="zh">Chinese</option>
    </select>
  )
}
