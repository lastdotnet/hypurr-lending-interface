import { Column as Column_, Entity as Entity_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import * as marshal from './marshal'

@Entity_()
export class Leaderboard {
  constructor(props?: Partial<Leaderboard>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Column_('numeric', {
    nullable: false,
    transformer: marshal.bigintTransformer,
  })
  points!: bigint

  @Column_('int4', { nullable: false })
  rank!: number
}
