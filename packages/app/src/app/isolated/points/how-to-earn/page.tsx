import { IconBook } from '@tabler/icons-react'

import { pointsStaticData } from '@/app/isolated/points/_/pointsStaticData'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'
import { DOCS_URL } from '@/astaria/constants/urls'
import { PageLayout } from '@/ui/layouts/PageLayout'
import { Typography } from '@/ui/atoms/typography/Typography'

export const metadata = {
  title: 'How to earn points',
}

const EarnPointsPage = () => (
  <PageLayout className="max-w-6xl gap-8 px-3 lg:px-0">
    <div className="flex flex-row items-center justify-between gap-4">
      <Typography variant="h2" gradient>
        How to earn points
      </Typography>
      <div className="text-center">
        <TextLink href={ROUTES.POINTS_HISTORY}>View my points</TextLink>
      </div>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {[pointsStaticData.borrow, pointsStaticData.lend].map(({ details, howToEarnText, icon, type }) => (
        <div key={type} className="border p-5">
          <div className="flex items-center gap-2">
            {icon}
            <strong className="font-semibold text-xl">{howToEarnText}</strong>
          </div>
          {details?.map((item) => (
            <p key={item} className="mt-3">
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
    <div className="mt-5 flex justify-center gap-2 font-bold">
      <IconBook />
      <span>
        Learn more by visiting <TextLink href={DOCS_URL}>our docs</TextLink>
      </span>
    </div>
  </PageLayout>
)

export default EarnPointsPage
