import assert from 'assert';

import * as marshal from './marshal';

export class IntentFillData {
  public readonly isTypeOf = 'IntentFillData';
  private _points!: bigint;
  private _hash!: string;
  private _createdAt!: Date;

  constructor(props?: Partial<Omit<IntentFillData, 'toJSON'>>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._points = marshal.bigint.fromJSON(json.points);
      this._hash = marshal.string.fromJSON(json.hash);
      this._createdAt = marshal.datetime.fromJSON(json.createdAt);
    }
  }

  get points(): bigint {
    assert(this._points != null, 'uninitialized access');
    return this._points;
  }

  set points(value: bigint) {
    this._points = value;
  }

  get hash(): string {
    assert(this._hash != null, 'uninitialized access');
    return this._hash;
  }

  set hash(value: string) {
    this._hash = value;
  }

  get createdAt(): Date {
    assert(this._createdAt != null, 'uninitialized access');
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  toJSON(): object {
    return {
      createdAt: marshal.datetime.toJSON(this.createdAt),
      hash: this.hash,
      isTypeOf: this.isTypeOf,
      points: marshal.bigint.toJSON(this.points),
    };
  }
}
