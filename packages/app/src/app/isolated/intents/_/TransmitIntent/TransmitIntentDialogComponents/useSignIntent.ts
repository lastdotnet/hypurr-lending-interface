import { useSignTypedData } from 'wagmi'

import { type TypedData } from 'sdk'

export const useSignIntent = ({
  typedData,
}: {
  typedData: TypedData<'Origination'> | undefined
}) => {
  const { data: signature, signTypedData: wagmiSignTypedData, ...rest } = useSignTypedData()

  const message = typedData?.message
  const primaryType = typedData?.primaryType
  const types = typedData?.types

  const signTypedData = () =>
    wagmiSignTypedData({
      domain: typedData?.domain,
      message: typedData?.message as NonNullable<typeof message>,
      primaryType: typedData?.primaryType as NonNullable<typeof primaryType>,
      types: typedData?.types as NonNullable<typeof types>,
    })

  return { isFinished: !!signature, signature, signTypedData, ...rest }
}
