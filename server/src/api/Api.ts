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
import { deserializeUser } from "./middleware/deserializedUser/deselializedUser";
import { requestUser } from "./middleware/deserializedUser/requestUser";
import {
  LoginUserSchema,
  NewJourneySchema,
  RegisterUserSchema,
} from "./middleware/zodSchemas/UserAuthZodSchema";
import { signWihtJWT } from "../utils/jwt";
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  ReadTaskSchema,
  UpdateTaskSchema,
} from "./middleware/zodSchemas/TaskZodSchema";

const Api = (app: Application) => {
  const service = new Service();

  //register
  app.post(
    "/register",
    incomingDataValidation(RegisterUserSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await service.RegisterService(req.body);
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );
  //login
  app.post(
    "/login",
    incomingDataValidation(LoginUserSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const session = await service.LoginService(
          req.body,
          req.get("user-agent") || ""
        );

        const accessToken = signWihtJWT(
          {
            user: session.user,
            session: session._id,
          },
          { expiresIn: 86400 }
        ); //day

        const refreshToken = signWihtJWT(
          {
            user: session.user,
            session: session._id,
          },
          { expiresIn: 86400 * 30 }
        ); //month

        res.cookie("accessToken", accessToken, {
          maxAge: 3.154e10,
          httpOnly: false,
          domain: "localhost",
          path: "/",
          sameSite: "strict",
          secure: false,
        });

        res.cookie("refreshToken", refreshToken, {
          maxAge: 3.154e10,
          httpOnly: true,
          domain: "localhost",
          path: "/",
          sameSite: "strict",
          secure: false,
        });

        return res.status(201).json(session);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );

  //after this line each request needs user authentication
  app.use([deserializeUser, requestUser]);

  //retrieve the user's info when the page was refreshed...
  app.get(
    "/find-me",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = res.locals.user.user;
        const response = await service.FindMeService(userId);
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
    "/new-journey",
    incomingDataValidation(NewJourneySchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = res.locals.user.user;
        const response = await service.NewjourneyService(userId, req.body);

        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );
  // api endpoint for create root node
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
  // api endpoint for insert node inside already existing node
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
  // api endpoint for finding the entire nodes based on provided username
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
  // api endpoint for retrieves existing nodes' name based on provided username
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
  // api endpoint for update notes (update // remove)
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
  //api endpoint for read task only
  app.post(
    "/task",
    incomingDataValidation(CreateTaskSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const author = res.locals.user.user;
        const response = await service.CreateTaskService(req.body, author);
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          console.log({ error });
          return res.status(404).json({ err: error });
        }
        next(error);
      }
    }
  );
  //api endpoint for read author's tasks
  app.get("/task", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const author = res.locals.user.user;
      const response = await service.ReadTasksService(author);
      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(404).json({ err: error.message });
      }
      next(error);
    }
  });
  //api endpoint for read author's tasks
  app.put(
    "/task/:taskId",
    incomingDataValidation(UpdateTaskSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { taskId } = req.params;
        const response = await service.UpdateTaskService(
          {
            taskId,
          },
          req.body
        );
        return res.status(201).json(response);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(404).json({ err: error.message });
        }
        next(error);
      }
    }
  );
  //api endpoint for delete task
  app.delete(
    "/task/:taskId",
    incomingDataValidation(DeleteTaskSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { taskId } = req.params;
        const response = await service.DeleteTaskService({ taskId });
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
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

export default Api;
