import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export class ValidateSchema {
  constructor(private schema: Joi.ObjectSchema) {}

  execute(req: Request, res: Response, next: NextFunction) {
    const validation = this.schema.validate(req.body, { abortEarly: false });

    if (validation.error) {
      const errors = validation.error.details.map(
        (detail: { message: any }) => detail.message
      );
      return res
        .status(400)
        .json({ error: "Validation Error", details: errors });
    }

    next();
  }
}
