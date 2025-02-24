// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import assert from 'node:assert'

import * as marshal from './marshal'

export class IntentSubmissionData {
  public readonly isTypeOf = 'IntentSubmissionData'
  private _intentId!: string
  private _createdAt!: Date

  constructor(props?: Partial<Omit<IntentSubmissionData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._intentId = marshal.string.fromJSON(json.intentId)
      this._createdAt = marshal.datetime.fromJSON(json.createdAt)
    }
  }

  get intentId(): string {
    assert(this._intentId != null, 'uninitialized access')
    return this._intentId
  }

  set intentId(value: string) {
    this._intentId = value
  }

  get createdAt(): Date {
    assert(this._createdAt != null, 'uninitialized access')
    return this._createdAt
  }

  set createdAt(value: Date) {
    this._createdAt = value
  }

  toJSON(): object {
    return {
      createdAt: marshal.datetime.toJSON(this.createdAt),
      intentId: this.intentId,
      isTypeOf: this.isTypeOf,
    }
  }
}
