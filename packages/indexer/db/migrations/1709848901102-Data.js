module.exports = class Data1709848901102 {
    name = 'Data1709848901102'

    async up(db) {
        await db.query(`ALTER TABLE "erc20_stats" ALTER COLUMN "decimals" SET NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "erc20_stats" ALTER COLUMN "decimals" DROP NOT NULL`)
    }
}
