module.exports = class Data1716900883152 {
    name = 'Data1716900883152'

    async up(db) {
        await db.query(`CREATE TABLE "ratio_lend_intent" ("id" character varying NOT NULL, "short_id" text NOT NULL, "chain_id" integer NOT NULL, "deadline" numeric NOT NULL, "apy" numeric NOT NULL, "min_collateral_amount" numeric NOT NULL, "collateral_to_debt_ratio" numeric NOT NULL, "collateral" jsonb NOT NULL, "borrow" jsonb NOT NULL, "assortment_id" text NOT NULL, "active_approval" boolean NOT NULL, "usd_value_collateral" numeric, "usd_value_borrow" numeric, "signed_caveat_id" character varying, CONSTRAINT "REL_3b17472915d35510119179df98" UNIQUE ("signed_caveat_id"), CONSTRAINT "PK_be914d28e354b9fc11258af27e0" PRIMARY KEY ("id"))`)
        await db.query(`CREATE UNIQUE INDEX "IDX_e7b12b23f3883ac2dcf5fc4c71" ON "ratio_lend_intent" ("short_id") `)
        await db.query(`CREATE INDEX "IDX_8591da4df8d3a4ea3b14057a68" ON "ratio_lend_intent" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_29399afbcae2d5eff1861fbf85" ON "ratio_lend_intent" ("assortment_id") `)
        await db.query(`CREATE UNIQUE INDEX "IDX_3b17472915d35510119179df98" ON "ratio_lend_intent" ("signed_caveat_id") `)
        await db.query(`ALTER TABLE "ratio_lend_intent" ADD CONSTRAINT "FK_3b17472915d35510119179df988" FOREIGN KEY ("signed_caveat_id") REFERENCES "signed_caveat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "ratio_lend_intent"`)
        await db.query(`DROP INDEX "public"."IDX_e7b12b23f3883ac2dcf5fc4c71"`)
        await db.query(`DROP INDEX "public"."IDX_8591da4df8d3a4ea3b14057a68"`)
        await db.query(`DROP INDEX "public"."IDX_29399afbcae2d5eff1861fbf85"`)
        await db.query(`DROP INDEX "public"."IDX_3b17472915d35510119179df98"`)
        await db.query(`ALTER TABLE "ratio_lend_intent" DROP CONSTRAINT "FK_3b17472915d35510119179df988"`)
    }
}
