import {
  Column as Column_,
  Entity as Entity_,
  Index as Index_,
  JoinColumn as JoinColumn_,
  OneToOne as OneToOne_,
  PrimaryColumn as PrimaryColumn_,
} from 'typeorm'

import * as marshal from './marshal'
import { SpentItem } from './_spentItem'
import { Recall } from './recall.model'
import { SignedCaveat } from './signedCaveat.model'

@Entity_()
export class BorrowIntent {
  constructor(props?: Partial<BorrowIntent>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_({ unique: true })
  @Column_('text', { nullable: false })
  shortId!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  deadline!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  startTime!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  endTime!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  startRate!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  endRate!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  minAmount!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  maxAmount!: bigint

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
  borrow!: SpentItem[]

  @Column_('numeric', { nullable: true, transformer: marshal.floatTransformer })
  usdValueCollateral!: number | undefined | null

  @Column_('numeric', { nullable: true, transformer: marshal.floatTransformer })
  usdValueBorrow!: number | undefined | null

  @Column_('bool', { nullable: true })
  isRecall!: boolean | undefined | null

  @Index_()
  @Column_('text', { nullable: false })
  assortmentId!: string

  @Index_({ unique: true })
  @OneToOne_(() => SignedCaveat, { nullable: true })
  @JoinColumn_()
  signedCaveat!: SignedCaveat | undefined | null

  @Index_({ unique: true })
  @OneToOne_(() => Recall, { nullable: true })
  @JoinColumn_()
  recall!: Recall | undefined | null

  @Column_('bool', { nullable: false })
  activeApproval!: boolean
}
