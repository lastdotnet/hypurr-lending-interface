import assert from 'assert';

import * as marshal from './marshal';

export class SpecialData {
  public readonly isTypeOf = 'SpecialData';
  private _points!: bigint;
  private _createdAt!: Date;

  constructor(props?: Partial<Omit<SpecialData, 'toJSON'>>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._points = marshal.bigint.fromJSON(json.points);
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
      isTypeOf: this.isTypeOf,
      points: marshal.bigint.toJSON(this.points),
    };
  }
}
