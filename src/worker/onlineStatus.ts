import type { Database, Specialist } from "../types/index.js";
import { saveDatabase } from "../data/db.js";

const ONLINE = 2;
const OFFLINE = 1;

/**
 * Randomly toggle specialists' online status. When a specialist goes from
 * online to offline, set lastActivityTime to now. Persists to db file.
 */
function run(db: Database, dbPath: string): void {
  const now = new Date().toISOString();

  for (const s of db.specialists) {
    const wasOnline = s.onlineStatus === ONLINE;
    const nextStatus = Math.random() < 0.5 ? (OFFLINE as Specialist["onlineStatus"]) : (ONLINE as Specialist["onlineStatus"]);

    s.onlineStatus = nextStatus;
    if (wasOnline && nextStatus === OFFLINE) {
      s.lastActivityTime = now;
    }
  }

  saveDatabase(dbPath, db);
  console.log(`[worker] Online status updated and saved at ${now}`);
}

/**
 * Start the online-status worker: runs every 1 hour, randomly sets specialists
 * online/offline and updates lastActivityTime when going offline.
 * Uses recursive setTimeout so the next run is scheduled after the current one
 * finishes (no drift, no overlapping runs).
 */
export function startOnlineStatusWorker(db: Database, dbPath: string, intervalMs: number = 60 * 60 * 1000): NodeJS.Timeout {
  function scheduleNext(): NodeJS.Timeout {
    return setTimeout(() => {
      run(db, dbPath);
      scheduleNext();
    }, intervalMs);
  }

  run(db, dbPath);
  return scheduleNext();
}
