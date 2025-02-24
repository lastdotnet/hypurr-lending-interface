import {
  BigIntColumn as BigIntColumn_,
  BooleanColumn as BooleanColumn_,
  Column as Column_,
  Entity as Entity_,
  FloatColumn as FloatColumn_,
  Index as Index_,
  IntColumn as IntColumn_,
  JoinColumn as JoinColumn_,
  OneToOne as OneToOne_,
  PrimaryColumn as PrimaryColumn_,
  StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'

import { SpentItem } from './_spentItem'
import * as marshal from './marshal'
import { SignedCaveat } from './signedCaveat.model'

@Entity_()
export class RatioLendIntent {
  constructor(props?: Partial<RatioLendIntent>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_({ unique: true })
  @StringColumn_({ nullable: false })
  shortId!: string

  @Index_()
  @IntColumn_({ nullable: false })
  chainId!: number

  @BigIntColumn_({ nullable: false })
  deadline!: bigint

  @BigIntColumn_({ nullable: false })
  apy!: bigint

  @BigIntColumn_({ nullable: false })
  minCollateralAmount!: bigint

  @BigIntColumn_({ nullable: false })
  collateralToDebtRatio!: bigint

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

  @Index_()
  @StringColumn_({ nullable: false })
  assortmentId!: string

  @Index_({ unique: true })
  @OneToOne_(() => SignedCaveat, { nullable: true })
  @JoinColumn_()
  signedCaveat!: SignedCaveat | undefined | null

  @BooleanColumn_({ nullable: false })
  activeApproval!: boolean

  @FloatColumn_({ nullable: true })
  usdValueCollateral!: number | undefined | null

  @FloatColumn_({ nullable: true })
  usdValueBorrow!: number | undefined | null
}
