import { type Hash } from 'viem'

import type { Metadata } from 'next'

import { Intent } from '@/app/isolated/i/[shortId]/_/Intent'
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Error } from '@/app/isolated/i/[shortId]/_/states/Error'
import { shorten } from '@/astaria/utils/shorten'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { Typography } from '@/ui/atoms/typography/Typography'

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
    <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
      <div className="flex flex-row items-center gap-4">
        <Typography variant="h2" gradient>
          {getPageTitle(shortId)}
        </Typography>
      </div>
      {(() => {
        if (shortId) {
          return <Intent shortId={shortId as Hash} />
        }
        return <Error shortId={shortId} />
      })()}
    </PageLayout>
  )
}

export default IntentPage
