import { IconAlertTriangleFilled, IconExclamationCircle } from '@tabler/icons-react'

export const ExpertModeWarning = () => (
  <div className="flex items-center justify-center gap-1 border p-1 text-sm">
    <IconExclamationCircle />
    <span>
      <strong>Expert mode.</strong> You may see intents with unverified tokens or collections marked with{' '}
      <IconAlertTriangleFilled className="inline h-5 w-5" />. Proceed at your own risk.
    </span>
  </div>
)
