import { Percent } from '@/astaria/components/Percent'

import type { ERC20Asset } from 'assets'

export const AverageAPY = ({
  avgApy,
  erc20,
  skeleton,
}: {
  avgApy: bigint | undefined
  erc20: ERC20Asset | undefined
  skeleton?: boolean
}) => <Percent className="font-medium" decimals={erc20?.decimals} percent={avgApy} skeleton={skeleton} useDashForZero />
