module.exports = class Data1710250529940 {
  name = 'Data1710250529940';

  async up(db) {
    await db.query(`ALTER TABLE "intent" RENAME TO "borrow_intent"`);
    await db.query(`ALTER TABLE "offer" RENAME TO "lend_intent"`);
    await db.query(`ALTER TABLE "loan" RENAME TO "starport_loan"`);
    await db.query(`ALTER TABLE "reward_token" RENAME TO "point_token"`);
    await db.query(`ALTER TABLE "reward" RENAME TO "point"`);
    await db.query(`ALTER TABLE "position" RENAME TO "loan"`);

    await db.query(`ALTER TABLE "point" RENAME COLUMN "token_amount" TO "amount"`)
    await db.query(`ALTER TABLE "point" RENAME COLUMN "token_decimals" TO "decimals"`)
    await db.query(`ALTER TABLE "point" RENAME COLUMN "token" TO "address"`)

    await db.query(`ALTER TABLE "lend_intent" RENAME COLUMN "min_rate" TO "min_apy"`)
    await db.query(`ALTER TABLE "lend_intent" RENAME COLUMN "debt" TO "borrow"`)

  }

  async down(db) {
    await db.query(`ALTER TABLE "borrow_intent" RENAME TO "intent"`);
    await db.query(`ALTER TABLE "lend_intent" RENAME TO "offer"`);
    await db.query(`ALTER TABLE "starport_loan" RENAME TO "loan"`);
    await db.query(`ALTER TABLE "point_token" RENAME TO "reward_token"`);
    await db.query(`ALTER TABLE "point" RENAME TO "reward"`);
    await db.query(`ALTER TABLE "loan" RENAME TO "position"`);

    await db.query(`ALTER TABLE "point" RENAME COLUMN "amount" TO "token_amount"`)
    await db.query(`ALTER TABLE "point" RENAME COLUMN "decimals" TO "token_decimals"`)
    await db.query(`ALTER TABLE "point" RENAME COLUMN "address" TO "token"`)

    await db.query(`ALTER TABLE "lend_intent" RENAME COLUMN "min_apy" TO "min_rate"`)
    await db.query(`ALTER TABLE "lend_intent" RENAME COLUMN "borrow" TO "debt"`)

  }
};
