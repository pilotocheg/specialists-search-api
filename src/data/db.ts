import { readFileSync, existsSync } from "node:fs";
import type { Database, Subject, Specialist, SpecialistFilters } from "../types/index.js";

let cachedDb: Database | null = null;

/**
 * Load and parse db.json. Results are cached for the process lifetime.
 */
export function loadDatabase(dbPath: string): Database {
  if (cachedDb) return cachedDb;

  if (!existsSync(dbPath)) {
    throw new Error(`Database file not found: ${dbPath}`);
  }

  const raw = readFileSync(dbPath, "utf-8");
  cachedDb = JSON.parse(raw) as Database;

  if (!Array.isArray(cachedDb.subjects)) cachedDb.subjects = [];
  if (!Array.isArray(cachedDb.specialists)) cachedDb.specialists = [];

  return cachedDb;
}

/**
 * Return all subjects.
 */
export function getSubjects(db: Database): Subject[] {
  return db.subjects;
}

/**
 * Filter and paginate specialists according to query params.
 */
export function getSpecialists(db: Database, filters: SpecialistFilters): { items: Specialist[]; totalCount: number } {
  let items = [...db.specialists];

  if (filters.level !== undefined) {
    items = items.filter((s) => s.level === filters.level);
  }
  if (filters.sex !== undefined && filters.sex !== 0) {
    items = items.filter((s) => s.sex === filters.sex);
  }
  if (filters.subjectId !== undefined && filters.subjectId !== 0) {
    items = items.filter((s) => s.defaultSubjectId === filters.subjectId);
  }
  if (filters.profSpeciality !== undefined && filters.profSpeciality !== 0) {
    items = items.filter((s) => s.profSpeciality === filters.profSpeciality);
  }

  const ratingFrom = filters.ratingFrom ?? 0;
  const ratingTo = filters.ratingTo ?? 0;
  if (ratingFrom > 0 || ratingTo > 0) {
    items = items.filter((s) => {
      const r = s.rating ?? 0;
      if (ratingTo > 0) return r >= ratingFrom && r <= ratingTo;
      return r >= ratingFrom;
    });
  }

  const ageFrom = filters.ageFrom ?? 0;
  const ageTo = filters.ageTo ?? 99;
  items = items.filter((s) => s.age >= ageFrom && s.age <= ageTo);

  const totalCount = items.length;
  const start = filters.offset;
  const end = filters.offset + filters.limit;
  const page = items.slice(start, end);

  return { items: page, totalCount };
}
