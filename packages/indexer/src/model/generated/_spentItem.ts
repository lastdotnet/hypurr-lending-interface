import assert from 'assert';

import * as marshal from './marshal';

export class SpentItem {
  private _itemType!: number;
  private _token!: string;
  private _identifier!: bigint;
  private _amount!: bigint;

  constructor(props?: Partial<Omit<SpentItem, 'toJSON'>>, json?: any) {
    Object.assign(this, props);
    if (json != null) {
      this._itemType = marshal.int.fromJSON(json.itemType);
      this._token = marshal.string.fromJSON(json.token);
      this._identifier = marshal.bigint.fromJSON(json.identifier);
      this._amount = marshal.bigint.fromJSON(json.amount);
    }
  }

  get itemType(): number {
    assert(this._itemType != null, 'uninitialized access');
    return this._itemType;
  }

  set itemType(value: number) {
    this._itemType = value;
  }

  get token(): string {
    assert(this._token != null, 'uninitialized access');
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get identifier(): bigint {
    assert(this._identifier != null, 'uninitialized access');
    return this._identifier;
  }

  set identifier(value: bigint) {
    this._identifier = value;
  }

  get amount(): bigint {
    assert(this._amount != null, 'uninitialized access');
    return this._amount;
  }

  set amount(value: bigint) {
    this._amount = value;
  }

  toJSON(): object {
    return {
      amount: marshal.bigint.toJSON(this.amount),
      identifier: marshal.bigint.toJSON(this.identifier),
      itemType: this.itemType,
      token: this.token,
    };
  }
}
