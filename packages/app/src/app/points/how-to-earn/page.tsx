import { IconBook } from '@tabler/icons-react'

import { pointsStaticData } from '@/app/points/_/pointsStaticData'
import { Heading } from '@/astaria/components/Heading'
import { Page } from '@/astaria/components/Page/Page'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'
import { DOCS_URL } from '@/astaria/constants/urls'

export const metadata = {
  title: 'How to earn points',
}

const EarnPointsPage = () => (
  <Page>
    <Heading className="text-center" level={1}>
      How to earn points
    </Heading>
    <div className="mb-5 text-center">
      <TextLink href={ROUTES.POINTS_HISTORY}>View my points</TextLink>
    </div>

    <div className="grid gap-5 md:grid-cols-2">
      {[pointsStaticData.borrow, pointsStaticData.lend].map(({ details, howToEarnText, icon, type }) => (
        <div key={type} className="border bg-white p-5">
          <div className="flex items-center gap-2">
            {icon}
            <strong className="text-xl font-semibold">{howToEarnText}</strong>
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
  </Page>
)

export default EarnPointsPage
