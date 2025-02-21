import { type Hash } from 'viem'

import type { Metadata } from 'next'

import { Intent } from '@/app/isolated/i/[shortId]/_/Intent'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from '@/app/isolated/i/[shortId]/_/states/Error'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'
import { shorten } from '@/astaria/utils/shorten'

const PAGE_TITLE = 'Intent'

const getPageTitle = (shortId: string) => `${PAGE_TITLE} ${shorten({ maxLength: 10, value: shortId })}`

type MetadataProps = Promise<{ shortId: string }>

export async function generateMetadata({ params }: { params: MetadataProps }): Promise<Metadata> {
  const shortId = decodeURIComponent((await params).shortId)

  return {
    title: getPageTitle(shortId),
  }
}

const IntentPage = async ({ params }: { params: Promise<{ shortId: string }> }) => {
  const shortId = decodeURIComponent((await params).shortId)

  return (
    <Page className="space-y-4" size="narrow">
      <Heading className="text-center" level={1}>
        {getPageTitle(shortId)}
      </Heading>
      {(() => {
        if (shortId) {
          return <Intent shortId={shortId as Hash} />
        }
        return <Error shortId={shortId} />
      })()}
    </Page>
  )
}

export default IntentPage
