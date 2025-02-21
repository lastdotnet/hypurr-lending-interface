import { CardSection } from '@/astaria/components/Card'
import { Popover, PopoverContent } from '@/astaria/components/Popover'
import { PopoverInfoTrigger } from '@/astaria/components/PopoverInfoTrigger'
import { TextLink } from '@/astaria/components/TextLink'
import { TimeLeft } from '@/astaria/components/TimeLeft'
import { ROUTES } from '@/astaria/constants/routes'
import { type Loan } from '@/astaria/types-internal/loan-schemas'

const RecallTimeLeftSection = ({
  className,
  loan,
  skeleton,
}: {
  className?: string
  loan: Loan | undefined
  skeleton?: boolean
}) => {
  if (!loan?.recall) {
    return null
  }
  return (
    <TimeLeft className={className} endSeconds={loan.recall.end} skeleton={skeleton}>
      remaining
    </TimeLeft>
  )
}

const LoanStatusWrapper = ({ ...rest }) => (
  <CardSection className="flex items-center justify-between gap-4 rounded-sm border-2 border-black" {...rest} />
)

export const LoanStatus = ({
  loan,
  skeleton,
}: {
  loan: Loan | undefined
  skeleton?: boolean
}) => {
  if (!loan) {
    return null
  }

  if (loan.isClaimable) {
    return (
      <LoanStatusWrapper>
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 shrink-0 rounded-full bg-red-600" />
          <span className="text-nowrap font-bold uppercase">Recall failed</span>
        </div>
        <span className="text-right font-medium">Borrower liquidated</span>
      </LoanStatusWrapper>
    )
  }
  if (loan.isRecall) {
    return (
      <LoanStatusWrapper>
        <div className="flex shrink-0 items-center gap-1">
          <span className="font-bold uppercase">In recall</span>
          <Popover>
            <PopoverInfoTrigger />
            <PopoverContent>
              <p>
                This loan is currently being recalled. You can see it on the{' '}
                <TextLink href={ROUTES.INTENTS}>intent feed</TextLink>.
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <RecallTimeLeftSection className="text-right font-medium" loan={loan} skeleton={skeleton} />
      </LoanStatusWrapper>
    )
  }
  return null
}
