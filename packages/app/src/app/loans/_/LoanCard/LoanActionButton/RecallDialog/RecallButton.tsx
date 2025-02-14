import { Button } from '@/astaria/components/Button'

export const RecallButton = ({
  isConfirmingRecall,
  isLoadingRecall,
  recall,
}: {
  isConfirmingRecall: boolean
  isLoadingRecall: boolean
  recall: () => void
}) => {
  const handleRecall = async () => {
    recall()
  }

  const buttonLabel = () => {
    if (isConfirmingRecall) {
      return 'Confirming recalling your loan'
    }
    if (isLoadingRecall) {
      return 'Recalling your loan'
    }
    return 'Recall your loan'
  }

  return (
    <Button
      className="border-b-0 border-l-0 border-r-0"
      fullWidth
      loading={isLoadingRecall || isConfirmingRecall}
      onClick={handleRecall}
      rounded="dialog"
    >
      {buttonLabel()}
    </Button>
  )
}
