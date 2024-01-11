import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import producerRouter from "./routers/producerRouter";

const app = express();

import swaggerConfig from "./swaggerConfig";

const options = {
  definition: swaggerConfig,
  apis: ["src/routers/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/producer", producerRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  return res.status(500).send(error.message);
});

export default app;
