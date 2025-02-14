module.exports = class Data1713874552565 {
    name = 'Data1713874552565'

    async up(db) {
        await db.query(`ALTER TABLE "market_details" ADD "total_intent_volume" numeric DEFAULT 0`)
        await db.query(`ALTER TABLE "market_details" ALTER COLUMN "total_intent_volume" SET NOT NULL`)
        await db.query(`ALTER TABLE "market_details" ALTER COLUMN "total_intent_volume" DROP DEFAULT`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "market_details" DROP COLUMN "total_intent_volume"`)
    }
}
