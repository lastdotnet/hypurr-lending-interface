import Link from 'next/link'

import { History } from '@/app/isolated/points/history/_'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page'
import { Tabs, TabsList, TabsTrigger } from '@/astaria/components/Tabs'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'

export const metadata = {
  title: 'Points',
}

const HistoryPage = () => (
  <Page className="space-y-4">
    <section>
      <Heading className="text-center" level={1}>
        Points history
      </Heading>
      <div className="text-center">
        <TextLink href={ROUTES.POINTS_HOW_TO_EARN}>How do I earn points?</TextLink>
      </div>
    </section>
    <Tabs className="mx-auto max-w-sm" defaultValue="history">
      <TabsList>
        <TabsTrigger value="history">Points history</TabsTrigger>
        <TabsTrigger asChild value="leaderboard">
          <Link href={ROUTES.POINTS_LEADERBOARD}>Points leaderboard</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <History />
  </Page>
)

export default HistoryPage
