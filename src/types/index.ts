/**
 * Consultation theme (subject).
 */
export interface Subject {
  id: number;
  name: string;
  sequence: number;
}

/**
 * Specialist profile.
 */
export interface Specialist {
  userId: string;
  name: string;
  sex: 1 | 2; // 1 = M, 2 = F
  age: number;
  birthDate: string;
  photoUrl: string;
  rating: number; // 0 = "New"
  defaultSubjectId: number;
  defaultSubjectName: string;
  subjectsCount: number;
  profSpeciality: 1 | 2 | 3; // 1 = Консультант, 2 = Сексолог, 3 = Коуч
  level: 0 | 1; // 0 = базовый, 1 = премиум
  onlineStatus: 1 | 2; // 1 = offline, 2 = online
  lastActivityTime: string;
}

/**
 * Query parameters for GET /api/specialists.
 */
export interface SpecialistFilters {
  level?: number;
  sex?: number;
  subjectId?: number;
  profSpeciality?: number;
  ratingFrom?: number;
  ratingTo?: number;
  ageFrom?: number;
  ageTo?: number;
  limit: number;
  offset: number;
}

/**
 * API response wrappers.
 */
export interface SubjectsResponse {
  data: Subject[];
}

export interface SpecialistsResponse {
  data: {
    items: Specialist[];
    totalCount: number;
  };
}

/**
 * Shape of the JSON database file.
 */
export interface Database {
  subjects: Subject[];
  specialists: Specialist[];
}
