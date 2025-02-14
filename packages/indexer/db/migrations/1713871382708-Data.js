module.exports = class Data1713871382708 {
    name = 'Data1713871382708'

    async up(db) {
        await db.query(`ALTER TABLE "market_details" ADD "cumulative_collateral" numeric DEFAULT 0`)
        await db.query(`ALTER TABLE "market_details" ALTER COLUMN "cumulative_collateral" SET NOT NULL`)
        await db.query(`ALTER TABLE "market_details" ALTER COLUMN "cumulative_collateral" DROP DEFAULT`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "market_details" DROP COLUMN "cumulative_collateral"`)
    }
}
