'use server'

// without use server, we may run into issue where next runtime minimizes the typeorm class names which breaks the models, this would present as errors like "Relation c.some_field_name doesn't exist"
import { SnakeNamingStrategy } from '@subsquid/typeorm-config/lib/namingStrategy'
import { native } from 'pg'
import { DataSource } from 'typeorm'

import { ENV_SERVER } from '@/astaria/constants/environmentServer'

import {
  ArchivedBorrowIntent,
  ArchivedLendIntent,
  ArchivedLoan,
  BorrowIntent,
  Caveat,
  Erc20Stats,
  Leaderboard,
  LendIntent,
  Loan,
  MarketDetails,
  OffChainPoint,
  Point,
  PointToken,
  Recall,
  SignedCaveat,
  StarportLoan,
} from 'indexer/model'

void native // typeorm issue. See https://github.com/typeorm/typeorm/issues/7628#issuecomment-1302333468

const dataSource = new DataSource({
  entities: [
    SignedCaveat,
    Caveat,
    BorrowIntent,
    Loan,
    StarportLoan,
    Recall,
    LendIntent,
    Erc20Stats,
    Leaderboard,
    OffChainPoint,
    Point,
    ArchivedBorrowIntent,
    ArchivedLendIntent,
    ArchivedLoan,
    MarketDetails,
    PointToken,
  ],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  type: 'postgres',
  url: ENV_SERVER.DB_URL,
})

export const initializeDataSource = async () => {
  if (!dataSource.isInitialized) {
    return dataSource.initialize()
  }

  return dataSource
}
