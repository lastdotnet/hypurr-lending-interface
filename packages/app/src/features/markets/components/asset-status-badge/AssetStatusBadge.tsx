import { DownloadIcon, LayersIcon, UploadIcon } from 'lucide-react'

import {
  BorrowEligibilityStatus,
  CollateralEligibilityStatus,
  SupplyAvailabilityStatus,
} from '@/domain/market-info/reserve-status'
import { IndicatorIcon } from '@/ui/atoms/indicator-icon/IndicatorIcon'
import { Tooltip, TooltipContentLong, TooltipTrigger } from '@/ui/atoms/tooltip/Tooltip'
import { AssetStatusDescription } from './components/AssetStatusDescription'
import { getVariantFromStatus } from './getVariantFromStatus'
import { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react'

export interface AssetStatusBadgeProps {
  supplyStatus: SupplyAvailabilityStatus
  collateralStatus: CollateralEligibilityStatus
  borrowStatus: BorrowEligibilityStatus
  'data-testid'?: string
}

export function AssetStatusBadge({
  supplyStatus,
  collateralStatus,
  borrowStatus,
  'data-testid': dataTestId,
}: AssetStatusBadgeProps) {
  const { _ } = useLingui()

  const supplyIcon = (
    <IndicatorIcon
      icon={<DownloadIcon className="w-5 md:w-4" />}
      variant={getVariantFromStatus(supplyStatus, { yesWhite: true })}
    />
  )
  const collateralIcon = (
    <IndicatorIcon
      icon={<LayersIcon className="w-5 md:w-4" />}
      variant={getVariantFromStatus(collateralStatus, { yesWhite: true })}
    />
  )
  const borrowIcon = (
    <IndicatorIcon
      icon={<UploadIcon className="w-5 md:w-4" />}
      variant={getVariantFromStatus(borrowStatus, { yesWhite: true })}
    />
  )

  return (
    <Tooltip disableHoverableContent>
      <TooltipTrigger className="py-2 md:py-0">
        <div className="inline-flex gap-3 px-3 py-2 md:gap-2 md:px-2.5 md:py-0.5" data-testid={dataTestId}>
          {supplyIcon}
          {collateralIcon}
          {borrowIcon}
        </div>
      </TooltipTrigger>
      <TooltipContentLong>
        <div className="flex flex-col gap-3">
          <AssetStatusDescription>
            {supplyIcon}
            {_(supplyStatusDescription[supplyStatus])}
          </AssetStatusDescription>
          <AssetStatusDescription>
            {collateralIcon}
            {_(collateralStatusDescription[collateralStatus])}
          </AssetStatusDescription>
          <AssetStatusDescription>
            {borrowIcon}
            {_(borrowStatusDescription[borrowStatus])}
          </AssetStatusDescription>
        </div>
      </TooltipContentLong>
    </Tooltip>
  )
}

const supplyStatusDescription: Record<SupplyAvailabilityStatus, MessageDescriptor> = {
  yes: msg`Can be supplied`,
  no: msg`Cannot be supplied`,
  'supply-cap-reached': msg`Supply limit reached`,
}

const collateralStatusDescription: Record<CollateralEligibilityStatus, MessageDescriptor> = {
  yes: msg`Can be used as collateral`,
  no: msg`Cannot be used as collateral`,
  'only-in-isolation-mode': msg`Can be used as collateral only in isolation mode`,
}

const borrowStatusDescription: Record<BorrowEligibilityStatus, MessageDescriptor> = {
  yes: msg`Can be borrowed`,
  no: msg`Cannot be borrowed`,
  'borrow-cap-reached': msg`Borrow limit reached`,
  'only-in-siloed-mode': msg`Can be borrowed only in siloed mode`,
}
