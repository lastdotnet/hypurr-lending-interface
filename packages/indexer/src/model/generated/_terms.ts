// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import assert from 'node:assert'

import * as marshal from './marshal'

export class Terms {
  private _status!: string
  private _statusData!: string
  private _pricing!: string
  private _pricingData!: string
  private _settlement!: string
  private _settlementData!: string

  constructor(props?: Partial<Omit<Terms, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._status = marshal.string.fromJSON(json.status)
      this._statusData = marshal.string.fromJSON(json.statusData)
      this._pricing = marshal.string.fromJSON(json.pricing)
      this._pricingData = marshal.string.fromJSON(json.pricingData)
      this._settlement = marshal.string.fromJSON(json.settlement)
      this._settlementData = marshal.string.fromJSON(json.settlementData)
    }
  }

  get status(): string {
    assert(this._status != null, 'uninitialized access')
    return this._status
  }

  set status(value: string) {
    this._status = value
  }

  get statusData(): string {
    assert(this._statusData != null, 'uninitialized access')
    return this._statusData
  }

  set statusData(value: string) {
    this._statusData = value
  }

  get pricing(): string {
    assert(this._pricing != null, 'uninitialized access')
    return this._pricing
  }

  set pricing(value: string) {
    this._pricing = value
  }

  get pricingData(): string {
    assert(this._pricingData != null, 'uninitialized access')
    return this._pricingData
  }

  set pricingData(value: string) {
    this._pricingData = value
  }

  get settlement(): string {
    assert(this._settlement != null, 'uninitialized access')
    return this._settlement
  }

  set settlement(value: string) {
    this._settlement = value
  }

  get settlementData(): string {
    assert(this._settlementData != null, 'uninitialized access')
    return this._settlementData
  }

  set settlementData(value: string) {
    this._settlementData = value
  }

  toJSON(): object {
    return {
      pricing: this.pricing,
      pricingData: this.pricingData,
      settlement: this.settlement,
      settlementData: this.settlementData,
      status: this.status,
      statusData: this.statusData,
    }
  }
}
