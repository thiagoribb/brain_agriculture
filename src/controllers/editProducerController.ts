import { Request, Response } from "express";
import { Crop } from "src/entities/Crop";
import { cropService } from "src/services/cropService";
import { producerService } from "src/services/producerService";

class EditProducerController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;
    const updateFields = req.body;

    if (updateFields.producerCrops) {
      const crops: Crop[] = await cropService.dealWithProducerCrops(
        updateFields.producerCrops
      );

      updateFields.crops = crops;
      delete updateFields.producerCrops;
    }

    try {
      const editedProducer = await producerService.editProducer(
        Number(id),
        updateFields
      );

      return res.status(200).json(editedProducer);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const editProducerController = new EditProducerController();
