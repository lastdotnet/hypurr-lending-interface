import { Button } from '@/astaria/components/Button'

export const ClaimButton = ({
  claim,
  isConfirmingClaim,
  isLoadingClaim,
}: {
  claim: () => void
  isConfirmingClaim: boolean
  isLoadingClaim: boolean
}) => {
  const handleClaim = async () => {
    claim()
  }

  const buttonLabel = () => {
    if (isConfirmingClaim) {
      return 'Confirming claiming your collateral'
    }
    if (isLoadingClaim) {
      return 'Claiming your collateral'
    }
    return 'Claim your collateral'
  }

  return (
    <Button
      className="border-b-0 border-l-0 border-r-0"
      fullWidth
      loading={isLoadingClaim || isConfirmingClaim}
      onClick={handleClaim}
      rounded="dialog"
    >
      {buttonLabel()}
    </Button>
  )
}
