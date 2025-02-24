import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import { LoanType } from './_loanType'
import { Provider } from './_provider'
import { SpentItem } from './_spentItem'
import * as marshal from './marshal'

@Index_(['chainId', 'lender'], { unique: false })
@Index_(['chainId', 'borrower'], { unique: false })
@Entity_()
export class Loan {
  constructor(props?: Partial<Loan>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Column_('int4', { nullable: false })
  chainId!: number

  @Index_()
  @Column_('text', { nullable: false })
  borrower!: string

  @Index_()
  @Column_('text', { nullable: false })
  lender!: string

  @Column_('varchar', { length: 7, nullable: false })
  provider!: Provider

  @Column_('varchar', { length: 7, nullable: false })
  type!: LoanType

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  start!: bigint

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) =>
        obj == null ? undefined : marshal.fromList(obj, (val) => new SpentItem(undefined, marshal.nonNull(val))),
      to: (obj) => obj.map((val: any) => val.toJSON()),
    },
  })
  collateral!: SpentItem[]

  @Column_('text', { nullable: false })
  address!: string

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  decimals!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  amount!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  rate!: bigint

  @Column_('numeric', {
    nullable: true,
    transformer: marshal.bigintTransformer,
  })
  duration!: bigint | undefined | null
}
