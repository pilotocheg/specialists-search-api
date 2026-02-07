import express from "express";
import cors from "cors";
import type { Database } from "./types/index.js";
import { createApiRouter } from "./routes/index.js";

export function createApp(db: Database): express.Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", createApiRouter(db));

  return app;
}
