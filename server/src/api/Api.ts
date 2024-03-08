import { Application, NextFunction, Request, Response } from "express";
import Service from "../services/Service";
import { incomingDataValidation } from "./middleware/incomingDataValidation";
import {
  CreateNodeSchema,
  ReadNodeSchema,
  UpdateNodeSchema,
} from "./middleware/zodSchemas/NoteTreeZodSchema";
import CustomError from "../utils/CustomError";
import { ZodError } from "zod";

const Api = (app: Application) => {
  const service = new Service();

  app.post(
    "/node-tree",
    incomingDataValidation(CreateNodeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await service.CreateNewNodeService(req.body);
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );

  app.post(
    "/insert-node",
    incomingDataValidation(CreateNodeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await service.InsertNodeService(req.body);
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );

  app.get(
    "/nodes/:username",
    incomingDataValidation(ReadNodeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username } = req.params;
        const response = await service.RetrieveNodesService({ username });

        return res.status(200).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );

  app.get(
    "/nodes-name/:username",
    incomingDataValidation(ReadNodeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username } = req.params;
        const response = await service.RetrieveNodeNamesService({ username });

        return res.status(200).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );

  app.put(
    "/update-node",
    incomingDataValidation(UpdateNodeSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await service.UpdateNodeService(req.body);
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

export default Api;
