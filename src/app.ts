import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import producerRouter from "./routers/producerRouter";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/producer", producerRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.message.startsWith("Invalid areas:")) {
    return res.status(400).json({ error: error.message });
  }

  console.error(error);

  return res.status(500).send(error.message);
});

export default app;
