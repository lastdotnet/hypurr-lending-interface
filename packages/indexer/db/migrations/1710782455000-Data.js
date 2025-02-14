module.exports = class Data1710782455000 {
    name = 'Data1710782455000'

    async up(db) {
        await db.query(`ALTER TABLE "point_token" ALTER COLUMN "base_denominator" TYPE numeric;`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "base_denominator" TYPE numeric;`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "point_token" ALTER COLUMN "base_denominator" TYPE integer NOT NULL;`)
        await db.query(`ALTER TABLE "point" ALTER COLUMN "base_denominator" TYPE integer NOT NULL;`)
    }
}
