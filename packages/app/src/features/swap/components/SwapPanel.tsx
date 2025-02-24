import { Panel } from '@/ui/atoms/panel/Panel'
import { Typography } from '@/ui/atoms/typography/Typography'
import { useState } from 'react'
import { TabSelector } from './forms/TabSelector'
import { SettingsPopOver } from './SettingsPopOver'
import { SendForm } from './forms/send-form/SendForm'
import { SwapForm } from './forms/swap-form/SwapForm'
import { UseSwapResults } from '@/features/swap/logic/useSwap'
import { UseSendResults } from '@/features/swap/logic/useSend'

interface SwapPanelProps {
  swap: UseSwapResults
  send: UseSendResults
}

export enum Tab {
  Swap = 'Swap',
  Send = 'Send',
}

export function SwapPanel(props: SwapPanelProps) {
  const { swap, send } = props
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Swap)

  return (
    <div className="w-full max-w-xl">
      <Typography variant="h1" className="mb-7 pb-4 lg:text-4xl" gradient>
        Swap
      </Typography>
      <Panel.Wrapper className="flex flex-col gap-4 bg-black p-4 md:p-6">
        <div className="flex flex-row items-center justify-between">
          <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === Tab.Swap && <SettingsPopOver />}
        </div>

        {(() => {
          switch (activeTab) {
            case Tab.Swap:
              return (
                <SwapForm
                  form={swap.form}
                  guestMode={swap.guestMode}
                  openConnectModal={swap.openConnectModal}
                  assets={swap.mockAssetsWithBalance}
                />
              )
            case Tab.Send:
              return (
                <SendForm
                  form={send.form}
                  guestMode={send.guestMode}
                  openConnectModal={send.openConnectModal}
                  assets={send.mockAssetsWithBalance}
                />
              )
          }
        })()}
      </Panel.Wrapper>
    </div>
  )
}
