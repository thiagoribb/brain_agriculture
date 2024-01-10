import { NextFunction, Request, Response } from "express";
import { producerSchema } from "src/schemas/producerSchema";

class ValidateSchema {
  async execute(req: Request, res: Response, next: NextFunction) {
    const validation = producerSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res
        .status(400)
        .json({ error: "Validation Error", details: errors });
    }

    next();
  }
}

export const validateSchema = new ValidateSchema();
