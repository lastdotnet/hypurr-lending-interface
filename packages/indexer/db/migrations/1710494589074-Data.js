module.exports = class Data1710494589074 {
    name = 'Data1710494589074'

    async up(db) {
        await db.query(`ALTER TABLE "leaderboard" ADD "address" text`)
        await db.query(`UPDATE "leaderboard" SET address = id`)
        await db.query(`ALTER TABLE "leaderboard" ALTER COLUMN "address" SET NOT NULL`)
        await db.query(`UPDATE "leaderboard" SET id = CONCAT(chain_id::text, '_', address)`)
    }

    async down(db) {
        await db.query(`UPDATE "leaderboard" SET id = address`)
        await db.query(`ALTER TABLE "leaderboard" DROP COLUMN "address"`)
    }
}
