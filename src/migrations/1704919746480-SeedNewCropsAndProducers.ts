import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedNewCropsAndProducers1704919746480
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await this.insertCrops(queryRunner);
    await this.insertProducers(queryRunner);
    await this.insertProducersCrops(queryRunner);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await this.deleteProducers(queryRunner);
    await this.deleteCrops(queryRunner);
  }

  private async insertCrops(queryRunner: QueryRunner): Promise<void> {
    const cropNames = ["Milho", "Soja", "Algodão"];

    await queryRunner.query(
      `
            INSERT INTO crops (name) VALUES ($1), ($2), ($3);
        `,
      cropNames
    );
  }

  private async insertProducers(queryRunner: QueryRunner): Promise<void> {
    const producerData = [
      {
        identificationNumber: "12345678999",
        name: "Thiago Ribeiro",
        farmName: "Fazenda São Paulo",
        city: "Três Rios",
        state: "Rio de Janeiro",
        totalArea: 50,
        arableArea: 13,
        vegetationArea: 28,
      },
      {
        identificationNumber: "12345678988",
        name: "Joaquim Machado",
        farmName: "Fazenda Flor",
        city: "São Paulo",
        state: "São Paulo",
        totalArea: 10,
        arableArea: 5,
        vegetationArea: 5,
      },
    ];

    for (const producer of producerData) {
      await queryRunner.query(
        `
                INSERT INTO producers ("identificationNumber", name, "farmName", city, state, "totalArea", "arableArea", "vegetationArea")
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
            `,
        [
          producer.identificationNumber,
          producer.name,
          producer.farmName,
          producer.city,
          producer.state,
          producer.totalArea,
          producer.arableArea,
          producer.vegetationArea,
        ]
      );
    }
  }

  private async insertProducersCrops(queryRunner: QueryRunner): Promise<void> {
    const producerCropsData = [
      { producerName: "Thiago Ribeiro", cropName: "Milho" },
      { producerName: "Thiago Ribeiro", cropName: "Soja" },
      { producerName: "Joaquim Machado", cropName: "Algodão" },
    ];

    for (const { producerName, cropName } of producerCropsData) {
      const producer = await queryRunner.query(
        "SELECT id FROM producers WHERE name = $1",
        [producerName]
      );

      const crop = await queryRunner.query(
        "SELECT id FROM crops WHERE name = $1",
        [cropName]
      );

      if (producer.length > 0 && crop.length > 0) {
        await queryRunner.query(
          'INSERT INTO producers_crops_crops ("producersId", "cropsId") VALUES ($1, $2)',
          [producer[0].id, crop[0].id]
        );
      }
    }
  }

  private async deleteCrops(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM crops WHERE name IN ('Milho', 'Soja', 'Algodão');
    `);
  }

  private async deleteProducers(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM producers_crops_crops WHERE "producersId" IN (SELECT id FROM producers WHERE "identificationNumber" IN ('12345678999', '12345678988'));
    `);

    await queryRunner.query(`
        DELETE FROM producers WHERE "identificationNumber" IN ('12345678999', '12345678988');
    `);
  }
}
