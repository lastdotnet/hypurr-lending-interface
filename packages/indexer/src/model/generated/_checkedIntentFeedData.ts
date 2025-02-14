import assert from 'assert';

import * as marshal from './marshal';

export class CheckedIntentFeedData {
  public readonly isTypeOf = 'CheckedIntentFeedData';
  private _createdAt!: Date;

  constructor(
    props?: Partial<Omit<CheckedIntentFeedData, 'toJSON'>>,
    json?: any
  ) {
    Object.assign(this, props);
    if (json != null) {
      this._createdAt = marshal.datetime.fromJSON(json.createdAt);
    }
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
    };
  }
}
