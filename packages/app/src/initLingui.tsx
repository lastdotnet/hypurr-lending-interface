import { getI18nInstance } from './appRouterI18n'
import { setI18n } from '@lingui/react/server'

export interface PageLangParam {
  params: Promise<{ locale: string }>
}

export function initLingui(lang: string) {
  const i18n = getI18nInstance(lang)
  setI18n(i18n)
  return i18n
}
