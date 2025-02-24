import { CheckedIntentFeedData } from './_checkedIntentFeedData'
import { IntentFillData } from './_intentFillData'
import { IntentSubmissionData } from './_intentSubmissionData'
import { LoanEventData } from './_loanEventData'
import { SpecialData } from './_specialData'

export type PointEventsData =
  | LoanEventData
  | CheckedIntentFeedData
  | IntentSubmissionData
  | IntentFillData
  | SpecialData

export function fromJsonPointEventsData(json: any): PointEventsData {
  switch (json?.isTypeOf) {
    case 'LoanEventData':
      return new LoanEventData(undefined, json)
    case 'CheckedIntentFeedData':
      return new CheckedIntentFeedData(undefined, json)
    case 'IntentSubmissionData':
      return new IntentSubmissionData(undefined, json)
    case 'IntentFillData':
      return new IntentFillData(undefined, json)
    case 'SpecialData':
      return new SpecialData(undefined, json)
    default:
      throw new TypeError('Unknown json object passed as PointEventsData')
  }
}
