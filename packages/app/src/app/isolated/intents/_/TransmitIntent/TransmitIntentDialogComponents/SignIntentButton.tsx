import { Button } from '@/astaria/components/Button'

export const SignIntentButton = ({
  isLoadingPayload,
  isLoadingSign,
  signTypedData,
}: {
  isLoadingPayload?: boolean
  isLoadingSign: boolean
  signTypedData: () => void
}) => {
  const buttonLabel = () => {
    if (isLoadingSign) {
      return 'Signing intent'
    }
    if (isLoadingPayload) {
      return 'Preparing intent'
    }

    return 'Sign intent'
  }

  return (
    <Button
      className="border-r-0 border-b-0 border-l-0"
      fullWidth
      loading={isLoadingSign || isLoadingPayload}
      onClick={() => signTypedData()}
      rounded="dialog"
    >
      {buttonLabel()}
    </Button>
  )
}
