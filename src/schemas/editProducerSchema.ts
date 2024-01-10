import Joi from "joi";

export const editProducerSchema = Joi.object({
  identificationNumber: Joi.string()
    .trim()
    .min(11)
    .max(14)
    .pattern(/^[0-9]+$/)
    .message(
      "IdentificationNumber must contain only numbers and have exactly 11 characters"
    ),
  name: Joi.string().trim(),
  farmName: Joi.string().trim(),
  city: Joi.string().trim(),
  state: Joi.string().trim(),
  totalArea: Joi.number().positive(),
  arableArea: Joi.number().positive(),
  vegetationArea: Joi.number().positive(),
  producerCrops: Joi.array().items(Joi.string().trim().min(2).max(50)),
});
