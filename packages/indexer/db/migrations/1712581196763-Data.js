module.exports = class Data1712581196763 {
    name = 'Data1712581196763'

    async up(db) {
        await db.query(`CREATE TABLE "off_chain_point" ("id" character varying NOT NULL, "chain_id" integer NOT NULL, "address" text NOT NULL, "type" character varying(19) NOT NULL, "data" jsonb, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d38caeb5984423d766c32697146" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_2ae84b7ee5de38f509f748aa2a" ON "off_chain_point" ("chain_id") `)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "is_dynamic" DROP DEFAULT`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "event" TYPE character varying(17)`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "data" DROP NOT NULL`)
    }

    async down(db) {
        await db.query(`DROP TABLE "off_chain_point"`)
        await db.query(`DROP INDEX "public"."IDX_2ae84b7ee5de38f509f748aa2a"`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "is_dynamic" SET DEFAULT true`)
        await db.query(`ALTER TABLE "point" ADD "event" character varying(4) NOT NULL DEFAULT 'Loan'`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "event" TYPE character varying(4)`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "data" SET NOT NULL`)
    }
}
