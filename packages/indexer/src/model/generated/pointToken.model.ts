import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import * as marshal from './marshal'

@Entity_()
export class PointToken {
  constructor(props?: Partial<PointToken>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.floatTransformer,
  })
  baseDenominator!: number

  @Column_('int4', { nullable: false })
  decimals!: number

  @Column_('text', { nullable: false })
  address!: string

  @Column_('int4', { nullable: false })
  timestamp!: number
}
