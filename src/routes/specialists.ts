import { Router, Request, Response } from "express";
import type { Database } from "../types/index.js";
import { getSpecialists } from "../data/db.js";
import { parseSpecialistFilters } from "../utils/parseQuery.js";

export function createSpecialistsRouter(db: Database): Router {
  const router = Router();

  /**
   * GET /api/specialists
   * Query params: level, sex, subjectId, profSpeciality, ratingFrom, ratingTo, ageFrom, ageTo, limit, offset
   */
  router.get("/", (req: Request, res: Response) => {
    const filters = parseSpecialistFilters(req.query as Record<string, string | undefined>);
    const { items, totalCount } = getSpecialists(db, filters);
    res.json({ data: { items, totalCount } });
  });

  return router;
}
