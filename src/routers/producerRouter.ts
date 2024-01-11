import { Router } from "express";
import { createProducerController } from "src/controllers/createProducerController";
import { deleteProducerController } from "src/controllers/deleteProducerController";
import { editProducerController } from "src/controllers/editProducerController";
import { getProducerController } from "src/controllers/getProducerController";
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
producerRouter.get("/:id?", getProducerController.execute);

export default producerRouter;

/**
 * @swagger
 * tags:
 *   name: Producers
 *   description: API para registro de produtores e suas culturas
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      Producer:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          identificationNumber:
 *            type: string
 *          name:
 *            type: string
 *          farmName:
 *            type: string
 *          city:
 *            type: string
 *          state:
 *            type: string
 *          totalArea:
 *            type: number
 *          arableArea:
 *            type: number
 *          vegetationArea:
 *            type: number
 *          producerCrops:
 *            type: array
 *            items:
 *              type: string
 */

/**
 * @swagger
 * /api/producer:
 *   post:
 *     description: Rota para cadastrar produtores e suas culturas plantadas
 *     tags: [Producers]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 producer:
 *                   $ref: '#/components/schemas/Producer'
 *       400:
 *         description: Erro de validação ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificationNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               farmName:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               totalArea:
 *                 type: number
 *               arableArea:
 *                 type: number
 *               vegetationArea:
 *                 type: number
 *               producerCrops:
 *                 type: array
 *                 items:
 *                   type: string
 */

/**
 * @swagger
 * /api/producer/{id}:
 *   put:
 *     description: Rota para editar produtores e suas culturas plantadas
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produtor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 producer:
 *                   $ref: '#/components/schemas/Producer'
 *       400:
 *         description: Erro de validação ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificationNumber:
 *                 type: string
 *               name:
 *                 type: string
 *               farmName:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               totalArea:
 *                 type: number
 *               arableArea:
 *                 type: number
 *               vegetationArea:
 *                 type: number
 *               producerCrops:
 *                 type: array
 *                 items:
 *                   type: string
 */

/**
 * @swagger
 * /api/producer:
 *   get:
 *     description: Rota para obter todos os produtores ou um produtor específico
 *     tags: [Producers]
 *     parameters:
 *       - in: query
 *         name: id
 *         description: ID do produtor (opcional)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 producers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Producer'
 *       400:
 *         description: Erro de validação ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/producer/{id}:
 *   delete:
 *     description: Rota para deletar um produtor
 *     tags: [Producers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produtor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Erro de validação ou dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
