import { type Dispatch, type SetStateAction } from 'react'

import { clsx } from 'clsx'

import { TransmitBorrowIntentForm } from '@/app/intents/_/TransmitIntent/TransmitBorrowIntent/TransmitBorrowIntentForm'
import { TransmitLendIntentForm } from '@/app/intents/_/TransmitIntent/TransmitLendIntent/TransmitLendIntentForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/astaria/components/Tabs'

export const TransmitIntent = ({
  isOnConfirmSteps,
  setDialogOpen,
  setIsOnConfirmSteps,
}: {
  isOnConfirmSteps: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsOnConfirmSteps: Dispatch<SetStateAction<boolean>>
}) => (
  <Tabs className="overflow-y-auto" defaultValue="borrow">
    <div className={clsx('px-5 pt-5', { hidden: isOnConfirmSteps })}>
      <TabsList>
        <TabsTrigger value="borrow">Borrow</TabsTrigger>
        <TabsTrigger value="lend">Lend</TabsTrigger>
      </TabsList>
    </div>
    <TabsContent value="borrow">
      <TransmitBorrowIntentForm
        isOnConfirmSteps={isOnConfirmSteps}
        setDialogOpen={setDialogOpen}
        setIsOnConfirmSteps={setIsOnConfirmSteps}
      />
    </TabsContent>
    <TabsContent value="lend">
      <TransmitLendIntentForm
        isOnConfirmSteps={isOnConfirmSteps}
        setDialogOpen={setDialogOpen}
        setIsOnConfirmSteps={setIsOnConfirmSteps}
      />
    </TabsContent>
  </Tabs>
)
