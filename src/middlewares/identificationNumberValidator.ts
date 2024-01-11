import { cnpj, cpf } from "cpf-cnpj-validator";
import { NextFunction, Request, Response } from "express";
import { producerService } from "src/services/producerService";

class IdentificationNumberValidator {
  async execute(req: Request, res: Response, next: NextFunction) {
    const { identificationNumber } = req.body;

    const validIdentificationNumber =
      cpf.isValid(identificationNumber) || cnpj.isValid(identificationNumber);
    if (!validIdentificationNumber) {
      return res.status(422).json({ error: "CPF or CNPJ is not valid." });
    }

    const existingProducer = await producerService.findByIdentificationNumber(
      identificationNumber
    );
    if (existingProducer) {
      return res.status(409).json({ error: "CPF or CNPJ already registered." });
    }

    next();
  }
}

export const identificationNumberValidator =
  new IdentificationNumberValidator();
