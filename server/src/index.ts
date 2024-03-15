import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import config from "../config";
import cookieParser from "cookie-parser";
import connectedToDB from "./utils/connectedToDB";
import Api from "./api/Api";
import { incomingDataValidation } from "./api/middleware/incomingDataValidation";
import { CreateNodeSchema } from "./api/middleware/zodSchemas/NoteTreeZodSchema";
import Service from "./services/Service";
import { ZodError } from "zod";

export const app = express();

export const runServer = async () => {
  app.use(
    cors({
      origin: config.origin_dev,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  await connectedToDB(config.mongo_prod || "");

  Api(app);

  app.post(
    "/api/node-tree",
    incomingDataValidation(CreateNodeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await new Service().CreateNewNodeService(req.body);
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );
  // api error endpiont
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const data = err.message || err.data;
    return res.status(status).json(data);
  });

  const PORT = process.env.PORT || config.port;

  app.listen(PORT, async () => {
    console.log(`We are Running at http://localhost:${PORT}`);
  });
};
runServer();
