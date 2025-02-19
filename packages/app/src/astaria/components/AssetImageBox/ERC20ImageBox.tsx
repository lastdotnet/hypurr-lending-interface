import { IconWallet } from '@tabler/icons-react'
import Image from 'next/image'

import { clsx } from 'clsx'

import LogoBlack from '@/astaria/assets/logo/logo-black.svg?url'
import { IndicatorBox } from '@/astaria/components/AssetImageBox/components/IndicatorBox'
import { InfoBox } from '@/astaria/components/AssetImageBox/components/InfoBox'
import { InfoTokenBox } from '@/astaria/components/AssetImageBox/components/InfoTokenBox'
import { CurrencyAmount } from '@/astaria/components/CurrencyAmount'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { SkeletonText } from '@/astaria/components/SkeletonText'

import { type ERC20 } from 'assets'

const ERC20InfoBox = ({
  erc20: { decimals, symbol, ...asset },
  skeleton,
}: {
  erc20: ERC20
  skeleton?: boolean
}) => (
  <>
    <div className="dark flex h-full w-8 items-center justify-center bg-background text-primary">
      <IconWallet className="h-6 w-6" />
    </div>
    <InfoTokenBox>
      {skeleton ? (
        <SkeletonText />
      ) : (
        <>
          <CurrencyAmount amount={asset.amount} decimals={Number(decimals)} usdValue={asset.usdValue} /> {symbol}
        </>
      )}
    </InfoTokenBox>
  </>
)

export const ERC20ImageBox = ({
  className,
  erc20,
  inCard,
  indicator = true,
  isClaimable,
  isLiveAuction,
  isRepaying,
  priority,
  skeleton,
  ...rest
}: {
  className?: string
  erc20: ERC20
  inCard?: boolean
  indicator?: boolean
  isClaimable?: boolean
  isLiveAuction?: boolean
  isRepaying?: boolean
  priority?: boolean
  skeleton?: boolean
}) => (
  <div className={clsx('relative overflow-hidden', className)} {...rest}>
    <InfoBox>
      <ERC20InfoBox erc20={erc20} skeleton={skeleton} />
    </InfoBox>
    {indicator ? (
      <IndicatorBox>
        <Image alt="Astaria" className="w-full" src={LogoBlack} />
      </IndicatorBox>
    ) : null}
    <div
      className={clsx('flex aspect-square h-auto w-full items-center justify-center overflow-hidden', {
        border: inCard,
      })}
    >
      <ERC20Image erc20={erc20} priority={priority} size="xl" skeleton={skeleton} />
    </div>
  </div>
)
