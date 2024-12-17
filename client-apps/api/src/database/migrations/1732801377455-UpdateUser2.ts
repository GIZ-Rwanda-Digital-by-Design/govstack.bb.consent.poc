import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser21732801377455 implements MigrationInterface {
  name = 'UpdateUser21732801377455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "consent" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "consent"`);
  }
}
