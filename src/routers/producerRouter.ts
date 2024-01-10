import { Request, Response, Router } from "express";
import { createProducerController } from "src/controllers/createProducerController";
import { identificationNumberValidator } from "src/middlewares/identificationNumberValidator";
import { validateSchema } from "src/middlewares/validateSchema";

const producerRouter = Router();

producerRouter.post(
  "/",
  validateSchema.execute,
  identificationNumberValidator.execute,
  async (req: Request, res: Response) => {
    await createProducerController.execute(req, res);
  }
);

export default producerRouter;
