module.exports = class Data1710862818157 {
    name = 'Data1710862818157'

    async up(db) {
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "FK_9de1ddecd2439acb5adf36d80ad"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "FK_19cd7d206093bbe247092e78e04"`)
        await db.query(`DROP INDEX "public"."IDX_ff34358ff2c3d98a323a2ed1ff"`)
        await db.query(`DROP INDEX "public"."IDX_9de1ddecd2439acb5adf36d80a"`)
        await db.query(`DROP INDEX "public"."IDX_19cd7d206093bbe247092e78e0"`)
        await db.query(`CREATE TABLE "archived_lend_intent" ("id" character varying NOT NULL, "short_id" text NOT NULL, "chain_id" integer NOT NULL, "deadline" numeric NOT NULL, "min_apy" numeric NOT NULL, "min_amount" numeric NOT NULL, "max_amount" numeric NOT NULL, "collateral" jsonb NOT NULL, "borrow" jsonb NOT NULL, "assortment_id" text NOT NULL, "signed_caveat_id" character varying, CONSTRAINT "REL_74b522fa0e75a944bbc20c5423" UNIQUE ("signed_caveat_id"), CONSTRAINT "PK_8c52de2c1164a432632b534946c" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_38c03a40a355dcd95ac361b7a5" ON "archived_lend_intent" ("short_id") `)
        await db.query(`CREATE INDEX "IDX_7512a303a167244f156101671d" ON "archived_lend_intent" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_893ca3241d5ffc9ce3a0841585" ON "archived_lend_intent" ("assortment_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_74b522fa0e75a944bbc20c5423" ON "archived_lend_intent" ("signed_caveat_id") `)


        await db.query(`ALTER TABLE "archived_borrow_intent" ADD "short_id" text DEFAULT ''`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ALTER COLUMN "short_id" SET NOT NULL`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ALTER COLUMN "short_id" DROP DEFAULT`)


        await db.query(`ALTER TABLE "archived_borrow_intent" ADD "active_approval" boolean DEFAULT false`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ALTER COLUMN "active_approval" SET NOT NULL`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ALTER COLUMN "active_approval" DROP DEFAULT`)

        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "UQ_b9549ce72a0f3ae0cb81e59f49b" UNIQUE ("signed_caveat_id")`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "UQ_f019e07b8345ab4e9b46acbdd20" UNIQUE ("recall_id")`)
        await db.query(`CREATE INDEX "IDX_bfca1a60c27b97ae6e79cdd3c2" ON "archived_borrow_intent" ("short_id") `)
        await db.query(`CREATE INDEX "IDX_f5e44717a216fb06c3d2d69b73" ON "archived_borrow_intent" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_fd326e4603fd0fdd3663807797" ON "archived_borrow_intent" ("assortment_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_b9549ce72a0f3ae0cb81e59f49" ON "archived_borrow_intent" ("signed_caveat_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_f019e07b8345ab4e9b46acbdd2" ON "archived_borrow_intent" ("recall_id") `)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "FK_b9549ce72a0f3ae0cb81e59f49b" FOREIGN KEY ("signed_caveat_id") REFERENCES "signed_caveat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "FK_f019e07b8345ab4e9b46acbdd20" FOREIGN KEY ("recall_id") REFERENCES "recall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "archived_lend_intent" ADD CONSTRAINT "FK_74b522fa0e75a944bbc20c54236" FOREIGN KEY ("signed_caveat_id") REFERENCES "signed_caveat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "FK_9de1ddecd2439acb5adf36d80ad" FOREIGN KEY ("signed_caveat_id") REFERENCES "signed_caveat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "FK_19cd7d206093bbe247092e78e04" FOREIGN KEY ("recall_id") REFERENCES "recall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`CREATE INDEX "IDX_ff34358ff2c3d98a323a2ed1ff" ON "archived_borrow_intent" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_9de1ddecd2439acb5adf36d80a" ON "archived_borrow_intent" ("signed_caveat_id") `)
        await db.query(`CREATE INDEX "IDX_19cd7d206093bbe247092e78e0" ON "archived_borrow_intent" ("recall_id") `)
        await db.query(`DROP TABLE "archived_lend_intent"`)
        await db.query(`DROP INDEX "public"."IDX_38c03a40a355dcd95ac361b7a5"`)
        await db.query(`DROP INDEX "public"."IDX_7512a303a167244f156101671d"`)
        await db.query(`DROP INDEX "public"."IDX_893ca3241d5ffc9ce3a0841585"`)
        await db.query(`DROP INDEX "public"."IDX_74b522fa0e75a944bbc20c5423"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP COLUMN "short_id"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP COLUMN "active_approval"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "UQ_b9549ce72a0f3ae0cb81e59f49b"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "UQ_f019e07b8345ab4e9b46acbdd20"`)
        await db.query(`DROP INDEX "public"."IDX_bfca1a60c27b97ae6e79cdd3c2"`)
        await db.query(`DROP INDEX "public"."IDX_f5e44717a216fb06c3d2d69b73"`)
        await db.query(`DROP INDEX "public"."IDX_fd326e4603fd0fdd3663807797"`)
        await db.query(`DROP INDEX "public"."IDX_b9549ce72a0f3ae0cb81e59f49"`)
        await db.query(`DROP INDEX "public"."IDX_f019e07b8345ab4e9b46acbdd2"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "FK_b9549ce72a0f3ae0cb81e59f49b"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "FK_f019e07b8345ab4e9b46acbdd20"`)
        await db.query(`ALTER TABLE "archived_lend_intent" DROP CONSTRAINT "FK_74b522fa0e75a944bbc20c54236"`)
    }
}
