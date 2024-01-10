import { Request, Response } from "express";
import { producerService } from "src/services/producerService";

class GetProducerController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (id) {
        const producer = await producerService.getById(Number(id));

        return res.status(200).json({ producer });
      } else {
        const producers = await producerService.getAll();

        return res.status(200).json({ producers });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const getProducerController = new GetProducerController();
