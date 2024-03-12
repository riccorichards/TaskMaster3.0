import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import config from "../config";
import cookieParser from "cookie-parser";
import connectedToDB from "./utils/connectedToDB";
import Api from "./api/Api";

const runServer = async () => {
  const app = express();
  app.use(
    cors({
      origin: config.origin,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  await connectedToDB(config.mongo_dev || "");

  app.get("/handshake", async (req: Request, res: Response) => {
    return res.json({ msg: "Everything looks good..." });
  });

  Api(app);

  const PORT = process.env.PORT || config.port;

  app.listen(PORT, async () => {
    console.log(`We are Running at http://localhost:${config.port}`);
  });
};

runServer();
