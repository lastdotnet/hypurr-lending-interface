module.exports = class Data1710296697450 {
    name = 'Data1710296697450'

    async up(db) {
      await db.query(`ALTER TABLE "archived_intent" RENAME TO "archived_borrow_intent"`);
    }

    async down(db) {
      await db.query(`ALTER TABLE "archived_borrow_intent" RENAME TO "archived_intent"`);
    }
}
