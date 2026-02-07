import type { SpecialistFilters } from "../types/index.js";

const DEFAULT_LIMIT = 12;
const DEFAULT_OFFSET = 0;

/**
 * Parse a query string value to number, or return default.
 */
function parseNum(value: string | undefined, defaultValue: number): number {
  if (value === undefined || value === "") return defaultValue;
  const n = Number(value);
  return Number.isNaN(n) ? defaultValue : n;
}

/**
 * Build SpecialistFilters from Express query object.
 */
export function parseSpecialistFilters(query: Record<string, string | undefined>): SpecialistFilters {
  return {
    level: query.level !== undefined && query.level !== "" ? parseNum(query.level, 0) : undefined,
    sex: query.sex !== undefined && query.sex !== "" ? parseNum(query.sex, 0) : undefined,
    subjectId: query.subjectId !== undefined && query.subjectId !== "" ? parseNum(query.subjectId, 0) : undefined,
    profSpeciality:
      query.profSpeciality !== undefined && query.profSpeciality !== ""
        ? parseNum(query.profSpeciality, 0)
        : undefined,
    ratingFrom:
      query.ratingFrom !== undefined && query.ratingFrom !== "" ? parseNum(query.ratingFrom, 0) : undefined,
    ratingTo: query.ratingTo !== undefined && query.ratingTo !== "" ? parseNum(query.ratingTo, 0) : undefined,
    ageFrom: query.ageFrom !== undefined && query.ageFrom !== "" ? parseNum(query.ageFrom, 0) : undefined,
    ageTo: query.ageTo !== undefined && query.ageTo !== "" ? parseNum(query.ageTo, 99) : undefined,
    limit: Math.max(1, parseNum(query.limit, DEFAULT_LIMIT)),
    offset: Math.max(0, parseNum(query.offset, DEFAULT_OFFSET)),
  };
}
