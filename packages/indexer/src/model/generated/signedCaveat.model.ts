import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import * as marshal from './marshal'
import { Caveat } from './_caveat'
import { CaveatStatus } from './_caveatStatus'

@Entity_()
export class SignedCaveat {
  constructor(props?: Partial<SignedCaveat>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('text', { nullable: false })
  salt!: string

  @Column_('text', { nullable: false })
  signature!: string

  @Column_('text', { nullable: false })
  hash!: string

  @Column_('text', { nullable: false })
  owner!: string

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  deadline!: bigint

  @Column_('bool', { nullable: false })
  singleUse!: boolean

  @Column_('text', { nullable: false })
  nonce!: string

  @Column_('varchar', { length: 11, nullable: false })
  status!: CaveatStatus

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) =>
        obj == null ? undefined : marshal.fromList(obj, (val) => new Caveat(undefined, marshal.nonNull(val))),
      to: (obj) => obj.map((val: any) => val.toJSON()),
    },
  })
  caveats!: Caveat[]

  @Column_('timestamp with time zone', { nullable: false })
  createdAt!: Date
}
