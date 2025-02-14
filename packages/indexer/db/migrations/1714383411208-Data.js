module.exports = class Data1714383411208 {
    name = 'Data1714383411208'

    async up(db) {
        await db.query(`ALTER TABLE "lend_intent" ADD "active_approval" boolean DEFAULT true`)
        await db.query(`ALTER TABLE "lend_intent" ALTER COLUMN "active_approval" SET NOT NULL`)
        await db.query(`ALTER TABLE "lend_intent" ALTER COLUMN "active_approval" DROP DEFAULT`)
        await db.query(`ALTER TABLE "archived_lend_intent" ADD "active_approval" boolean DEFAULT true`)
        await db.query(`ALTER TABLE "archived_lend_intent" ALTER COLUMN "active_approval" SET NOT NULL`)
        await db.query(`ALTER TABLE "archived_lend_intent" ALTER COLUMN "active_approval" DROP DEFAULT`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "lend_intent" DROP COLUMN "active_approval"`)
        await db.query(`ALTER TABLE "archived_lend_intent" DROP COLUMN "active_approval"`)
    }
}
