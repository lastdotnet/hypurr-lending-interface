import { Alert, AlertDescription, AlertTitle } from '@/astaria/components/Alert'
import { getAssetName } from '@/astaria/components/AssetName'

import type { IntentAsset } from 'assets'

export const NeedsAllowanceResetWarning = ({
  asset,
}: {
  asset: IntentAsset
}) => (
  <Alert tone="warning">
    <AlertTitle>Extra transaction</AlertTitle>
    <AlertDescription>{getAssetName({ asset })} requires an extra transaction to reset the approval.</AlertDescription>
  </Alert>
)
