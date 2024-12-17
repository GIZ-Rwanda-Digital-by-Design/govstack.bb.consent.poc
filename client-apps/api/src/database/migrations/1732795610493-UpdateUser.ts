import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1732795610493 implements MigrationInterface {
  name = 'UpdateUser1732795610493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "nid" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "institution" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "designation" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "mobile" character varying`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da64556cd7f0337b018c66e7e8" ON "user" ("nid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da64556cd7f0337b018c66e7e8"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mobile"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "designation"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "institution"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nid"`);
  }
}
