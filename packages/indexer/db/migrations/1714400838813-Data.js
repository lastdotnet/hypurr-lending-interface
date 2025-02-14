module.exports = class Data1714400838813 {
    name = 'Data1714400838813'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_bf6816eba9de1ecb544d9c8bb6"`)
        await db.query(`ALTER TABLE "leaderboard" DROP COLUMN "chain_id"`)
        await db.query(`ALTER TABLE "leaderboard" DROP COLUMN "address"`)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_bf6816eba9de1ecb544d9c8bb6" ON "leaderboard" ("chain_id") `)
        await db.query(`ALTER TABLE "leaderboard" ADD "chain_id" integer NOT NULL`)
        await db.query(`ALTER TABLE "leaderboard" ADD "address" text NOT NULL`)
    }
}
