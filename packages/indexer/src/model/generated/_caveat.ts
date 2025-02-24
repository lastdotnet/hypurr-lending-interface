// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import assert from 'node:assert'

import * as marshal from './marshal'

export class Caveat {
  private _enforcer!: string
  private _data!: string

  constructor(props?: Partial<Omit<Caveat, 'toJSON'>>, json?: any) {
    Object.assign(this, props)
    if (json != null) {
      this._enforcer = marshal.string.fromJSON(json.enforcer)
      this._data = marshal.string.fromJSON(json.data)
    }
  }

  get enforcer(): string {
    assert(this._enforcer != null, 'uninitialized access')
    return this._enforcer
  }

  set enforcer(value: string) {
    this._enforcer = value
  }

  get data(): string {
    assert(this._data != null, 'uninitialized access')
    return this._data
  }

  set data(value: string) {
    this._data = value
  }

  toJSON(): object {
    return {
      data: this.data,
      enforcer: this.enforcer,
    }
  }
}
