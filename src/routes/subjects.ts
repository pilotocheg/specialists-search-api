import { Router, Request, Response } from "express";
import type { Database } from "../types/index.js";
import { getSubjects } from "../data/db.js";

export function createSubjectsRouter(db: Database): Router {
  const router = Router();

  /**
   * GET /api/subjects
   * Returns all consultation themes.
   */
  router.get("/", (_req: Request, res: Response) => {
    const subjects = getSubjects(db);
    res.json({ data: subjects });
  });

  return router;
}
