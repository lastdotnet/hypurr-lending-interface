import { forwardRef, useState } from 'react'

import { ONE_SECOND, formatDate } from 'common'
import { secondsToMilliseconds } from 'date-fns'
import { useInterval } from 'usehooks-ts'

import { calculateCurrentCompoundInterestForLoan } from '@/app/isolated/loans/_/LoanCard/CurrentDebt'
import { LoanActions } from '@/app/isolated/loans/_/LoanCard/LoanActionButton'
import { LoanStatus } from '@/app/isolated/loans/_/LoanCard/LoanActionButton/LoanStatus'
import { AssetCard } from '@/astaria/components/AssetCard'
import { AssetDisplay } from '@/astaria/components/AssetDisplay'
import { ERC20AmountDisplay } from '@/astaria/components/AssetDisplay/ERC20AmountDisplay'
import { CardLabelValue, CardSection } from '@/astaria/components/Card'
import { ChainLogo } from '@/astaria/components/ChainLogo'
import { CurrencyAmountWrapper } from '@/astaria/components/CurrencyAmountWrapper'
import { ERC20Image } from '@/astaria/components/ERC20Image'
import { LTV } from '@/astaria/components/LTV'
import { Percent } from '@/astaria/components/Percent'
import { SkeletonIcon } from '@/astaria/components/SkeletonIcon'
import { SkeletonText } from '@/astaria/components/SkeletonText'
import { Tooltip } from '@/astaria/components/Tooltip'
import { type Loan, SourceType } from '@/astaria/types-internal/loan-schemas'
import { getDailyRate } from '@/astaria/utils/loans/rates'

import { isERC20Asset } from 'assets'

export const LoanCard = forwardRef<
  HTMLDivElement,
  {
    loan?: Loan
    mock?: boolean
    refetchLoans?: () => void
    skeleton?: boolean
  }
>(({ loan, mock, refetchLoans, skeleton, ...rest }, ref) => {
  const [currentInterest, setCurrentInterest] = useState(
    calculateCurrentCompoundInterestForLoan({
      apy: loan?.apy,
      erc20: loan?.debt,
      startTime: loan?.startTime,
    }),
  )

  useInterval(() => {
    setCurrentInterest(
      calculateCurrentCompoundInterestForLoan({
        apy: loan?.apy,
        erc20: loan?.debt,
        startTime: loan?.startTime,
      }),
    )
  }, ONE_SECOND)

  const currentDebt = loan?.debt ? loan.debt.amount + currentInterest : 0n

  return (
    <AssetCard ref={ref} data-id={loan?.id} higherEmphasis={loan?.isClaimable || loan?.isRecall} {...rest}>
      <LoanStatus loan={loan} skeleton={skeleton} />
      <CardSection>
        <div className="relative">
          <ChainLogo chainId={loan?.chainId} className="absolute top-0 right-0 h-8 w-8" height="32" width="32" />
        </div>
        <CardLabelValue
          label={loan?.source === SourceType.LENDER ? 'Borrower balance' : 'Balance'}
          value={
            <CurrencyAmountWrapper>
              <ERC20Image erc20={loan?.debt} skeleton={skeleton} />
              <ERC20AmountDisplay
                className="font-medium text-2xl"
                erc20={
                  loan?.debt
                    ? {
                        ...loan.debt,
                        amount: currentDebt,
                      }
                    : undefined
                }
                linkAssetToBlockExplorer
                skeleton={skeleton}
                suppressHydrationWarning
              />
            </CurrencyAmountWrapper>
          }
        />
        <div className="flex items-center justify-between gap-3">
          <CardLabelValue
            label="Daily rate"
            orientation="horizontal"
            value={
              <Percent
                className="font-semibold"
                decimals={loan?.debt.decimals}
                percent={getDailyRate(loan?.apy)}
                skeleton={skeleton}
              />
            }
          />
          <CardLabelValue
            label="APY"
            orientation="horizontal"
            value={
              <Percent
                className="font-semibold"
                decimals={loan?.debt.decimals}
                percent={loan?.apy ?? 0n}
                skeleton={skeleton}
              />
            }
          />
        </div>
      </CardSection>
      <CardSection>
        <div className="flex items-center justify-between gap-3">
          {skeleton ? (
            <div className="flex items-center gap-2">
              <SkeletonIcon />
              <SkeletonText />
            </div>
          ) : null}
          {loan ? (
            <AssetDisplay
              asset={loan.asset}
              className="font-medium"
              skeleton={skeleton}
              triggerExtraWording="collateral"
            />
          ) : null}
        </div>
      </CardSection>
      {loan && isERC20Asset(loan.asset) ? (
        <CardSection>
          <CardLabelValue
            label={<Tooltip content="Loan To Value" trigger="LTV" underline />}
            orientation="horizontal"
            value={
              <LTV
                borrowAmount={currentDebt}
                borrowAsset={loan.debt}
                className="font-semibold"
                collateralAmount={loan.asset.amount}
                collateralAsset={loan.asset}
                showHighLTVWarning
              />
            }
          />
        </CardSection>
      ) : null}
      <CardSection>
        {loan ? (
          formatDate({
            date: secondsToMilliseconds(Number(loan.startTime)),
          })
        ) : (
          <SkeletonText />
        )}
      </CardSection>
      <LoanActions loan={loan} mock={mock} refetchLoans={refetchLoans} skeleton={skeleton} />
    </AssetCard>
  )
})

LoanCard.displayName = 'LoanCard'
