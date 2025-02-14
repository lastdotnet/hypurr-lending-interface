module.exports = class Data1710167534927 {
    name = 'Data1710167534927'

    async up(db) {
        await db.query(`ALTER TABLE "market_details" RENAME COLUMN "open_interest" TO "cumulative_borrow"`)
        await db.query(`CREATE TABLE "archived_loan" ("id" character varying NOT NULL, "chain_id" integer NOT NULL, "borrower" text NOT NULL, "lender" text NOT NULL, "provider" character varying(7) NOT NULL, "type" character varying(7) NOT NULL, "start" numeric NOT NULL, "collateral" jsonb NOT NULL, "token" text NOT NULL, "decimals" numeric NOT NULL, "amount" numeric NOT NULL, "rate" numeric NOT NULL, "duration" numeric, CONSTRAINT "PK_faefb578fdd7b666451ff27c0a5" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_4b9e8caa59d131b0b25cd1d0fd" ON "archived_loan" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_9aaf8c013ce648483240978d1d" ON "archived_loan" ("borrower") `)
        await db.query(`CREATE INDEX "IDX_c7359709bbf3a9fd18133be1e4" ON "archived_loan" ("lender") `)

        await db.query(`ALTER TABLE "erc20_stats" ADD "cron_updated_at" numeric DEFAULT 0`)
        await db.query(`ALTER TABLE "erc20_stats" ALTER COLUMN "cron_updated_at" SET NOT NULL`)
        await db.query(`ALTER TABLE "erc20_stats" ALTER COLUMN "cron_updated_at" DROP DEFAULT`)

        await db.query(`ALTER TABLE "intent" ALTER COLUMN "active_approval" SET NOT NULL`)
        await db.query(`ALTER TABLE "intent" ALTER COLUMN "active_approval" DROP DEFAULT`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "market_details" RENAME COLUMN "cumulative_borrow" TO "open_interest"`)
        await db.query(`DROP TABLE "archived_loan"`)
        await db.query(`DROP INDEX "public"."IDX_4b9e8caa59d131b0b25cd1d0fd"`)
        await db.query(`DROP INDEX "public"."IDX_9aaf8c013ce648483240978d1d"`)
        await db.query(`DROP INDEX "public"."IDX_c7359709bbf3a9fd18133be1e4"`)
        await db.query(`ALTER TABLE "erc20_stats" DROP COLUMN "cron_updated_at"`)
        await db.query(`ALTER TABLE "intent" ALTER COLUMN "active_approval" DROP NOT NULL`)
        await db.query(`ALTER TABLE "intent" ALTER COLUMN "active_approval" SET DEFAULT true`)
    }
}
