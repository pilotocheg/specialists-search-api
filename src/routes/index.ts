import { Router } from "express";
import type { Database } from "../types/index.js";
import { createSubjectsRouter } from "./subjects.js";
import { createSpecialistsRouter } from "./specialists.js";

export function createApiRouter(db: Database): Router {
  const router = Router();

  router.use("/subjects", createSubjectsRouter(db));
  router.use("/specialists", createSpecialistsRouter(db));

  return router;
}
