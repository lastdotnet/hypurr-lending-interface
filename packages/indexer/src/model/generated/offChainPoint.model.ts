import { Column as Column_, Entity as Entity_, Index as Index_, PrimaryColumn as PrimaryColumn_ } from 'typeorm'

import { EventType } from './_eventType'
import { type OffChainPointDataType, fromJsonOffChainPointDataType } from './_offChainPointDataType'

@Entity_()
export class OffChainPoint {
  constructor(props?: Partial<OffChainPoint>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_('text')
  id!: string

  @Index_()
  @Column_('int4', { nullable: false })
  chainId!: number

  @Column_('text', { nullable: false })
  address!: string

  @Column_('varchar', { length: 17, nullable: false })
  type!: EventType

  @Column_('jsonb', {
    nullable: false,
    transformer: {
      from: (obj) => (obj == null ? undefined : fromJsonOffChainPointDataType(obj)),
      to: (obj) => obj.toJSON(),
    },
  })
  data!: OffChainPointDataType

  @Column_('timestamp with time zone', { nullable: false })
  createdAt!: Date
}
