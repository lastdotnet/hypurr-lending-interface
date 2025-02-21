import { EasyBorrowPage } from '@/containers/Borrow'
import { initLingui, PageLangParam } from '@/initLingui'

export default async function Page(props: PageLangParam) {
  const lang = (await props.params).locale
  initLingui(lang)
  return <EasyBorrowPage />
}
