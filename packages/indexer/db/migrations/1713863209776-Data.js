module.exports = class Data1713863209776 {
    name = 'Data1713863209776'

    async up(db) {
        await db.query(`ALTER TABLE "borrow_intent" ADD "usd_value_collateral" numeric`)
        await db.query(`ALTER TABLE "borrow_intent" ADD "usd_value_borrow" numeric`)
        await db.query(`ALTER TABLE "lend_intent" ADD "usd_value_collateral" numeric`)
        await db.query(`ALTER TABLE "lend_intent" ADD "usd_value_borrow" numeric`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD "usd_value_collateral" numeric`)
        await db.query(`ALTER TABLE "archived_borrow_intent" ADD "usd_value_borrow" numeric`)
        await db.query(`ALTER TABLE "archived_lend_intent" ADD "usd_value_collateral" numeric`)
        await db.query(`ALTER TABLE "archived_lend_intent" ADD "usd_value_borrow" numeric`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "borrow_intent" DROP COLUMN "usd_value_collateral"`)
        await db.query(`ALTER TABLE "borrow_intent" DROP COLUMN "usd_value_borrow"`)
        await db.query(`ALTER TABLE "lend_intent" DROP COLUMN "usd_value_collateral"`)
        await db.query(`ALTER TABLE "lend_intent" DROP COLUMN "usd_value_borrow"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP COLUMN "usd_value_collateral"`)
        await db.query(`ALTER TABLE "archived_borrow_intent" DROP COLUMN "usd_value_borrow"`)
        await db.query(`ALTER TABLE "archived_lend_intent" DROP COLUMN "usd_value_collateral"`)
        await db.query(`ALTER TABLE "archived_lend_intent" DROP COLUMN "usd_value_borrow"`)
    }
}
