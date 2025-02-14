'use client'

import { IconBrandDiscord, IconBrandGithub, IconBrandMedium, IconBrandX } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import DuneLogo from '@assets/images/dune.svg?url'
import WarpcastLogo from '@assets/images/warpcast-white.svg?url'
import AstariaLogo from '@assets/logo/wordmark-white.svg?url'
import { Button } from '@/astaria/components/Button'
import { NewsletterSubscribeForm } from '@/astaria/components/Shell/Newsletter/NewsletterSubscribeForm'
import { TextLink } from '@/astaria/components/TextLink'
import { ROUTES } from '@/astaria/constants/routes'
import {
  ASTARIA_STATUS,
  DISCORD_URL,
  DOCS_URL,
  DUNE_URL,
  GITHUB_URL,
  MEDIUM_URL,
  WARPCAST_URL,
  X_URL,
} from '@/astaria/constants/urls'
import { sendSafaryClubEvent } from '@/astaria/utils/sendSafaryClubEvent'

export const SiteFooter = () => (
  <footer className="dark bg-background p-5 text-foreground md:py-10">
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 lg:flex-row lg:gap-7">
      <Button asChild className="shrink-0" emphasis="low" size="md-narrow">
        <Link href={ROUTES.HOME}>
          <Image alt="Astaria logo" className="w-32" src={AstariaLogo} />
        </Link>
      </Button>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <TextLink
          href={DOCS_URL}
          onClick={() =>
            sendSafaryClubEvent({
              eventName: 'Docs Button',
              eventType: 'offchain',
            })
          }
          showIcon={false}
        >
          Docs
        </TextLink>
        <TextLink href={ROUTES.PRIVACY}>Privacy policy</TextLink>
        <TextLink href="/security.txt" showIcon={false}>
          Security &amp; responsible disclosure
        </TextLink>
        <TextLink href={ASTARIA_STATUS}>Status</TextLink>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        <TextLink
          href={DISCORD_URL}
          onClick={() =>
            sendSafaryClubEvent({
              eventName: 'Discord Button',
              eventType: 'offchain',
            })
          }
          showIcon={false}
        >
          <IconBrandDiscord aria-label="Discord" display="block" />
        </TextLink>
        <TextLink
          href={GITHUB_URL}
          onClick={() =>
            sendSafaryClubEvent({
              eventName: 'Github Button',
              eventType: 'offchain',
            })
          }
          showIcon={false}
        >
          <IconBrandGithub aria-label="GitHub" display="block" />
        </TextLink>
        <TextLink
          href={MEDIUM_URL}
          onClick={() =>
            sendSafaryClubEvent({
              eventName: 'Medium Button',
              eventType: 'offchain',
            })
          }
          showIcon={false}
        >
          <IconBrandMedium aria-label="Medium" display="block" />
        </TextLink>
        <TextLink
          href={X_URL}
          onClick={() =>
            sendSafaryClubEvent({
              eventName: 'Twitter Button',
              eventType: 'offchain',
            })
          }
          showIcon={false}
        >
          <IconBrandX aria-label="X" display="block" />
        </TextLink>
        <TextLink
          href={WARPCAST_URL}
          onClick={() =>
            sendSafaryClubEvent({
              eventName: 'Warpcast Button',
              eventType: 'offchain',
            })
          }
          showIcon={false}
        >
          <Image alt="Warpcast logo" className="w-8" src={WarpcastLogo} />
        </TextLink>
        <TextLink href={DUNE_URL} showIcon={false}>
          <Image alt="Dune logo" className="w-6" src={DuneLogo} />
        </TextLink>
      </div>

      <NewsletterSubscribeForm />
    </div>
  </footer>
)
