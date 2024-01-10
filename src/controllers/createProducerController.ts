import { Request, Response } from "express";
import { cropService } from "src/services/cropService";
import { producerService } from "src/services/producerService";

class CreateProducerController {
  async execute(req: Request, res: Response) {
    const {
      identificationNumber,
      name,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerCrops,
    } = req.body;

    try {
      producerService.dealWithAreasOnCreate(
        totalArea,
        arableArea,
        vegetationArea
      );

      const crops = await cropService.dealWithProducerCrops(producerCrops);
      const newProducer = await producerService.create(
        identificationNumber,
        name,
        farmName,
        city,
        state,
        totalArea,
        arableArea,
        vegetationArea,
        crops
      );

      return res.status(201).send(newProducer);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const createProducerController = new CreateProducerController();
