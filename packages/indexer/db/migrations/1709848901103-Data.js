module.exports = class Data1709848901103 {
    name = 'Data1709848901103'

    async up(db) {
        await db.query(`ALTER TABLE "intent" ADD "active_approval" boolean DEFAULT true`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "intent" DROP COLUMN "active_approval"`)
    }
}
