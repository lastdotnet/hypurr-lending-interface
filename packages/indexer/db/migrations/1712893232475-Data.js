module.exports = class Data1712893232475 {
    name = 'Data1712893232475'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_aa5b87b9e517ba3d83840a6046"`)
        await db.query(`DROP INDEX "public"."IDX_7c33db32954f396d541dfcd8ab"`)
        await db.query(`CREATE INDEX "IDX_9a1cb394237184706b1205ffc1" ON "starport_loan" ("chain_id", "id") `)
        await db.query(`CREATE INDEX "IDX_cf925559d1361311384873b148" ON "loan" ("chain_id", "borrower") `)
        await db.query(`CREATE INDEX "IDX_5562760acd1ebe4ce5b0907570" ON "loan" ("chain_id", "lender") `)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_aa5b87b9e517ba3d83840a6046" ON "starport_loan" ("chain_id") `)
        await db.query(`CREATE INDEX "IDX_7c33db32954f396d541dfcd8ab" ON "loan" ("chain_id") `)
        await db.query(`DROP INDEX "public"."IDX_9a1cb394237184706b1205ffc1"`)
        await db.query(`DROP INDEX "public"."IDX_cf925559d1361311384873b148"`)
        await db.query(`DROP INDEX "public"."IDX_5562760acd1ebe4ce5b0907570"`)
    }
}
