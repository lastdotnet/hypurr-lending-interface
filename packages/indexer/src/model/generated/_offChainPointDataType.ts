import { CheckedIntentFeedData } from './_checkedIntentFeedData'
import { IntentFillData } from './_intentFillData'
import { IntentSubmissionData } from './_intentSubmissionData'

export type OffChainPointDataType = CheckedIntentFeedData | IntentSubmissionData | IntentFillData

export function fromJsonOffChainPointDataType(json: any): OffChainPointDataType {
  switch (json?.isTypeOf) {
    case 'CheckedIntentFeedData':
      return new CheckedIntentFeedData(undefined, json)
    case 'IntentSubmissionData':
      return new IntentSubmissionData(undefined, json)
    case 'IntentFillData':
      return new IntentFillData(undefined, json)
    default:
      throw new TypeError('Unknown json object passed as OffChainPointDataType')
  }
}
