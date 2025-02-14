import { IconBrandX } from '@tabler/icons-react'
import Image from 'next/image'

import ArringtonCapital from '@/app/_/HomePage/LeadershipAndInvestorsSection/arrington-capital.webp'
import ConsensysLogo from '@/app/_/HomePage/LeadershipAndInvestorsSection/consensys.svg?url'
import EtherealVentures from '@/app/_/HomePage/LeadershipAndInvestorsSection/ethereal-ventures.webp'
import Joe from '@/app/_/HomePage/LeadershipAndInvestorsSection/joe.webp'
import Justin from '@/app/_/HomePage/LeadershipAndInvestorsSection/justin.webp'
import KrakenLogo from '@/app/_/HomePage/LeadershipAndInvestorsSection/kraken.webp'
import OndoLogo from '@/app/_/HomePage/LeadershipAndInvestorsSection/ondo.webp'
import RedactedLogo from '@/app/_/HomePage/LeadershipAndInvestorsSection/redacted.webp'
import RepublicCapital from '@/app/_/HomePage/LeadershipAndInvestorsSection/republic-capital.webp'
import SushiLogo from '@/app/_/HomePage/LeadershipAndInvestorsSection/sushi.webp'
import TheLao from '@/app/_/HomePage/LeadershipAndInvestorsSection/the-lao.webp'
import TrueVentures from '@/app/_/HomePage/LeadershipAndInvestorsSection/true-ventures.webp'
import Wintermute from '@/app/_/HomePage/LeadershipAndInvestorsSection/wintermute.webp'
import { Card, CardSection } from '@/astaria/components/Card'
import { CardsContainer } from '@/astaria/components/CardsContainer'
import { Heading } from '@/astaria/components/Heading'
import { PageSection } from '@/astaria/components/Page/PageSection'
import { TextLink } from '@/astaria/components/TextLink'

export const LeadershipAndInvestorsSection = () => (
  <PageSection className="space-y-8">
    <Heading className="text-center" level={2}>
      Astaria Leadership
    </Heading>
    <div className="grid w-full gap-5 lg:grid-cols-2">
      <Card className="w-full">
        <CardSection className="flex gap-5">
          <div>
            <Image alt="Justin Bram" quality={85} src={Justin} width={120} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold md:text-2xl">Justin Bram</span>
              <TextLink aria-label="Justin on Twitter" href="https://twitter.com/JustinCBram" showIcon={false}>
                <IconBrandX />
              </TextLink>
            </div>
            <div className="font-semibold md:text-xl">CEO</div>
            <div className="mt-auto italic">Prev. Ondo</div>
          </div>
        </CardSection>
      </Card>
      <Card className="w-full">
        <CardSection className="flex gap-5">
          <div>
            <Image alt="Joseph Delong" quality={85} src={Joe} width={120} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold md:text-2xl">Joseph Delong</span>
              <TextLink aria-label="Joe on Twitter" href="https://twitter.com/josephdelong" showIcon={false}>
                <IconBrandX />
              </TextLink>
            </div>
            <div className="font-semibold md:text-xl">CTO</div>
            <div className="mt-auto italic">Prev. Sushi, ETH Core Dev</div>
          </div>
        </CardSection>
      </Card>
    </div>
    <div className="flex flex-col items-center gap-5">
      <p className="italic">Our team has diverse experience across leading crypto companies in the industry.</p>
      <div className="flex flex-wrap items-center gap-5">
        <div>
          <Image alt="Kraken" className="shrink-0" height={20} src={KrakenLogo} />
        </div>
        <div>
          <Image alt="Ondo Finance" className="shrink-0" height={20} src={OndoLogo} />
        </div>
        <div>
          <Image alt="SushiSwap" className="shrink-0" height={20} src={SushiLogo} />
        </div>
        <div>
          <Image alt="Consensys" className="shrink-0" height={20} src={ConsensysLogo} />
        </div>
        <div>
          <Image alt="Redacted" className="shrink-0" height={20} src={RedactedLogo} />
        </div>
      </div>
    </div>

    <Heading className="text-center" level={2}>
      Our Investors
    </Heading>
    <Card>
      <CardsContainer>
        <CardSection className="flex items-center justify-center">
          <Image alt="True Ventures" className="shrink-0" src={TrueVentures} width={180} />
        </CardSection>
        <CardSection className="flex items-center justify-center">
          <Image alt="Ethereal Ventures" className="shrink-0" src={EtherealVentures} width={146} />
        </CardSection>
        <CardSection className="flex items-center justify-center">
          <Image alt="Arrington Capital" className="shrink-0" src={ArringtonCapital} width={180} />
        </CardSection>
        <CardSection className="flex items-center justify-center">
          <Image alt="Wintermute" className="shrink-0" src={Wintermute} width={144} />
        </CardSection>
        <CardSection className="flex items-center justify-center">
          <Image alt="Republic Capital" className="shrink-0" src={RepublicCapital} width={100} />
        </CardSection>
        <CardSection className="flex items-center justify-center">
          <Image alt="The LAO" className="shrink-0" src={TheLao} width={127} />
        </CardSection>
      </CardsContainer>
    </Card>
    <Card>
      <CardsContainer>
        <CardSection>
          <div className="text-xl font-semibold">Tim Beiko</div>
          <div className="italic">Ethereum</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Anthony Sassano</div>
          <div className="italic">The Daily Gwei</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Alex Svanevik</div>
          <div className="italic">Nansen</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">James Prestwich</div>
          <div className="italic">Ethereum</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Marc Weinstein</div>
          <div className="italic">Mechanism Capital</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Meltem Demoirs</div>
          <div className="italic">Coinshares</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Nathan Alman</div>
          <div className="italic">Ondo</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Size Chad</div>
          <div className="italic">Arbitrum</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Sam Kazemian</div>
          <div className="italic">Frax</div>
        </CardSection>
        <CardSection>
          <div className="text-xl font-semibold">Zak Cole</div>
          <div className="italic">Number Group</div>
        </CardSection>
      </CardsContainer>
    </Card>
  </PageSection>
)
