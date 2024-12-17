import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser31732802279330 implements MigrationInterface {
  name = 'UpdateUser31732802279330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "consent"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "consent" json`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "consent"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "consent" character varying`,
    );
  }
}
