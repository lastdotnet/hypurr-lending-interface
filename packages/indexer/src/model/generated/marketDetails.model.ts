import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import * as marshal from './marshal'

@Entity_()
export class MarketDetails {
  constructor(props?: Partial<MarketDetails>) {
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
  cumulativeBorrow!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.floatTransformer,
  })
  totalMarketSize!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.floatTransformer,
  })
  cumulativeCollateral!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.floatTransformer,
  })
  totalIntentVolume!: number
}
