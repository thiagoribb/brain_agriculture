import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducersAndCropsTable1704754637251 implements MigrationInterface {
    name = 'CreateProducersAndCropsTable1704754637251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crops" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_098dbeb7c803dc7c08a7f02b805" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producers" ("id" SERIAL NOT NULL, "identificationNumber" character varying NOT NULL, "name" character varying NOT NULL, "farmName" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "totalArea" integer NOT NULL, "arableArea" integer NOT NULL, "vegetationArea" integer NOT NULL, CONSTRAINT "UQ_0e8a6b000bb2d49ff8ed91894bf" UNIQUE ("identificationNumber"), CONSTRAINT "PK_7f16886d1a44ed0974232b82506" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producers_crops_crops" ("producersId" integer NOT NULL, "cropsId" integer NOT NULL, CONSTRAINT "PK_66893b3024961353eaaaeaa1928" PRIMARY KEY ("producersId", "cropsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_09ecda4d7ecb36d8a88d998918" ON "producers_crops_crops" ("producersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_796ae36624bbbc3d035a8aee9f" ON "producers_crops_crops" ("cropsId") `);
        await queryRunner.query(`ALTER TABLE "producers_crops_crops" ADD CONSTRAINT "FK_09ecda4d7ecb36d8a88d998918d" FOREIGN KEY ("producersId") REFERENCES "producers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "producers_crops_crops" ADD CONSTRAINT "FK_796ae36624bbbc3d035a8aee9fb" FOREIGN KEY ("cropsId") REFERENCES "crops"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producers_crops_crops" DROP CONSTRAINT "FK_796ae36624bbbc3d035a8aee9fb"`);
        await queryRunner.query(`ALTER TABLE "producers_crops_crops" DROP CONSTRAINT "FK_09ecda4d7ecb36d8a88d998918d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_796ae36624bbbc3d035a8aee9f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_09ecda4d7ecb36d8a88d998918"`);
        await queryRunner.query(`DROP TABLE "producers_crops_crops"`);
        await queryRunner.query(`DROP TABLE "producers"`);
        await queryRunner.query(`DROP TABLE "crops"`);
    }

}
