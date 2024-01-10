import { Router } from "express";
import { createProducerController } from "src/controllers/createProducerController";
import { deleteProducerController } from "src/controllers/deleteProducerController";
import { editProducerController } from "src/controllers/editProducerController";
import { identificationNumberValidator } from "src/middlewares/identificationNumberValidator";
import { ValidateSchema } from "src/middlewares/validateSchema";
import { createProducerSchema } from "src/schemas/createProducerSchema";
import { editProducerSchema } from "src/schemas/editProducerSchema";

const producerRouter = Router();
const validateCreateProducerSchema = new ValidateSchema(createProducerSchema);
const validateEditProducerSchema = new ValidateSchema(editProducerSchema);

producerRouter.post(
  "/",
  validateCreateProducerSchema.execute.bind(validateCreateProducerSchema),
  identificationNumberValidator.execute,
  createProducerController.execute
);
producerRouter.put(
  "/:id",
  validateEditProducerSchema.execute.bind(validateEditProducerSchema),
  editProducerController.execute
);
producerRouter.delete("/:id", deleteProducerController.execute);

export default producerRouter;
