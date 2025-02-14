import {
  Column as Column_,
  Entity as Entity_,
  Index as Index_,
  JoinColumn as JoinColumn_,
  OneToOne as OneToOne_,
  PrimaryColumn as PrimaryColumn_,
} from 'typeorm'

import * as marshal from './marshal'
import { StarportLoan } from './starportLoan.model'

@Entity_()
export class Recall {
  constructor(props?: Partial<Recall>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('text', { nullable: false })
  recaller!: string

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  start!: bigint

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  end!: bigint

  @Index_({ unique: true })
  @OneToOne_(() => StarportLoan, { nullable: true })
  @JoinColumn_()
  starportLoan!: StarportLoan
}
