import Link from 'next/link'

import { History } from '@/app/isolated/points/history/_'
import { Tabs, TabsList, TabsTrigger } from '@/astaria/components/Tabs'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'
import { Typography } from '@/ui/atoms/typography/Typography'
import { PageLayout } from '@/ui/layouts/PageLayout'

export const metadata = {
  title: 'Points',
}

const HistoryPage = () => (
  <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
    <div className="flex flex-row items-center justify-between gap-4">
      <Typography variant="h2" gradient>
        Points history
      </Typography>
      <div className="text-center">
        <TextLink href={ROUTES.POINTS_HOW_TO_EARN}>How do I earn points?</TextLink>
      </div>
    </div>
    <Tabs className="mx-auto max-w-sm" defaultValue="history">
      <TabsList>
        <TabsTrigger value="history">Points history</TabsTrigger>
        <TabsTrigger asChild value="leaderboard">
          <Link href={ROUTES.POINTS_LEADERBOARD}>Points leaderboard</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <History />
  </PageLayout>
)

export default HistoryPage
