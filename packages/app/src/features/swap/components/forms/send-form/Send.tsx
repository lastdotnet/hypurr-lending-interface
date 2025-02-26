import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { AssetSelector } from '@/ui/molecules/asset-selector/AssetSelector'
import { ControlledMultiSelectorAssetInput } from '@/ui/organisms/multi-selector/ControlledMultiSelectorAssetInput'
import { Control } from 'react-hook-form'
import { SendFormSchema } from '../../../logic/useSend'
import { raise } from '@/utils/assert'
import { TokenWithBalance } from '@/domain/common/types'

interface SendProps {
  control: Control<SendFormSchema>
  assets: TokenWithBalance[]
  selectedAssets: TokenWithBalance[]
}

export function Send(props: SendProps) {
  const { control, assets, selectedAssets } = props
  const { token } = selectedAssets[0] ?? raise('No borrow token selected')

  return (
    <Panel.Wrapper className="mt-2 p-4 pb-5">
      <Typography variant="h4" className="py-3 font-semibold">
        Send
      </Typography>

      <div>
        <div className="mt-2 flex flex-row items-start gap-2">
          <ControlledMultiSelectorAssetInput
            fieldName="amount"
            control={control}
            disabled={false}
            token={token}
            resetBorrowStatus={() => {}}
          />

          <AssetSelector
            assets={assets}
            selectedAsset={token}
            setSelectedAsset={() => {}}
            disabled={false}
            resetBorrowStatus={() => {}}
          />
        </div>
      </div>
    </Panel.Wrapper>
  )
}
