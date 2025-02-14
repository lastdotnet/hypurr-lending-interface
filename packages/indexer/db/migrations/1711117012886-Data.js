module.exports = class Data1711117012886 {
    name = 'Data1711117012886'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_2ef8097cf6525ce71333d81275"`)
        await db.query(`DROP INDEX "public"."IDX_818361ea600cb30a9505db8951"`)
        await db.query(`ALTER TABLE "point" ADD "is_dynamic" boolean NOT NULL default true`)
        await db.query(`ALTER TABLE "point" ADD "event" character varying(4) NOT NULL default 'Loan'`)
        await db.query(`ALTER TABLE "point" ADD "data" jsonb`)
        await db.query(`UPDATE "point"
        SET 
          data = jsonb_build_object(
            'borrower', borrower,
            'lender', lender,
            'start', start::text,
            'amount', amount::text,
            'decimals', decimals,
            'isClosed', is_closed::boolean,
            'baseDenominator', base_denominator,
            'points', points::text,
            'isTypeOf', 'LoanEventData')`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "data" SET NOT NULL`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "borrower"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "lender"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "start"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "amount"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "decimals"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "is_closed"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "base_denominator"`)
        await db.query(`ALTER TABLE "point" DROP COLUMN "points"`)
    }

    async down(db) {
        //    Very hard to do, not sure if needed for the moment
    }
}
