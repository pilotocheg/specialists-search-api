# Specialists Search API

Mock REST API for the specialists search app. Serves consultation **subjects** (themes) and **specialists** with filtering and pagination. Built with **Express** and **TypeScript**.

## Project structure

```
specialists-search-api/
├── data/
│   └── db.json          # Mock data (subjects + specialists)
├── src/
│   ├── index.ts         # Entry: load DB, create app, start server
│   ├── app.ts           # Express app (CORS, JSON, routes)
│   ├── config.ts        # Port, DB path
│   ├── types/
│   │   └── index.ts     # Subject, Specialist, filters, API types
│   ├── data/
│   │   └── db.ts        # Load db.json, getSubjects, getSpecialists (filter + paginate)
│   ├── routes/
│   │   ├── index.ts     # Mount /api/subjects, /api/specialists
│   │   ├── subjects.ts  # GET /api/subjects
│   │   └── specialists.ts # GET /api/specialists
│   └── utils/
│       └── parseQuery.ts # Parse query params → SpecialistFilters
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

```bash
npm install
```

## Scripts

| Command       | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Run with tsx watch (development) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start`   | Run compiled app (`node dist/index.js`) |
| `npm run typecheck` | Type-check only (`tsc --noEmit`) |

## Run locally

```bash
npm run dev
```

Server runs at **http://localhost:3001** (or `PORT` env var).

## API

### GET /api/subjects

Returns all consultation themes.

**Response:** `{ "data": [ { "id", "name", "sequence" }, ... ] }`

---

### GET /api/specialists

Returns specialists with optional filters and pagination.

**Query parameters:**

| Param           | Type   | Description |
|-----------------|--------|-------------|
| `level`         | 0 \| 1 | 0 = базовый, 1 = премиум |
| `sex`           | 1 \| 2 | 1 = M, 2 = F |
| `subjectId`     | number | Filter by consultation theme id |
| `profSpeciality`| 1 \| 2 \| 3 | 1 = Консультант, 2 = Сексолог, 3 = Коуч |
| `ratingFrom`    | number | Min rating (0 = "New") |
| `ratingTo`      | number | Max rating |
| `ageFrom`       | number | Min age |
| `ageTo`         | number | Max age |
| `limit`         | number | Page size (default: 12) |
| `offset`        | number | Skip N items (default: 0) |

**Response:** `{ "data": { "items": [ ... ], "totalCount": number } }`

## Free hosting options

You can host this API for free on several platforms. The app is a **long-running Node server** (Express), so you need a service that runs Node and allows a custom start command.

### Recommended (simple, free tier)

1. **Render** (https://render.com)  
   - Free tier: Web Service, sleeps after inactivity, wakes on request.  
   - Connect GitHub repo → build: `npm install && npm run build` → start: `npm start`.  
   - Set root directory if the API is in a subfolder.  
   - Free tier has cold starts and monthly limits; fine for demos and side projects.

2. **Railway** (https://railway.app)  
   - Free tier: $5/month credit (enough for a small API).  
   - Connect repo → auto-detects Node, build/start from `package.json`.  
   - Simple dashboard and logs.

3. **Fly.io** (https://fly.io)  
   - Free allowance for small VMs.  
   - Deploy with `fly launch` and a `Dockerfile` (or use their Node image).  
   - More control, good if you’re comfortable with CLI and containers.

### Other options

- **Cyclic** – Node-friendly, free tier; good for simple APIs.  
- **Vercel** – Preferable for serverless (e.g. one endpoint per file). This repo is a single Express app; you’d need to expose it as a serverless function (e.g. one handler that runs Express) or keep using Render/Railway for a classic server.  
- **Google Cloud Run** / **AWS** – Free tiers exist but require more setup and billing configuration.

### Summary

- **Easiest:** Render or Railway: connect repo, set build + start, add `PORT` if needed.  
- **More control / containers:** Fly.io.  
- Ensure the host uses **Node 18+** and that the start command is **`npm start`** (or `node dist/index.js`) after `npm run build`.  
- If the platform assigns a dynamic port, the app already uses `process.env.PORT`, so no code changes are needed.
