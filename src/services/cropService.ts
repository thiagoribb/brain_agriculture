import AppDataSource from "src/data-source";
import { Crop } from "src/entities/Crop";

const cropRepository = AppDataSource.getRepository(Crop);

class CropService {
  async dealWithProducerCrops(producerCropsName: string[]) {
    const producerCrops: Crop[] = [];

    for (const cropName of producerCropsName) {
      let crop = await this.findByName(cropName);

      if (!crop) {
        crop = await this.create(cropName);
      }

      producerCrops.push(crop);
    }

    return producerCrops;
  }

  async findByName(cropName: string) {
    const crop = await cropRepository.findOne({ where: { name: cropName } });
    return crop;
  }

  async create(cropName: string) {
    const newCrop = cropRepository.create({ name: cropName });
    await cropRepository.save(newCrop);

    return newCrop;
  }
}

export const cropService = new CropService();
