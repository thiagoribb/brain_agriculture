import Joi from "joi";

export const producerSchema = Joi.object({
  identificationNumber: Joi.string()
    .trim()
    .min(11)
    .max(14)
    .pattern(/^[0-9]+$/)
    .message(
      "IdentificationNumber must contain only numbers and have exactly 11 characters"
    )
    .required(),
  name: Joi.string().trim().required(),
  farmName: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  state: Joi.string().trim().required(),
  totalArea: Joi.number().positive().required(),
  arableArea: Joi.number().positive().required(),
  vegetationArea: Joi.number().positive().required(),
  producerCrops: Joi.array()
    .items(Joi.string().trim().min(2).max(50))
    .required(),
});
