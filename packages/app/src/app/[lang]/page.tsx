import { EasyBorrowPage } from '@/containers/Borrow'
import { initLingui } from '@/initLingui'

export default async function Page(props: { params: { lang: string } }) {
  const lang = (await props.params).lang
  initLingui(lang)
  return <EasyBorrowPage />
}
