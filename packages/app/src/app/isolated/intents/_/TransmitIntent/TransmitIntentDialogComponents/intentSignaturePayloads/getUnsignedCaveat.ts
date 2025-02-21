import { type getTypedData } from '@/app/api/_/getTypedData'

export const getUnsignedCaveat = ({
  singleUse,
  typedData,
}: {
  singleUse: boolean
  typedData: ReturnType<typeof getTypedData>
}) => ({
  caveats: typedData.message.caveats,
  deadline: typedData.message.deadline,
  nonce: typedData.message.accountNonce,
  salt: typedData.message.salt,
  singleUse,
})
