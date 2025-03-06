import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ReactNode, useState } from 'react'

import { TableCell } from '@/ui/atoms/table/Table'
import { Typography } from '@/ui/atoms/typography/Typography'

interface CollapsibleCellProps {
  children: [ReactNode, ReactNode]
  noHiddenColumns?: boolean
}

export function CollapsibleCell({ children, noHiddenColumns }: CollapsibleCellProps) {
  const [TriggerContent, Content] = children
  const [open, setOpen] = useState(false)

  return (
    <CollapsiblePrimitive.Root
      open={open}
      onOpenChange={(open) => {
        if (!noHiddenColumns) setOpen(open)
      }}
      asChild
    >
      <TableCell>
        <CollapsiblePrimitive.CollapsibleTrigger asChild className="cursor-auto">
          <div className="flex flex-row justify-between">
            {TriggerContent}
            {!noHiddenColumns && (
              <div className="flex min-w-[30px] cursor-pointer flex-col justify-center">
                <button role="switch">
                  <Typography variant="prompt">
                    {open ? (
                      <ChevronUp className="-translate-y-[1px] ml-1 inline-block" size={16} />
                    ) : (
                      <ChevronDown className="-translate-y-[1px] ml-1 inline-block" size={16} />
                    )}
                  </Typography>
                </button>
              </div>
            )}
          </div>
        </CollapsiblePrimitive.CollapsibleTrigger>
        <CollapsiblePrimitive.CollapsibleContent>
          <div className="mt-4 flex flex-col gap-3.5">{Content}</div>
        </CollapsiblePrimitive.CollapsibleContent>
      </TableCell>
    </CollapsiblePrimitive.Root>
  )
}
