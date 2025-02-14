module.exports = class Data1713785765891 {
    name = 'Data1713785765891'

    async up(db) {
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "FK_f019e07b8345ab4e9b46acbdd20"`)
        await db.query(`DROP INDEX "public"."IDX_f019e07b8345ab4e9b46acbdd2"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP CONSTRAINT "UQ_f019e07b8345ab4e9b46acbdd20"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP COLUMN "recall_id"`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "FK_f019e07b8345ab4e9b46acbdd20" FOREIGN KEY ("recall_id") REFERENCES "recall"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`CREATE UNIQUE INDEX "IDX_f019e07b8345ab4e9b46acbdd2" ON "archived_borrow_intent" ("recall_id") `)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD CONSTRAINT "UQ_f019e07b8345ab4e9b46acbdd20" UNIQUE ("recall_id")`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD "recall_id" character varying`)
    }
}
