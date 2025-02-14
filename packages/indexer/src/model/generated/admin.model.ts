import {
  DateTimeColumn as DateTimeColumn_,
  Entity as Entity_,
  PrimaryColumn as PrimaryColumn_,
} from '@subsquid/typeorm-store'

@Entity_()
export class Admin {
  constructor(props?: Partial<Admin>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @DateTimeColumn_({ nullable: false })
  createdAt!: Date
}
