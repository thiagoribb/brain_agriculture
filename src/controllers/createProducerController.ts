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

    const areTheAreasValid = producerService.areTheAreasValid(
      totalArea,
      arableArea,
      vegetationArea
    );

    if (!areTheAreasValid) {
      return res.status(400).json({
        error: "Validation Error",
        details:
          "Invalid areas: arableArea + vegetationArea must not exceed totalArea",
      });
    }
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
  }
}

export const createProducerController = new CreateProducerController();
