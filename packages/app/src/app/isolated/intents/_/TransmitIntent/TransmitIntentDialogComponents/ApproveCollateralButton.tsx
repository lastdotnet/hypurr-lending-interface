import { Button } from '@/astaria/components/Button'

export const ApproveCollateralButton = ({
  approve,
  isConfirmingApprove,
  isLoadingApprove,
}: {
  approve: () => void
  isConfirmingApprove: boolean
  isLoadingApprove: boolean
}) => {
  const handleApprove = async () => {
    approve()
  }

  const buttonLabel = () => {
    if (isConfirmingApprove) {
      return 'Confirming access'
    }
    if (isLoadingApprove) {
      return 'Allowing access'
    }
    return 'Allow access'
  }

  return (
    <Button
      className="border-b-0 border-l-0 border-r-0"
      fullWidth
      loading={isLoadingApprove || isConfirmingApprove}
      onClick={handleApprove}
      rounded="dialog"
    >
      {buttonLabel()}
    </Button>
  )
}
