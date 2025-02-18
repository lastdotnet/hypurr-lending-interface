import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { useState } from 'react'
import { TabSelector } from './forms/TabSelector'
import { SettingsPopOver } from './SettingsPopOver'
import { SendForm } from './forms/send-form/SendForm'
import { SwapForm } from './forms/swap-form/SwapForm'
import { UseFormReturn } from 'react-hook-form'
import { SwapFormSchema } from '@/features/swap/logic/useSwap'

interface SwapPanelProps {
  form: UseFormReturn<SwapFormSchema>
}

export enum Tab {
  Swap = 'Swap',
  Send = 'Send',
}

export function SwapPanel(props: SwapPanelProps) {
  const { form } = props
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Swap)

  return (
    <div className="w-full max-w-xl">
      <Typography variant="h1" className="mb-7 pb-4 text-4xl xl:text-4xl" gradient>
        Swap
      </Typography>
      <Panel.Wrapper className="flex flex-col gap-4 bg-black p-4 md:p-6">
        <div className="flex flex-row items-center justify-between">
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          <SettingsPopOver />
        </div>

        {(() => {
          switch (activeTab) {
            case Tab.Swap:
              return <SwapForm form={form} />
            case Tab.Send:
              return <SendForm />
          }
        })()}
      </Panel.Wrapper>
    </div>
  )
}
