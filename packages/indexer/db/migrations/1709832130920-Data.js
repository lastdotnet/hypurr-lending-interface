module.exports = class Data1709832130920 {
    name = 'Data1709832130920'

    async up(db) {
        await db.query(`ALTER TABLE "erc20_stats" ADD "decimals" integer`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "erc20_stats" DROP COLUMN "decimals"`)
    }
}
