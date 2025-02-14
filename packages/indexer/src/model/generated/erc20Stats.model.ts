import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import * as marshal from './marshal'

@Entity_()
export class Erc20Stats {
  constructor(props?: Partial<Erc20Stats>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Index_()
  @Column_('text', { nullable: false })
  address!: string

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  totalCollateral!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  totalDebt!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  avgApy!: bigint

  @Column_('int4', { nullable: false })
  decimals!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  cronUpdatedAt!: bigint
}
