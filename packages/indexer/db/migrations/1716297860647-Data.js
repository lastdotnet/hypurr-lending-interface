module.exports = class Data1716297860647 {
    name = 'Data1716297860647'

    async up(db) {
        await db.query(`CREATE TABLE "admin" ("id" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "admin"`)
    }
}
