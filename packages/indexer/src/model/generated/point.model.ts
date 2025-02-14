import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import { PointEvents } from './_pointEvents'
import { type PointEventsData, fromJsonPointEventsData } from './_pointEventsData'

@Entity_()
export class Point {
  constructor(props?: Partial<Point>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('bool', { nullable: false })
  isDynamic!: boolean

  @Column_('text', { nullable: false })
  address!: string

  @Column_('varchar', { length: 17, nullable: false })
  event!: PointEvents

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) => (obj == null ? undefined : fromJsonPointEventsData(obj)),
      to: (obj) => obj.toJSON(),
    },
  })
  data!: PointEventsData
}
