import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import { SpentItem } from './_spentItem'
import { Terms } from './_terms'
import * as marshal from './marshal'

@Index_(['chainId', 'id'], { unique: false })
@Entity_()
export class StarportLoan {
  constructor(props?: Partial<StarportLoan>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  start!: bigint

  @Column_('text', { nullable: false })
  custodian!: string

  @Index_()
  @Column_('text', { nullable: false })
  borrower!: string

  @Column_('text', { nullable: false })
  issuer!: string

  @Column_('text', { nullable: false })
  originator!: string

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) =>
        obj == null ? undefined : marshal.fromList(obj, (val) => new SpentItem(undefined, marshal.nonNull(val))),
      to: (obj) => obj.map((val: any) => val.toJSON()),
    },
  })
  collateral!: SpentItem[]

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) =>
        obj == null ? undefined : marshal.fromList(obj, (val) => new SpentItem(undefined, marshal.nonNull(val))),
      to: (obj) => obj.map((val: any) => val.toJSON()),
    },
  })
  debt!: SpentItem[]

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) => (obj == null ? undefined : new Terms(undefined, obj)),
      to: (obj) => obj.toJSON(),
    },
  })
  terms!: Terms
}
