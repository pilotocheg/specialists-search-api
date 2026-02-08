import { createApp } from "./app.js";
import { config } from "./config.js";
import { loadDatabase } from "./data/db.js";
import { startOnlineStatusWorker } from "./worker/onlineStatus.js";

const db = loadDatabase(config.dbPath);
const app = createApp(db);

app.listen(config.port, () => {
  startOnlineStatusWorker(db, config.dbPath);

  console.log(
    `Specialists Search API running at http://localhost:${config.port}`
  );
  console.log("  GET /api/subjects     — list consultation themes");
  console.log(
    "  GET /api/specialists  — list specialists (supports filters & pagination)"
  );
  console.log("  Worker: online/offline status updated every 1 hour");
});
