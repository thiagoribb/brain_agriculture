import { Request, Response } from "express";
import { producerService } from "src/services/producerService";

class DeleteProducerController {
  async execute(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await producerService.deleteById(Number(id));

      return res.status(200).json({ message: "Producer deleted" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export const deleteProducerController = new DeleteProducerController();
