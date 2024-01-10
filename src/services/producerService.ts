import AppDataSource from "src/data-source";
import { Crop } from "src/entities/Crop";
import { Producer } from "src/entities/Producer";

const producerRepository = AppDataSource.getRepository(Producer);

class ProducerService {
  async create(
    identificationNumber: string,
    name: string,
    farmName: string,
    city: string,
    state: string,
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
    crops: Crop[]
  ) {
    const newProducer = producerRepository.create({
      identificationNumber,
      name,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      crops,
    });
    try {
      await producerRepository.save(newProducer);
    } catch (error: any) {
      throw new Error("Error saving producer: " + error.message);
    }
    return newProducer;
  }

  async editProducer(id: number, updateFields: Partial<Producer>) {
    const existingProducer = await producerRepository.findOne({
      where: { id },
    });
    if (!existingProducer) {
      throw new Error("Producer not found");
    }

    Object.assign(existingProducer, updateFields);
    await producerRepository.save(existingProducer);

    return existingProducer;
  }

  async deleteProducerById(id: number) {
    const existingProducer = await producerRepository.findOneBy({ id });
    if (!existingProducer) {
      throw new Error(`Producer with ID ${id} not found`);
    }

    await producerRepository.delete(id);
  }

  dealWithAreasOnCreate(
    totalArea: number,
    arableArea: number,
    vegetationArea: number
  ) {
    const areTheAreasValid = producerService.areTheAreasValid(
      totalArea,
      arableArea,
      vegetationArea
    );

    if (!areTheAreasValid) {
      throw new Error(
        "Invalid areas: arableArea + vegetationArea must not exceed totalArea"
      );
    }
  }

  async dealWithAreasOnEdit(updateFields: any, id: number) {
    let producerDataToCompare;

    if (
      !updateFields.totalArea ||
      !updateFields.arableArea ||
      !updateFields.vegetationArea
    ) {
      producerDataToCompare = await producerRepository.findOneBy({ id });
    }

    const totalArea =
      updateFields.totalArea || producerDataToCompare?.totalArea;
    const arableArea =
      updateFields.arableArea || producerDataToCompare?.arableArea;
    const vegetationArea =
      updateFields.vegetationArea || producerDataToCompare?.vegetationArea;

    const areTheAreasValid = producerService.areTheAreasValid(
      totalArea,
      arableArea,
      vegetationArea
    );

    if (!areTheAreasValid) {
      throw new Error(
        "Invalid areas: arableArea + vegetationArea must not exceed totalArea"
      );
    }
  }

  async findByIdentificationNumber(identificationNumber: string) {
    const existingProducer = await producerRepository.findOne({
      where: { identificationNumber },
    });

    return existingProducer;
  }

  areTheAreasValid(
    totalArea: number,
    arableArea: number,
    vegetationArea: number
  ) {
    return arableArea + vegetationArea <= totalArea;
  }
}

export const producerService = new ProducerService();
