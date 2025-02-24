// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import assert from 'node:assert'

import * as marshal from './marshal'

export class LoanEventData {
  public readonly isTypeOf = 'LoanEventData'
  private _borrower!: string
  private _lender!: string
  private _start!: bigint
  private _amount!: bigint
  private _decimals!: number
  private _isClosed!: boolean
  private _baseDenominator!: number
  private _points!: bigint | undefined | null

  constructor(props?: Partial<Omit<LoanEventData, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._borrower = marshal.string.fromJSON(json.borrower)
      this._lender = marshal.string.fromJSON(json.lender)
      this._start = marshal.bigint.fromJSON(json.start)
      this._amount = marshal.bigint.fromJSON(json.amount)
      this._decimals = marshal.int.fromJSON(json.decimals)
      this._isClosed = marshal.boolean.fromJSON(json.isClosed)
      this._baseDenominator = marshal.float.fromJSON(json.baseDenominator)
      this._points = json.points == null ? undefined : marshal.bigint.fromJSON(json.points)
    }
  }

  get borrower(): string {
    assert(this._borrower != null, 'uninitialized access')
    return this._borrower
  }

  set borrower(value: string) {
    this._borrower = value
  }

  get lender(): string {
    assert(this._lender != null, 'uninitialized access')
    return this._lender
  }

  set lender(value: string) {
    this._lender = value
  }

  get start(): bigint {
    assert(this._start != null, 'uninitialized access')
    return this._start
  }

  set start(value: bigint) {
    this._start = value
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access')
    return this._amount
  }

  set amount(value: bigint) {
    this._amount = value
  }

  get decimals(): number {
    assert(this._decimals != null, 'uninitialized access')
    return this._decimals
  }

  set decimals(value: number) {
    this._decimals = value
  }

  get isClosed(): boolean {
    assert(this._isClosed != null, 'uninitialized access')
    return this._isClosed
  }

  set isClosed(value: boolean) {
    this._isClosed = value
  }

  get baseDenominator(): number {
    assert(this._baseDenominator != null, 'uninitialized access')
    return this._baseDenominator
  }

  set baseDenominator(value: number) {
    this._baseDenominator = value
  }

  get points(): bigint | undefined | null {
    return this._points
  }

  set points(value: bigint | undefined | null) {
    this._points = value
  }

  toJSON(): object {
    return {
      amount: marshal.bigint.toJSON(this.amount),
      baseDenominator: this.baseDenominator,
      borrower: this.borrower,
      decimals: this.decimals,
      isClosed: this.isClosed,
      isTypeOf: this.isTypeOf,
      lender: this.lender,
      points: this.points == null ? undefined : marshal.bigint.toJSON(this.points),
      start: marshal.bigint.toJSON(this.start),
    }
  }
}
